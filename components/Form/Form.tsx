'use client';

/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import FormContainer from './FormContainer';
import styles from './form.module.scss';

const Spinner = dynamic(() => import('../UI/Spinner'));
const OtpInput = dynamic(() => import('../OtpInput/otpInput'));

interface FormProps {
  formik: any;
  fields: any;
  isSubmitting: boolean;
  formLogo?: string;
  extraData?: any;
}

function Form({
  formik,
  fields,
  formLogo,
  isSubmitting,
  extraData = () => {},
}: FormProps) {
  const [otp, setOtp] = useState<any>('');
  const [showPassword, setShowPassword] = useState<any>(false);

  const profile =
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg';

  return (
    <FormContainer>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Formik {...formik}>
        {(formikProps: any) => (
          <form onSubmit={formikProps.handleSubmit} id="form1">
            <h2>{fields.name}</h2>

            {formLogo ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.Logo} src={formLogo} alt={fields.name} />
              </div>
            ) : null}

            <ul>
              {fields.inputs.map((field: any) => {
                switch (field.field) {
                  case 'input':
                    return (
                      <li className={styles.Item} key={field.name}>
                        <input
                          className={styles.Input}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autocomplete}
                          value={formikProps.values[field.name]}
                          onChange={formikProps.handleChange}
                        />
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <div className={styles.Error}>
                            {formikProps.errors[field.name]}
                          </div>
                        ) : null}
                      </li>
                    );
                  case 'password':
                    return (
                      <li className={styles.Item} key={field.name}>
                        <div className={styles.Password}>
                          <input
                            className={styles.PassInput}
                            name={field.name}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={field.placeholder}
                            autoComplete={field.autocomplete}
                            value={formikProps.values[field.name]}
                            onChange={formikProps.handleChange}
                          />
                          {showPassword ? (
                            <FaEyeSlash
                              className={styles.HidePassword}
                              onClick={() =>
                                setShowPassword((state: any) => !state)
                              }
                            />
                          ) : (
                            <FaEye
                              className={styles.ShowPassword}
                              onClick={() =>
                                setShowPassword((state: any) => !state)
                              }
                            />
                          )}
                        </div>
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <div className={styles.Error}>
                            {formikProps.errors[field.name]}
                          </div>
                        ) : null}
                      </li>
                    );

                  case 'OTP':
                    return (
                      <li className={styles.Item} key={field.name}>
                        <OtpInput
                          value={otp}
                          placeholder="------"
                          numInputs={6}
                          isInputNum
                          shouldautofocus
                          separator={
                            <span
                              style={{
                                margin: '3px',
                              }}
                            />
                          }
                          onChange={(value: any) => setOtp(value)}
                          containerStyle={{
                            marginBottom: '20px',
                          }}
                          inputStyle={{
                            width: '30px',
                            height: '40px',
                            fontSize: '1rem',
                            fontWeight: 800,
                            borderRadius: '8px',
                          }}
                        />
                      </li>
                    );

                  case 'message':
                    return (
                      <li className={styles.Item} key={field.name}>
                        <textarea
                          className={styles.MessageInput}
                          name={field.name}
                          // type={field.type}
                          placeholder={field.placeholder}
                          value={formikProps.values[field.name]}
                          onChange={formikProps.handleChange}
                        />
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <div className={styles.Error}>
                            {formikProps.errors[field.name]}
                          </div>
                        ) : null}
                      </li>
                    );

                  default:
                    return null;
                }
              })}
              <li className={styles.Item}>
                <button
                  className={styles.Submit}
                  type="submit"
                  // submitting={isSubmitting}
                  disabled={isSubmitting}
                  onClick={
                    typeof extraData === 'function'
                      ? fields.name === 'Enter OTP'
                        ? () => extraData(otp)
                        : fields.name === 'Sign Up'
                        ? () => extraData(profile)
                        : () => {}
                      : () => {}
                  }
                >
                  {isSubmitting ? (
                    <Spinner width={25} />
                  ) : (
                    fields.submitValue || 'Submit'
                  )}
                </button>
              </li>
              {fields.links &&
                fields.links.length > 0 &&
                fields.links.map((link: any) => (
                  <Link prefetch={false} href={link.href} key={link.text}>
                    <p>{link.text}</p>
                  </Link>
                ))}
            </ul>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default Form;
