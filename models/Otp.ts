import mongoose, { Document, Model, Schema, model } from 'mongoose';

import { OTP_TYPES } from '../constants';
import { sendMail } from '../lib/mail';
import { verifyEmailOTP } from '../templates/verifyOTP';

const OTP_EXPIRY_MINUTES = 15;

const defaultExpire = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + OTP_EXPIRY_MINUTES);
  return d.getTime();
};

export interface IOtpDocument extends Document {
  name: string;
  email: string;
  otp: number;
  type: 'SIGNUP' | 'RESET_PASS';
  exp?: Date;
}

const OTP = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: OTP_TYPES,
    },
    exp: {
      type: Date,
      default: defaultExpire,
    },
  },
  {
    versionKey: false,
    statics: {},
  }
);

OTP.pre('save', async function deleteAnyPreviousOTP() {
  await this.collection.deleteMany({ email: this.email });

  await sendMail(
    this.email,
    verifyEmailOTP(this.name, this.otp),
    'Verify Email'
  );
});

const Otp: Model<IOtpDocument> =
  mongoose.models.otp || model<IOtpDocument>('otp', OTP, 'otp');

export default Otp;
