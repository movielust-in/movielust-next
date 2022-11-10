/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';
import { SERVER_URI } from '../../config';
import { SingUpDataInterface } from '../../types/requestData';
import { RESET_OTP, VERIFYEMAIL_OTP, VERIFY_OTP, RESET_PASS } from '../Urls';

export const sendPassReOtp = (email: string,type:string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(RESET_OTP, { email,type });
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })();
    });

export const sendEmailVerifyOtp = (email: string, name: string, type: string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(VERIFYEMAIL_OTP, {
                    email,
                    name,
                    type,
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
    otp_type: string
) : Promise<AxiosResponse<any>>=>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.post(VERIFY_OTP, {
                    email,
                    otp,
                    otp_type,
                });
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
                    type: "ResetPassword"
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
    axios.post(`${SERVER_URI}/auth/signup`, data);
