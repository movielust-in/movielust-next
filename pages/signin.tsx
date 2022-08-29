import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Head from 'next/head';

import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';

import { useDispatch } from '../redux';
import Form from '../components/Form/Form';
import Validate from '../components/Form/Validation';
import { setUserLogin } from '../redux/reducers/user.reducer';
import { login as loginUser } from '../helpers/user/auth';
import { useSelector } from '../redux/store';

function Login() {
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.replace('/');
  }, [isLoggedIn, router]);

  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  let redirectTo = (router.query.redirectto || '/') as string;

  redirectTo =
    redirectTo !== '/' &&
    (redirectTo.includes('/signin') || redirectTo.includes('/signup'))
      ? '/'
      : redirectTo;

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

    try {
      const response = await loginUser(values.email, values.password);

      // toast(response.data.message);

      if (response.status === 200 && response.data.success) {
        const user = response.data;
        const userObj = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.profile,
          isLoggedIn: user.success,
          token: user.token,
        };
        dispatch(setUserLogin(userObj));
        localStorage.setItem('movielust_user', user.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        router.push(redirectTo);
      }
    } catch (err: any) {
      // toast(err.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = {
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit,
  };

  return (
    <>
      <Head>
        <title>Sign in - Movielust</title>
      </Head>
      <Form
        formik={formik}
        fields={fields}
        isSubmitting={submitting}
        extraData={() => login()}
      />
    </>
  );
}

export default Login;
