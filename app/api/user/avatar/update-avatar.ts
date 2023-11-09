import { z } from 'zod';
import { getServerSession } from 'next-auth';

import authOptions from '../../auth/[...nextauth]/authOptions';
import { catchAsync } from '../../apiHandler';
import { User } from '../../../../models/User';

const validationSchema = z
  .object({
    avatar_url: z.string().url(),
  })
  .required();

export const updateAvatar = catchAsync(
  async (request) => {
    const session = await getServerSession(authOptions);
    const {
      user: { email },
    } = session!;

    const body = await request?.json();
    const { avatar_url } = validationSchema.parse(body);

    const updateResult = await User.updateOne(
      { email },
      {
        $set: {
          image: avatar_url,
        },
      }
    );

    return Response.json({
      status: 'success',
      message: 'Avatar changed.',
      data: updateResult,
    });
  },
  { db: true }
);
