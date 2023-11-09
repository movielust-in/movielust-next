// ***************************Warning*********************************
// ***************************Warning*********************************
// ***************************Warning*********************************
// **************Do not use inside Client Side code.******************
// *********Only for use inside api routes and getStaticProps*********

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/prefer-default-export
export const getImdbRatingFromDB = async (imdbId: string[]) => {
  'use server';

  // eslint-disable-next-line no-undef
  const options: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      Accept: 'application/json',
      'api-key': process.env.MONGO_DATA_API_KEY as string,
    },
    body: JSON.stringify({
      dataSource: 'nebula',
      database: 'moviebase',
      collection: 'IMDB_Ratings',
      filter: { $or: imdbId.map((imdb_id) => ({ imdb_id })) },
      projection: { _id: 0, __v: 0 },
    }),
  };
  const fetchRes = await fetch(
    `${process.env.MONGO_DATA_API_URL}/action/find`,
    options
  );
  const data = (await fetchRes.json()) as {
    documents: Array<{
      vote_count: Number;
      rating: Number;
      imdb_id: String;
    }>;
  };
  return data;
};
