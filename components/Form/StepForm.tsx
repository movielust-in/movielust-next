/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Formik, FormikProps, FormikValues } from 'formik';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';

import FormContainer from './FormContainer';
import { fetchAvatars } from '../../helpers/user';

import styles from './form.module.scss';

// import '../../styles/avatar_modal.css';

import { Avatar } from '../../types/avatar';

const Modal = dynamic(() => import('react-modal'));
const OtpInput = dynamic(() => import('../OtpInput/otpInput'));

interface FormProps {
  formik: any;
  steps: any;
  fields: {
    name: string;
    inputs: Array<{
      field: string;
      name: string;
      type: string;
      autoComplete: string;
      placeholder: string;
    }>;
    submitValue?: string;
    links: Array<{ text: string; href: string }>;
  };
  isSubmitting: boolean;
  login: any;
}

function Form({ formik, steps, fields, isSubmitting, login }: FormProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  const [showHidePassword, changeShowHidePassword] = useState(false);
  const [otp, setOtp] = useState<string | number>('');

  const [profile, setProfile] = useState(
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg'
  );

  const openModal = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(1,1,1,0.6)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  useEffect(() => {
    if (avatars.length > 0) return;
    fetchAvatars().then((res) => {
      setAvatars(res.data as any);
    });
  }, [avatars]);

  const changeProfile = (_avatarId: number, link: string) => {
    setProfile(link);
  };

  return (
    <FormContainer>
      {steps.map(() => (
        <Formik {...formik}>
          {(formikProps: FormikProps<FormikValues>) => (
            <form onSubmit={formikProps.handleSubmit} id="form1">
              <h2>{fields.name}</h2>

              {fields.name === 'Login' ? (
                <img
                  className={`${styles.Logo} ${
                    isSubmitting ? styles.submitting : ''
                  }`}
                  src="/images/login.png"
                  alt="personlogin"
                />
              ) : null}
              {fields.name === 'Contact Us' ? (
                <img
                  className={`${styles.Logo} ${
                    isSubmitting ? styles.submitting : ''
                  }`}
                  src="/images/phone.png"
                  alt="personlogin"
                />
              ) : null}

              {fields.name === 'Reset Password' ? (
                <img
                  className={`${styles.Logo} ${
                    isSubmitting ? styles.submitting : ''
                  }`}
                  src="/images/forgot_pass.png"
                  alt="personlogin"
                />
              ) : null}

              <ul>
                {fields.inputs.map((field) => {
                  switch (field.field) {
                    case 'input':
                      return (
                        <li className={styles.Item} key={field.name}>
                          <input
                            className={styles.Input}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            value={formikProps.values[field.name]}
                            onChange={formikProps.handleChange}
                          />
                          {formikProps.errors[field.name] &&
                          formikProps.touched[field.name] ? (
                            <div className={styles.Error}>
                              {formikProps.errors[field.name] as string}
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
                              type={showHidePassword ? 'text' : 'password'}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                              value={formikProps.values[field.name]}
                              onChange={formikProps.handleChange}
                            />
                            {showHidePassword ? (
                              <FaEyeSlash
                                className={styles.HidePassword}
                                onClick={() =>
                                  changeShowHidePassword((state) => !state)
                                }
                              />
                            ) : (
                              <FaEye
                                className={styles.ShowPassword}
                                onClick={() =>
                                  changeShowHidePassword((state) => !state)
                                }
                              />
                            )}

                            {formikProps.errors[field.name] &&
                            formikProps.touched[field.name] ? (
                              <div className={styles.Error}>
                                {formikProps.errors[field.name] as string}
                              </div>
                            ) : null}
                          </div>
                        </li>
                      );
                    case 'profile':
                      return (
                        <>
                          <div
                            className={styles.ProfilePicture}
                            style={{ backgroundImage: profile }}
                          >
                            <FaEdit
                              className={styles.Edit}
                              onClick={openModal}
                            />
                          </div>

                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles as any}
                            className="avatar_modal"
                            contentLabel="profile"
                            ariaHideApp={false}
                          >
                            {avatars.map((data: Avatar) => (
                              <img
                                role="presentation"
                                key={data.id}
                                onClick={() => {
                                  changeProfile(data.id, data.link);
                                  openModal();
                                }}
                                src={data.link}
                                alt="Profile"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    'https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAx0vpY-2wMoKq6NB86jynopBLEWBi4jkOR6n3A1-bSFo7edA95Qkn5-LVZad5km8LWJ_xqMz67rHxY1SVKXxf17Ng.png';
                                }}
                              />
                            ))}
                          </Modal>

                          {formikProps.errors[profile] &&
                          formikProps.touched[profile] ? (
                            <div className={styles.Error}>
                              {formikProps.errors[profile] as string}
                            </div>
                          ) : null}
                        </>
                      );

                    case 'OTP':
                      return (
                        <li className={styles.Item} key={field.name}>
                          <OtpInput
                            value={otp}
                            placeholder="000000"
                            numInputs={6}
                            isInputNum
                            shouldautofocus
                            separator={<span>--</span>}
                            onChange={(value: string | number) => setOtp(value)}
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
                            placeholder={field.placeholder}
                            value={formikProps.values[field.name]}
                            onChange={formikProps.handleChange}
                          />
                          {formikProps.errors[field.name] &&
                          formikProps.touched[field.name] ? (
                            <div className={styles.Error}>
                              {formikProps.errors[field.name] as string}
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
                    onClick={login instanceof Function ? login(profile) : null}
                  >
                    {fields.submitValue || 'Submit'}
                  </button>
                </li>
                {fields.links &&
                  fields.links.length > 0 &&
                  fields.links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      <a>
                        <p>{link.text}</p>
                      </a>
                    </Link>
                  ))}
              </ul>
            </form>
          )}
        </Formik>
      ))}
    </FormContainer>
  );
}

export default Form;
