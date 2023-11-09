import { z } from 'zod';
import { getServerSession } from 'next-auth';

import { catchAsync } from '../../apiHandler';
import { User } from '../../../../models/User';
import authOptions from '../../auth/[...nextauth]/authOptions';

const validateIdParam = z.coerce.number();
const validateTypeParam = z.enum(['movie', 'tv']);

export const deleteFromWatchlist = catchAsync(
  async (request) => {
    const session = await getServerSession(authOptions);
    const {
      user: { email },
    } = session!;

    const { searchParams } = new URL(request!.url);

    const idParam = searchParams.get('content_id');
    const typeParam = searchParams.get('type');

    const contentId = validateIdParam.parse(idParam);
    const type = validateTypeParam.parse(typeParam);

    const deleteResult = await User.updateOne(
      { email },
      {
        $pull: {
          watchlist: {
            content_id: contentId,
            type,
          },
        },
      }
    );

    return Response.json({
      status: 'success',
      message: 'Removed from Watchlist',
      data: deleteResult,
    });
  },
  { db: true }
);
