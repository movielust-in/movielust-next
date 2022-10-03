import { useState, useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import { Validate, Form } from '..';
import 'react-toastify/dist/ReactToastify.css';

import Form from '../components/Form/Form';
import Validate from '../components/Form/Validation';

import { sendPassReOtp, verifyOtp, resetPassword } from '../helpers/user/auth';

const FORM_NAME = 'Reset Password';
const OTP_HEADER = 'Enter OTP';
const NEW_PASSWORD_H = 'Create New Password';

function ResetPass() {
  const router = useRouter();
  const otpRef = useRef<string>();

  const [email, setEmail] = useState('');

  const handleOtp = (otp: string) => {
    otpRef.current = otp;
    if (otp.length !== 6) {
      toast('Invalid OTP!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
      return;
    }
    verifyOtp(email, otp, 'resetpassword')
      .then((res: any) => {
        if (res.data === true) {
          toast('Verified', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
          setStep(stepThri);
        } else {
          toast(res.data, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        }
      })
      .catch(() => {
        toast('Something went wrong!', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
        });
      });
  };

  const resetOneSchema = Yup.object().shape({
    email: Validate.email,
  });

  const submitOne = async (values: any) => {
    try {
      setSubmitting(true);
      setEmail(values.email);
      await sendPassReOtp(values.email, 'resetpassword');
      setStep(stepTwo);
    } catch (err: any) {
      toast(err.data.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const stepOne = {
    fields: {
      name: FORM_NAME,
      submitValue: 'Send OTP',
      inputs: [
        {
          name: 'email',
          type: 'email',
          field: 'input',
          placeholder: 'Email',
        },
      ],
      links: [
        {
          text: 'If an account with given email exists a One-time password will be sent on same email address.',
          href: '/forgotpassword',
        },
      ],
    },
    formik: {
      initialValues: { email: '' },
      validationSchema: resetOneSchema,
      onSubmit: submitOne,
    },
  };

  const submitTwo = () => {};

  const stepTwo = {
    fields: {
      submitValue: 'Submit',
      name: OTP_HEADER,
      inputs: [
        {
          name: 'OTP',
          type: 'text',
          field: 'OTP',
        },
      ],
      links: [
        {
          text: 'Enter the OTP recieved on your email. OTP is valid for 10 minutes.',
          href: '/forgotpassword',
        },
        {
          text: '*Do not refresh the page.',
          href: '/forgotpassword',
        },
      ],
    },
    formik: {
      initialValues: { OTP: '' },
      validationSchema: resetOneSchema,
      onSubmit: submitTwo,
    },
  };

  const submitThri = (values: any) => {
    if (values.password !== values.cnfPassword) {
      toast('Password does not match!');
    } else {
      resetPassword(email, otpRef.current!, values.password)
        .then((res: any) => {
          const { data } = res;
          if (data === true) {
            toast('Password Updated!');
            router.push('/signin');
          } else {
            toast(data.message);
            router.push('/signin');
          }
        })
        .catch(() => {
          toast('Something Went Wrong!');
        });
    }
  };

  const newPassSchema = Yup.object().shape({
    password: Validate.password,
    cnfPassword: Validate.password,
  });

  const stepThri = {
    fields: {
      submitValue: 'Set Password',
      name: NEW_PASSWORD_H,
      inputs: [
        {
          name: 'password',
          type: 'password',
          field: 'password',
          placeholder: 'New Password',
        },
        {
          name: 'cnfPassword',
          type: 'password',
          field: 'password',
          placeholder: 'Confirm Password',
        },
      ],
      links: [
        {
          text: '*Password must be at least 6 character long.',
          href: '/forgotpassword',
        },
        {
          text: '*Do not refresh the page.',
          href: '/forgotpassword',
        },
      ],
    },
    formik: {
      initialValues: { password: '', cnfPassword: '' },
      validationSchema: newPassSchema,
      onSubmit: submitThri,
    },
  };

  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<any>(stepOne);

  return (
    <Form
      formik={step.formik}
      fields={step.fields}
      isSubmitting={submitting}
      extraData={(otp: any) => handleOtp(otp)}
    />
  );
}

export default ResetPass;
