import {  z } from 'zod';

import { catchAsync } from '../../apiHandler';
    import { TorrentBase } from '../constants';
import { parse1337xTable } from '../movies/parser';
import { fetchRawHtml } from '../fetch-raw-html';

// const YTS_Movie_Api = 'https://yts.mx/api/v2/movie_details.json';

const validationSchema = z.discriminatedUnion("complete",
    [
        z.object({
            complete: z.literal("true"), name: z.string(), season: z.coerce.number().positive()
        }).required(),
        z.object({
            complete: z.null(), name: z.string(), season: z.coerce.number().positive(), episode: z.coerce.number().positive()
        }
        ).required()])

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
    async (request) => {
        try {
            const { searchParams } = new URL(request!.url);

            const nameParam = searchParams.get('name');
            const seasonParam = searchParams.get('season');
            const episodeParam = searchParams.get('episode');
            const completeParam = searchParams.get('complete');

            const params = validationSchema.parse({
                complete: completeParam,
                name: nameParam,
                season: seasonParam,
                episode: episodeParam
            })

            let url = ""

            const { season } = params

            const seasonString = season < 10 ? `0${season}` : season.toString()

            if (params.complete == null) {
                const { episode } = params

                const episodeString = episode < 10 ? `0${episode}` : episode.toString()

                url = `${TorrentBase}/category-search/${params.name} S${seasonString} E${episodeString}/TV/1/`
            } else {
                url = `${TorrentBase}/category-search/${params.name} S${seasonString} Complete/TV/1/`
            }

            // console.log(url)

            const html = await fetchRawHtml(url)

            const torrents = parse1337xTable(html)

            return Response.json({
                results: torrents
            })

        } catch (err) {
            
            return Response.json(
                {
                    status: 'error',
                    message: 'Not found!',
                    error: err instanceof Error ? err?.message : '',
                },
                { status: 404 }
            );
        }
    },
    { db: true }
);
