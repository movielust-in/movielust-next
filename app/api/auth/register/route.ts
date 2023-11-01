import { z } from 'zod';
import Otp from '../../../../models/Otp';
import dbConnect from '../../../../lib/databse';
import { OTP_TYPE } from '../../../../constants';
import { User } from '../../../../models/User';

const validationSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6).max(32),
    image: z.string().url({ message: 'Invalid Image Url' }),
    otp: z.number().gte(100000).lte(999999),
  })
  .required();

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const user = validationSchema.safeParse(res);

    if (!user.success) {
      const error = user.error.flatten().fieldErrors;
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Bad Request!',
          error,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    await dbConnect();

    const userExists = await User.findOne({ email: user.data.email });

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
      email: user.data.email,
      otp: user.data.otp,
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
      name: user.data.name,
      email: user.data.email,
      password: user.data.password,
      image: user.data.image,
      verified: true,
    });

    const userSaveResult = await userDoc.save();

    return Response.json({ status: 'success', data: userSaveResult });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 'error', message: 'Internal Server Error!' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
