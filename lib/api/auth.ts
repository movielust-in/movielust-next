import { ApiResonse } from '../../types/api-responses';

import { post, put } from './api-fetch';

interface IUserRegister {
  name: string;
  email: string;
  image: string;
  password: string;
  otp: number;
}

export const registerUser = (userData: IUserRegister) =>
  post<IUserRegister, ApiResonse>('/api/auth/register', userData);

type OTP_TYPE = 'SIGN_UP' | 'RESET_PASS';

interface IVerifyOTP {
  email: string;
  otp: string | number;
  otp_type: OTP_TYPE;
}

export const verifyOTP = (otpData: IVerifyOTP) =>
  put<IVerifyOTP, ApiResonse>('/api/auth/verify-otp', otpData);

type ISendOTP =
  | {
      name: string;
      email: string;
      otp_type: 'SIGN_UP';
    }
  | { email: string; otp_type: 'RESET_PASS' };

export const sendOTP = (sendOTPBody: ISendOTP) =>
  post<ISendOTP, ApiResonse>('/api/auth/send-otp', sendOTPBody);

interface IResetPassword {
  email: string;
  otp: string | number;
  password: string;
  otp_type: OTP_TYPE;
}

export const resetUserPassword = (body: IResetPassword) =>
  put<IResetPassword, ApiResonse>('/api/auth/reset-password', body);
