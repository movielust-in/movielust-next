import { Avatar } from '../../../models/Avatar';
import { catchAsync } from '../apiHandler';

export const fetchAvatars = catchAsync(
  async () => {
    const avatars = await Avatar.find({});
    return Response.json({ status: 'success', data: { avatars } });
  },
  { db: true }
);
