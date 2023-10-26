import { NextApiRequest, NextApiResponse } from 'next';

export default function getIMDBRating(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { imdbId } = req.query;

  if (!imdbId) return res.status(400).json({ message: 'Bad Request' });
  if (!process.env.MONGO_DATA_API_KEY)
    return res.status(400).json({ message: 'Bad Request' });

  imdbId = (imdbId as string).split(',');

  return (async () => {
    try {
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

      // if (data.documents.length === 0) {
      //   return res.status(404).end();
      // }

      return res.json(data.documents);
    } catch (error) {
      return res.status(500).json({ message: 'Something Went wrong', error });
    }
  })();
}
