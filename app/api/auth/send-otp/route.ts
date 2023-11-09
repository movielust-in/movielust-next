import { z } from 'zod';

import { OTP_TYPE, OTP_TYPES } from '../../../../constants';
import Otp from '../../../../models/Otp';
import { User } from '../../../../models/User';
import { catchAsync } from '../../apiHandler';

const validationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  otp_type: z.enum(OTP_TYPES),
});

export const POST = catchAsync(
  async (request) => {
    const data = await request!.json();
    const user = validationSchema.parse(data);

    const randomOtp = Math.floor(100_000 + Math.random() * 900_000);

    const userExists = await User.findOne({ email: user.email });

    if (userExists && user.otp_type === OTP_TYPE[0]) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Email is already registerd.',
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!userExists && user.otp_type === OTP_TYPE[1]) {
      return Response.json({
        status: 'error',
        message: 'Account does not exists',
      });
    }

    await Otp.deleteMany({ email: user.email });

    const otp = new Otp({
      name: user.name || userExists?.name,
      email: user.email,
      otp: randomOtp,
      type: user.otp_type,
    });

    await otp.save();

    return Response.json({ status: 'success', message: 'Otp sent.' });
  },
  { db: true }
);
