import Head from 'next/head';

import { image } from '../../../../lib/tmdb/Urls';
import { DetailResponse } from '../../../../types/tmdb';

interface DetailHelmetProps {
  contentData: DetailResponse;
  link: string;
}

function DetailHelmet({ contentData, link }: DetailHelmetProps) {
  return (
    <Head>
      <title>{`${contentData?.title || contentData?.name} - Movielust`}</title>
      <meta
        name="description"
        content={contentData?.overview}
        key="description"
      />
      <meta
        property="og:title"
        name="og:title"
        content={`${contentData?.title || contentData?.name} - Movielust`}
      />
      <meta property="og:description" content={contentData?.overview} />
      <meta property="og:site_name" content="Movielust" />
      <meta
        property="og:url"
        content={`https://movie-lust.vercel.app/${link}`}
      />
      <meta
        property="og:image"
        content={image(200, contentData?.poster_path || '')}
      />
      <meta
        name="twitter:title"
        content={`${contentData?.title || contentData?.name} - Movielust`}
      />
      <meta name="twitter:description" content={contentData?.overview} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@movielust_in" />
      <meta name="twitter:url" content="https://www.movie-lust.vercel.app" />
      <meta
        name="twitter:image"
        content={image(
          780,
          contentData?.backdrop_path || contentData?.poster_path || ''
        )}
      />
    </Head>
  );
}

export default DetailHelmet;
