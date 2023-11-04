import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '../../../app/api/auth/[...nextauth]/authOptions';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getServerSession(req, res, authOptions);
  res.json({ session });
}
