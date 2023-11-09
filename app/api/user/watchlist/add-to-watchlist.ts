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

    const ifExists = await User.findOne({
      email,
      watchlist: { $elemMatch: watchlistItem },
    });

    if (ifExists) {
      return Response.json(
        { success: 'error', message: 'Already in watchlist.' },
        { status: 409 }
      );
    }

    const addResult = await User.updateOne(
      { email },
      { $push: { watchlist: { $each: [watchlistItem], $position: 0 } } }
    );

    return Response.json(
      {
        status: 'success',
        message: 'Added to Watchlist',
        data: addResult,
      },
      { status: 201 }
    );
  },
  { db: true }
);
