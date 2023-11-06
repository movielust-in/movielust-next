import { z } from 'zod';
import { getServerSession } from 'next-auth';

import { catchAsync } from '../../apiHandler';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '../../../../models/User';

const validationSchema = z.discriminatedUnion('type', [
  z
    .object({
      content_id: z.coerce.number(),
      type: z.literal('movie'),
    })
    .required(),
  z
    .object({
      name: z.string(),
      content_id: z.coerce.number(),
      type: z.literal('tv'),
      season: z.coerce.number().min(1),
      episode: z.coerce.number().min(1),
    })
    .required(),
]);

export const addToRecents = catchAsync(
  async (request) => {
    const body = await request!.json();

    const data = validationSchema.parse(body);

    const session = await getServerSession(authOptions);

    const {
      user: { email },
    } = session!;

    // removes the item if already in recents list to avoid duplicates
    await User.updateOne(
      { email },
      {
        $pull: {
          watched: data,
        },
      }
    );

    const addResult = await User.updateOne(
      { email },
      { $push: { watched: { $each: [data], $position: 0 } } }
    );

    return Response.json(
      {
        status: 'success',
        message: 'Added to Recents.',
        data: addResult,
      },
      { status: 201 }
    );
  },
  { db: true }
);
