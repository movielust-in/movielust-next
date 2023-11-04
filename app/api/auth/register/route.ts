import { z } from 'zod';

import Otp from '../../../../models/Otp';
import { OTP_TYPE } from '../../../../constants';
import { User } from '../../../../models/User';
import { catchAsync } from '../../apiHandler';

const validationSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6).max(32),
    image: z.string().url({ message: 'Invalid Image Url' }),
    otp: z.number().gte(100000).lte(999999),
  })
  .required();

export const POST = catchAsync(
  async (request) => {
    const res = await request!.json();

    const user = validationSchema.parse(res);

    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
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

    const otpExists = await Otp.findOne({
      email: user.email,
      otp: user.otp,
      type: OTP_TYPE[0],
    });

    if (!otpExists) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid OTP' }),
        {
          status: 401,
          headers: { 'Content-Type': 'applicatoin/json' },
        }
      );
    }

    otpExists.deleteOne();

    const userDoc = new User({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      verified: true,
    });

    const userSaveResult = await userDoc.save();

    return Response.json({ status: 'success', data: userSaveResult });
  },
  { db: true }
);
