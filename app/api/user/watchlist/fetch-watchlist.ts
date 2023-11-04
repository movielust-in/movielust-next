import { getServerSession } from 'next-auth';

import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '../../../../models/User';
import { catchAsync } from '../../apiHandler';

export const fetchWatchlist = catchAsync(
  async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user.email) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Invalid Session!',
          session,
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const user = await User.findOne(
      { email: session.user.email },
      'watchlist -_id'
    );

    return Response.json({
      status: 'success',
      data: { watchlist: user?.watchlist },
    });
  },
  { db: true }
);
