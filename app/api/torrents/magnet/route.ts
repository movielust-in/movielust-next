import { ZodError, z } from 'zod';

import { catchAsync } from '../../apiHandler';

import { parse } from 'node-html-parser'
import { fetchRawHtml } from '../fetch-raw-html';

const validationSchema = z
    .object({
        url: z.string().startsWith("/torrent/").transform(url => `https://1337x.to${url}`).pipe(z.string().url()),
    })
    .required();

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
    async (request) => {
        try {
            const { searchParams } = new URL(request!.url);

            const { url } = validationSchema.parse({
                url: searchParams.get('url')
            })

            console.log(url)

            const html = await fetchRawHtml(url)

            const dom = parse(html)

            const name = dom.querySelector(".box-info-heading")?.querySelector("h1")?.innerText

            const magnet = dom.querySelector(".no-top-radius")?.querySelector(".clearfix")?.querySelector("ul")?.querySelector("li")?.querySelector("a")?.attributes["href"]

            return Response.json({
                name,
                magnet,
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
    { db: false }
);
