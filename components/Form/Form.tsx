/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';

import FormContainer from './FormContainer';

import { fetchAvatars } from '../../helpers/user';

import styles from './form.module.scss';

const Spinner = dynamic(() => import('../UI/Spinner'));
const Modal = dynamic(() => import('react-modal'));
const OtpInput = dynamic(() => import('../OtpInput/otpInput'));

interface FormProps {
  formik: any;
  fields: any;
  isSubmitting: boolean;
  extraData?: any;
}

Form.defaultProps = {
  extraData: () => {},
};

function Form({ formik, fields, isSubmitting, extraData }: FormProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<any>([]);
  const [showPassword, setShowPassword] = useState<any>(false);
  const [otp, setOtp] = useState<any>('');

  const [profile, setProfile] = useState(
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg'
  );

  useEffect(() => {
    if (avatars.length > 0) return;
    fetchAvatars().then((res) => {
      setAvatars(res.data as any);
    });
  }, [avatars]);

  const openModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
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

  const changeProfile = (link: any) => {
    setProfile(link);
  };

  return (
    <FormContainer>
      <Formik {...formik}>
        {(formikProps: any) => (
          <form onSubmit={formikProps.handleSubmit} id="form1">
            <h2>{fields.name}</h2>

            {fields.name === 'Login' ? (
              <img
                className={`${styles.Logo} ${
                  isSubmitting ? styles.submitting : ''
                }`}
                // submitting={isSubmitting}
                src="/images/login.png"
                alt="personlogin"
              />
            ) : null}
            {fields.name === 'Contact Us' ? (
              <img
                className={`${styles.Logo} ${
                  isSubmitting ? styles.submitting : ''
                }`}
                // submitting={isSubmitting}
                src="/images/phone.png"
                alt="personlogin"
              />
            ) : null}

            {fields.name === 'Reset Password' ? (
              <img
                className={`${styles.Logo} ${
                  isSubmitting ? styles.submitting : ''
                }`}
                // submitting={isSubmitting}
                src="/images/password.png"
                alt="personlogin"
              />
            ) : null}

            {fields.name === 'Enter OTP' ||
            fields.name === 'Create New Password' ? (
              <img
                className={`${styles.Logo} ${
                  isSubmitting ? styles.submitting : ''
                }`}
                // submitting={isSubmitting}
                src="/images/forgot_pass.png"
                alt="personlogin"
              />
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
                  case 'profile':
                    return (
                      <>
                        <div
                          className={`${styles.ProfilePicture}
                           ${isSubmitting ? styles.submitting : ''}`}
                          style={{ backgroundImage: `url(${profile})` }}
                          // submitting={isSubmitting}
                        >
                          <FaEdit
                            className={styles.Edit}
                            id="editProfilePicture"
                            onClick={openModal}
                          />
                        </div>

                        <Modal
                          isOpen={isModalOpen}
                          onRequestClose={closeModal}
                          style={customStyles as any}
                          className={styles.avatar_modal}
                          contentLabel="profile"
                          ariaHideApp={false}
                        >
                          {avatars.map((data: any) => (
                            <img
                              role="presentation"
                              key={data.link}
                              onClick={() => {
                                changeProfile(data.link);
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
                            {formikProps.errors[profile]}
                          </div>
                        ) : null}
                      </>
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
                  (<Link href={link.href} key={link.text}>

                    <p>{link.text}</p>

                  </Link>)
                ))}
            </ul>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default Form;
