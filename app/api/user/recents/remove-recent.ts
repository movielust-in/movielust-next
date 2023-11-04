import { z } from 'zod';
import { getServerSession } from 'next-auth';

import { catchAsync } from '../../apiHandler';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '../../../../models/User';

const contentIdValidation = z.coerce.number();

export const removeRecent = catchAsync(
  async (request) => {
    const { searchParams } = new URL(request!.url);

    const contentIdParam = searchParams.get('content_id');

    const contentId = contentIdValidation.parse(contentIdParam);

    const session = await getServerSession(authOptions);

    const {
      user: { email },
    } = session!;

    const removeResult = await User.updateOne(
      { email },
      { $pull: { watched: { content_id: contentId } } }
    );

    return Response.json(
      {
        status: 'success',
        message: 'Content removed from Recents.',
        data: removeResult,
      },
      { status: 204 }
    );
  },
  { db: true }
);
