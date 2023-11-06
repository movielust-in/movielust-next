import { z } from 'zod';
import { hash } from 'bcrypt';

import { catchAsync } from '../../apiHandler';
import Otp from '../../../../models/Otp';
import { OTP_TYPE } from '../../../../constants';
import { User } from '../../../../models/User';

const validationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    otp: z.coerce.number().gte(100000).lte(999999),
  })
  .required();

export const PUT = catchAsync(
  async (request) => {
    const body = await request?.json();

    const { email, otp, password } = validationSchema.parse(body);

    const isOtpValid = Otp.findOne({
      email,
      otp,
      type: OTP_TYPE[1],
    });

    if (!isOtpValid) {
      return Response.json(
        {
          status: 'error',
          message: 'Invalid OTP!',
        },
        { status: 401 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const updateResult = await User.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return Response.json({
      status: 'success',
      message: 'Password Updated!',
      data: updateResult,
    });
  },
  { db: true }
);
