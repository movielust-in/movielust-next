import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { catchAsync } from '../../../apiHandler';
import authOptions from '../../../auth/[...nextauth]/authOptions';
import { User } from '../../../../../models/User';

const validationSchema = z
  .object({
    content_id: z.string(),
    type: z.enum(['movie', 'tv']),
  })
  .required();

export const GET = catchAsync(
  async (request) => {
    const { searchParams } = new URL(request?.url!);

    const content_id = searchParams.get('content_id');
    const type = searchParams.get('type');

    const data = validationSchema.parse({ content_id, type });

    const session = await getServerSession(authOptions);
    const {
      user: { email },
    } = session!;

    const exists = await User.findOne({
      email,
      watchlist: { $elemMatch: data },
    });

    return Response.json({
      success: true,
      message: exists ? 'Present in Watchlist' : 'Not present in Watchlist',
      data: { present: !!exists },
    });
  },
  { db: true }
);
