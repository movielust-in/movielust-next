'use client';

import { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import Form from '../../components/Form/Form';
import Validate from '../../components/Form/Validation';
import { OTP_TYPES } from '../../constants';
import { registerUser, sendOTP } from '../../lib/api/auth';

interface StepOneDataInterface {
  email: string;
  name: string;
  password: string;
}

function SignUp() {
  const router = useRouter();
  const otpRef = useRef<string>();
  const OTP_HEADER = 'Enter OTP';

  const stepOneData = useRef<StepOneDataInterface>();

  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) router.replace('/');
  }, [isLoggedIn, router]);

  // const [email, setEmail] = useState('');

  const [ProfilePicture, setProfile] = useState(
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg'
  );

  const resetOneSchema = Yup.object().shape({
    email: Validate.email,
  });

  const signUpSchema = Yup.object().shape({
    name: Validate.name,
    email: Validate.email,
    password: Validate.password,
  });

  // While Submitting
  const submitOne = async (values: StepOneDataInterface) => {
    try {
      setSubmitting(true);

      // setEmail(values.email);

      stepOneData.current = {
        email: values.email,
        name: values.name,
        password: values.password,
      };

      const otpData = await sendOTP({
        name: values.name,
        email: values.email,
        otp_type: OTP_TYPES[0],
      });

      if (otpData.status !== 'success') {
        toast(otpData.message);
      } else {
        setStep(stepTwo);
      }
    } catch (err: any) {
      toast(err.response.data.message || 'Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtp = async (otp: string) => {
    try {
      otpRef.current = otp;
      if (otp.length !== 6) {
        toast('Invalid OTP!');
        return;
      }

      setSubmitting(true);

      try {
        if (stepOneData.current) {
          const res = await registerUser({
            name: stepOneData.current.name,
            email: stepOneData.current.email,
            image: ProfilePicture,
            password: stepOneData.current.password,
            otp: Number(otpRef.current),
          });

          const { status, message } = res;

          if (status === 'success') {
            toast('Account Created');

            router.push('/signin');
          } else {
            toast(message);
          }
        }
      } catch (err: any) {
        toast(
          (err && err.message) || 'Something went Wrong. Please try again.'
        );
      }
    } catch (err: any) {
      toast(err.response.data.message || 'Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  const stepOne = {
    fields: {
      name: 'Sign Up',
      submitValue: 'Sign Up',
      inputs: [
        { field: 'profile' },
        {
          name: 'name',
          type: 'text',
          field: 'input',
          placeholder: 'Name',
        },
        {
          name: 'email',
          type: 'email',
          field: 'input',
          placeholder: 'Email',
        },
        {
          name: 'password',
          type: 'password',
          field: 'password',
          placeholder: 'Password',
          autocomplete: 'on',
        },
      ],
      links: [{ text: 'Already have an account? Login', href: '/signin' }],
    },

    formik: {
      initialValues: {
        name: '',
        email: '',
        password: '',
        profile: '',
      },

      validationSchema: signUpSchema,
      onSubmit: submitOne,
    },
  };

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
      onSubmit: () => {},
    },
  };

  const [step, setStep] = useState<any>(stepOne);

  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      <Form
        formik={step.formik}
        fields={step.fields}
        isSubmitting={submitting}
        extraData={
          step.fields.name === 'Sign Up'
            ? (pic: string) => setProfile(pic)
            : (otp: string) => handleOtp(otp)
        }
      />
    </div>
  );
}

export default SignUp;
