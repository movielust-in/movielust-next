'use client';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Form from '../../components/Form/Form';
import Validate from '../../components/Form/Validation';
import Loading from '../../components/UI/Loading';

function Login() {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') router.replace('/');
  }, [status, router]);

  const [submitting, setSubmitting] = useState(false);

  const login = () => {};

  const fields = {
    name: 'Login',
    inputs: [
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
    links: [
      { text: 'Forgot Password?', href: '/forgotpassword' },
      { text: 'Create a new account', href: '/signup' },
    ],
    submitValue: 'Login',
  };

  const loginSchema = Yup.object().shape({
    email: Validate.email,
    password: Validate.password,
  });

  const onSubmit = async (values: any) => {
    setSubmitting(true);

    const toastId = toast.loading('Signing in...', { autoClose: false });

    const singInResult = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    const isError = singInResult?.error;

    toast.update(toastId, {
      render: isError ?? 'Signed in.',
      type: isError ? 'error' : 'success',
      isLoading: false,
      autoClose: 2000,
    });

    setSubmitting(false);
  };

  const formik = {
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit,
  };

  if (status === 'loading') return <Loading />;

  return (
    <>
      <Head>
        <title>Sign in - Movielust</title>
      </Head>
      <Form
        formik={formik}
        fields={fields}
        isSubmitting={submitting}
        formLogo="/images/login.png"
        extraData={() => login()}
      />
    </>
  );
}

export default Login;
