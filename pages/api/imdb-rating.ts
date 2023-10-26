import { NextApiRequest, NextApiResponse } from 'next';
import { _getIMDBRating } from '../../helpers/server-side/_imdb';

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
      const data = await _getIMDBRating(imdbId);
      return res.json(data.documents);
    } catch (error) {
      return res.status(500).json({ message: 'Something Went wrong', error });
    }
  })();
}
