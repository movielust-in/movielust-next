import mongoose, { Document, Model, Schema, model } from 'mongoose';

import { OTP_TYPE, OTP_TYPES } from '../constants';
import { sendMail } from '../lib/mail';
import { genVerifyEmailOTPTemplate } from '../templates/verifyOTP';
import { genResetOTPTemplate } from '../templates/resetOTP';

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

  const template =
    this.type === OTP_TYPE[0]
      ? genVerifyEmailOTPTemplate(this.name, this.otp)
      : genResetOTPTemplate(this.name, this.otp);

  const subject = this.type === OTP_TYPE[0] ? 'Verify Email' : 'Reset Password';

  await sendMail(this.email, template, subject);
});

const Otp: Model<IOtpDocument> =
  mongoose.models.otp || model<IOtpDocument>('otp', OTP, 'otp');

export default Otp;
