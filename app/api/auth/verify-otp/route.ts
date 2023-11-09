import { z } from 'zod';

import { catchAsync } from '../../apiHandler';
import { OTP_TYPES } from '../../../../constants';
import Otp from '../../../../models/Otp';

const validationSchema = z.object({
  email: z.string().email(),
  otp: z.coerce.number(),
  otp_type: z.enum(OTP_TYPES),
});

export const PUT = catchAsync(
  async (request) => {
    const body = await request?.json();

    const { email, otp, otp_type } = validationSchema.parse(body);

    const isValid = await Otp.findOne({ email, otp, type: otp_type });

    if (!isValid) {
      return Response.json(
        { status: 'error', message: 'Invalid OTP!' },
        { status: 401 }
      );
    }

    return Response.json({ status: 'success', message: 'OTP Verified.' });
  },
  { db: true }
);
