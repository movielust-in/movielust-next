import { z } from 'zod';
import { OTP_TYPES } from '../../../../constants';
import Otp from '../../../../models/Otp';
import { User } from '../../../../models/User';
import { catchAsync } from '../../apiHandler';

const validationSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    otp_type: z.enum(OTP_TYPES),
  })
  .required();

export const POST = catchAsync(
  async (request) => {
    const data = await request!.json();
    const user = validationSchema.parse(data);

    const randomOtp = Math.floor(100_000 + Math.random() * 900_000);

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

    const otp = new Otp({
      name: user.name,
      email: user.email,
      otp: randomOtp,
      type: user.otp_type,
    });

    await otp.save();

    return Response.json({ status: 'success', message: 'Otp sent.' });
  },
  { db: true }
);
