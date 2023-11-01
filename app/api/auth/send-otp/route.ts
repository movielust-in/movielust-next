import { z } from 'zod';
import { OTP_TYPES } from '../../../../constants';
import dbConnect from '../../../../lib/databse';
import Otp from '../../../../models/Otp';
import { User } from '../../../../models/User';

const validationSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    otp_type: z.enum(OTP_TYPES),
  })
  .required();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = validationSchema.safeParse(data);

    if (!user.success) {
      const error = user.error.flatten();
      return new Response(JSON.stringify({ error: error.fieldErrors }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    await dbConnect();

    const randomOtp = Math.floor(100_000 + Math.random() * 900_000);

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

    const otp = new Otp({
      name: user.data.name,
      email: user.data.email,
      otp: randomOtp,
      type: user.data.otp_type,
    });

    await otp.save();

    return Response.json({ status: 'success', message: 'Otp sent.' });
  } catch (err) {
    return Response.json(err);
  }
}
