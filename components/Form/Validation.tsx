import * as Yup from 'yup';

const name = Yup.string()
    .min(1, 'Name Can not be Empty')
    .max(30, 'Name too long')
    .required('Required!');

const email = Yup.string()
    .email('Must be a valid email!')
    .max(255, 'Must be a valid email!')
    .required('Required!');

const password = Yup.string().min(6, 'Minimum password length is 6').required('Enter password!');

const message = Yup.string()
    .min(1, 'A empty message is no message.')
    .max(300, 'Please keep it short.')
    .required('A empty message is no message.');

const Validate = {
    name,
    email,
    password,
    message,
};

export default Validate;
