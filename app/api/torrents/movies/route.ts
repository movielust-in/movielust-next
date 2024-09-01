import { ZodError, z } from 'zod';

import { catchAsync } from '../../apiHandler';

import parser from 'node-html-parser'
import { link } from 'fs';
import { TorrentBase } from '../constants';
import { parse1337xTable } from './parser';
import { fetchRawHtml } from '../fetch-raw-html';

const YTS_Movie_Api = 'https://yts.mx/api/v2/movie_details.json';

const validationSchema = z
    .object({
        name: z.string(),
    })
    .required();

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
    async (request) => {
        try {
            const { searchParams } = new URL(request!.url);

            const nameParam = searchParams.get('name');

            const { name } = validationSchema.parse({
                name: nameParam
            })

            const html = await fetchRawHtml(`${TorrentBase}/category-search/${name}/Movies/1/`)

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
