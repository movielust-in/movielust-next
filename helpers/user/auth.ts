import axios, { AxiosResponse } from 'axios';
import { SERVER_URI } from '../../config';
import { SingUpDataInterface } from '../../types/requestData';
import { RESET_OTP, VERIFYEMAIL_OTP, VERIFY_OTP, RESET_PASS } from '../Urls';

export const sendPassReOtp = (email: string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(RESET_OTP, { email });
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })();
    });

export const sendEmailVerifyOtp = (email: string, name: string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(VERIFYEMAIL_OTP, {
                    email,
                    name,
                });
                if (res.status === 200) resolve(res);
                else reject();
            } catch {
                reject();
            }
        })();
    });

export const verifyOtp = (
    email: string,
    otp: string,
    otp_type: number
): Promise<AxiosResponse<any>> =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get(VERIFY_OTP(email, otp, otp_type));
                resolve(res);
            } catch {
                reject();
            }
        })();
    });

export const resetPassword = (email: string, otp: string, newPassword: string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(RESET_PASS, {
                    email,
                    otp,
                    password: newPassword,
                });
                resolve(res);
            } catch {
                reject();
            }
        })();
    });

export const login = (email: string, password: string) =>
    axios.post(`${SERVER_URI}/auth/login`, {
        email,
        password,
    });

export const getProfile = (token: string) =>
    axios.get(`${SERVER_URI}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const submitSingUp = (data: SingUpDataInterface) =>
    axios.post(`${SERVER_URI}/auth/register`, data);
