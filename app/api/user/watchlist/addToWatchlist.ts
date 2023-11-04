import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { catchAsync } from '../../apiHandler';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '../../../../models/User';

const validationSchema = z
  .object({
    content_id: z.coerce.number(),
    type: z.enum(['movie', 'tv']),
  })
  .required();

export const addToWatchlist = catchAsync(
  async (request) => {
    const session = await getServerSession(authOptions);

    const data = await request?.json();

    const watchlistItem = validationSchema.parse(data);

    const {
      user: { email },
    } = session!;

    const addResult = await User.updateOne(
      { email },
      { $push: { watchlist: watchlistItem } }
    );

    return Response.json({
      status: 'success',
      message: 'Added to Watchlist',
      data: addResult,
    });
  },
  { db: true }
);
