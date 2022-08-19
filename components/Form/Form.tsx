/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { Formik } from "formik";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import Modal from "react-modal";

import OtpInput from "../OtpInput/otpInput";
import FormContainer from "./FormContainer";

import { fetchAvatars } from "../../api/user";

import {
  ForgotPassImage,
  LoginImage,
  PasswordImage,
  PhoneImage,
} from "../../assets";

import styles from "../../styles/avatar_modal.module.scss";
import Spinner from "../UI/Spinner";

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
  const [otp, setOtp] = useState<any>("");

  const [profile, setProfile] = useState(
    "https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"
  );

  const openModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const customStyles: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(1,1,1,0.6)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  useEffect(() => {
    if (avatars.length > 0) return;
    fetchAvatars().then((data) => {
      setAvatars(data);
    });
  }, [avatars]);

  const changeProfile = (link: any) => {
    setProfile(link);
  };

  return (
    <FormContainer>
      <Formik {...formik}>
        {(formikProps: any) => (
          <Forem onSubmit={formikProps.handleSubmit} id="form1">
            <Title>{fields.name}</Title>

            {fields.name === "Login" ? (
              <Logo
                submitting={isSubmitting}
                src={LoginImage.src}
                alt="personlogin"
              />
            ) : null}
            {fields.name === "Contact Us" ? (
              <Logo
                submitting={isSubmitting}
                src={PhoneImage.src}
                alt="personlogin"
              />
            ) : null}

            {fields.name === "Reset Password" ? (
              <Logo
                submitting={isSubmitting}
                src={ForgotPassImage.src}
                alt="personlogin"
              />
            ) : null}

            {fields.name === "Enter OTP" ||
            fields.name === "Create New Password" ? (
              <Logo
                submitting={isSubmitting}
                src={PasswordImage.src}
                alt="personlogin"
              />
            ) : null}

            <List>
              {fields.inputs.map((field: any) => {
                switch (field.field) {
                  case "input":
                    return (
                      <Item key={field.name}>
                        <Input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autocomplete}
                          value={formikProps.values[field.name]}
                          onChange={formikProps.handleChange}
                        />
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <Error>{formikProps.errors[field.name]}</Error>
                        ) : null}
                      </Item>
                    );
                  case "password":
                    return (
                      <Item key={field.name}>
                        <Password>
                          <PassInput
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            placeholder={field.placeholder}
                            autoComplete={field.autocomplete}
                            value={formikProps.values[field.name]}
                            onChange={formikProps.handleChange}
                          />
                          {showPassword ? (
                            <HidePassword
                              onClick={() =>
                                setShowPassword((state: any) => !state)
                              }
                            />
                          ) : (
                            <ShowPassword
                              onClick={() =>
                                setShowPassword((state: any) => !state)
                              }
                            />
                          )}
                        </Password>
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <Error>{formikProps.errors[field.name]}</Error>
                        ) : null}
                      </Item>
                    );
                  case "profile":
                    return (
                      <>
                        <ProfilePicture src={profile} submitting={isSubmitting}>
                          <Edit onClick={openModal} />
                        </ProfilePicture>

                        <Modal
                          isOpen={isModalOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          className={styles.avatar_modal}
                          contentLabel="profile"
                          ariaHideApp={false}
                        >
                          {avatars.map((data: any) => (
                            <img
                              role="presentation"
                              onClick={() => {
                                changeProfile(data.id);
                                openModal();
                              }}
                              src={data.link}
                              alt="Profile"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                  "https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAx0vpY-2wMoKq6NB86jynopBLEWBi4jkOR6n3A1-bSFo7edA95Qkn5-LVZad5km8LWJ_xqMz67rHxY1SVKXxf17Ng.png";
                              }}
                            />
                          ))}
                        </Modal>

                        {formikProps.errors[profile] &&
                        formikProps.touched[profile] ? (
                          <Error>{formikProps.errors[profile]}</Error>
                        ) : null}
                      </>
                    );

                  case "OTP":
                    return (
                      <Item key={field.name}>
                        <OtpInput
                          value={otp}
                          placeholder="------"
                          numInputs={6}
                          isInputNum
                          shouldAutoFocus
                          separator={
                            <span
                              style={{
                                margin: "3px",
                              }}
                            />
                          }
                          onChange={(value: any) => setOtp(value)}
                          containerStyle={{
                            marginBottom: "20px",
                          }}
                          inputStyle={{
                            width: "30px",
                            height: "40px",
                            fontSize: "1rem",
                            fontWeight: 800,
                            borderRadius: "8px",
                          }}
                        />
                      </Item>
                    );

                  case "message":
                    return (
                      <Item key={field.name}>
                        <MessageInput
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formikProps.values[field.name]}
                          onChange={formikProps.handleChange}
                        />
                        {formikProps.errors[field.name] &&
                        formikProps.touched[field.name] ? (
                          <Error>{formikProps.errors[field.name]}</Error>
                        ) : null}
                      </Item>
                    );

                  default:
                    return null;
                }
              })}
              <Item>
                <Submit
                  type="submit"
                  submitting={isSubmitting}
                  disabled={isSubmitting}
                  onClick={
                    typeof extraData === "function"
                      ? fields.name === "Enter OTP"
                        ? () => extraData(otp)
                        : fields.name === "Sign Up"
                        ? () => extraData(profile)
                        : () => {}
                      : () => {}
                  }
                >
                  {isSubmitting ? (
                    <Spinner width={25} />
                  ) : (
                    fields.submitValue || "Submit"
                  )}
                </Submit>
              </Item>
              {fields.links &&
                fields.links.length > 0 &&
                fields.links.map((link: any) => (
                  <Link href={link.href} key={link.text}>
                    <a>
                      <p>{link.text}</p>
                    </a>
                  </Link>
                ))}
            </List>
          </Forem>
        )}
      </Formik>
    </FormContainer>
  );
}

export default Form;

const Forem = styled.form``;

const Title = styled.h2``;

const List = styled.ul``;

const threeSixty = keyframes`
0% {opacity:1;transform:scale(1);}
100% {opacity:0.2;transform:scale(0.8);}
`;

const Edit = styled(FaEdit)`
  background-color: rgba(1, 1, 1, 0.3);
  border-radius: 100%;
  height: 100%;
  padding: 60px;
  width: 100%;
`;

const Logo = styled.img<{ submitting: boolean }>`
  border-radius: 100%;
  cursor: pointer;
  width: 20%;
  ${(props) =>
    props.submitting &&
    css`
      animation: ${threeSixty} 1.5s ease 100ms infinite alternate;
    `}
  @media (max-width: 724px) {
    width: 30%;
  }
  &:hover {
    ${Edit} {
      display: flex;
    }
  }
`;

const Item = styled.li`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 3px;
`;
const ShowPassword = styled(FaEye)`
  margin: 3px;
  vertical-align: middle;
`;
const HidePassword = styled(FaEyeSlash)`
  margin: 3px;
  vertical-align: middle;
`;

const Password = styled.div`
  background-color: rgba(20, 40, 40, 0.8);
  border: 1px solid rgba(10, 180, 180, 1);
  border-left: none;
  border-radius: 8px;
  border-right: none;
  border-top: none;
  color: white;
  cursor: pointer;
  display: inline;
  margin: 8px 0;
  outline: none;

  svg {
    margin: 0 5px;
  }
`;

const PassInput = styled.input`
  background: rgba(20, 40, 40, 0.8);
  border: none;
  border-radius: 8px 0 0 8px;
  color: white;
  font-size: 15px;
  outline: none;
  padding: 10px;
  width: 230px;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: white !important;
    box-shadow: 0 0 0 30px rgba(20, 40, 40, 0.8) inset !important;
  }
  @media (max-width: 724px) {
    font-size: 1rem;
    width: 76vw;
  }
`;
const Input = styled.input`
  background: rgba(20, 40, 40, 0.8);
  border: 1px solid rgba(10, 180, 180, 1);
  border-left: none;
  border-radius: 8px;
  border-right: none;
  border-top: none;
  color: white;
  font-size: 15px;
  margin: 15px 0;
  outline: none;
  padding: 10px;
  width: 250px;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: white !important;
    box-shadow: 0 0 0 30px rgba(20, 40, 40, 0.8) inset !important;
  }

  @media (max-width: 724px) {
    margin: 8px 0;
    font-size: 1rem;
    width: 80vw;
  }
`;

const MessageInput = styled.textarea<{ type: any }>`
  background: rgba(20, 40, 40, 0.8);
  border: 1px solid rgba(10, 180, 180, 1);
  border-left: none;
  border-radius: 8px;
  border-right: none;
  border-top: none;
  color: white;
  font-size: 15px;
  height: 100px;
  margin: 15px 0;
  outline: none;
  padding: 10px;
  resize: none;
  width: 250px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 724px) {
    margin: 15px 0;
    font-size: 1rem;
    height: 70px;
    width: 80vw;
  }
`;

const Submit = styled.button<{ submitting: boolean }>`
  align-items: center;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(10, 180, 180, 1);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
  transition: 0.4s;
  width: 120px;

  &:hover {
    background: rgba(20, 20, 20, 0.8);
    width: 150px;
  }

  @media (max-width: 724px) {
    margin-top: 10px;
    font-size: 1rem;
    padding: 8px 60px;
    &:hover {
      padding: 8px 40px;
    }
    transition: all 200ms ease;
  }
`;

const Error = styled.div`
  color: rgba(255, 0, 0, 0.4);
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ProfilePicture = styled.div<{ src: string; submitting: boolean }>`
  align-items: center;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: auto;
  transition: all 200ms ease;
  width: 150px;
  ${(props) =>
    props.submitting &&
    css`
      animation: ${threeSixty} 1.5s ease 100ms infinite alternate;
    `}
`;
