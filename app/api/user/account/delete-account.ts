import { getServerSession } from 'next-auth';

import { catchAsync } from '../../apiHandler';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '../../../../models/User';

export const deleteAccount = catchAsync(
  async () => {
    const session = await getServerSession(authOptions);

    const {
      user: { email },
    } = session!;

    await User.deleteOne({ email });

    return Response.json(
      { status: 'success', message: 'Account deleted!' },
      { status: 204 }
    );
  },
  { db: true }
);
