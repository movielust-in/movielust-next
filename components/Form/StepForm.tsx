/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { Formik, FormikProps, FormikValues } from "formik";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";
import OtpInput from "../OtpInput/otpInput";

import FormContainer from "./FormContainer";
import { fetchAvatars } from "../../api/user";

import { ForgotPassImage, LoginImage, PhoneImage } from "../../assets";

import "../../styles/avatar_modal.css";
import { Avatar } from "../../types/avatar";

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
  const [otp, setOtp] = useState<string | number>("");

  const [profile, setProfile] = useState(
    "https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"
  );

  const openModal = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
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

  const changeProfile = (_avatarId: number, link: string) => {
    setProfile(link);
  };

  return (
    <FormContainer>
      {steps.map(() => (
        <Formik {...formik}>
          {(formikProps: FormikProps<FormikValues>) => (
            <Forem onSubmit={formikProps.handleSubmit} id="form1">
              <Title>{fields.name}</Title>

              {fields.name === "Login" ? (
                <Logo
                  submitting={isSubmitting}
                  src={LoginImage}
                  alt="personlogin"
                />
              ) : null}
              {fields.name === "Contact Us" ? (
                <Logo
                  submitting={isSubmitting}
                  src={PhoneImage}
                  alt="personlogin"
                />
              ) : null}

              {fields.name === "Reset Password" ? (
                <Logo
                  submitting={isSubmitting}
                  src={ForgotPassImage}
                  alt="personlogin"
                />
              ) : null}

              <List>
                {fields.inputs.map((field) => {
                  switch (field.field) {
                    case "input":
                      return (
                        <Item key={field.name}>
                          <Input
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            value={formikProps.values[field.name]}
                            onChange={formikProps.handleChange}
                          />
                          {formikProps.errors[field.name] &&
                          formikProps.touched[field.name] ? (
                            <Error>
                              {formikProps.errors[field.name] as string}
                            </Error>
                          ) : null}
                        </Item>
                      );
                    case "password":
                      return (
                        <Item key={field.name}>
                          <Password>
                            <PassInput
                              name={field.name}
                              type={showHidePassword ? "text" : "password"}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                              value={formikProps.values[field.name]}
                              onChange={formikProps.handleChange}
                            />
                            {showHidePassword ? (
                              <HidePassword
                                onClick={() =>
                                  changeShowHidePassword((state) => !state)
                                }
                              />
                            ) : (
                              <ShowPassword
                                onClick={() =>
                                  changeShowHidePassword((state) => !state)
                                }
                              />
                            )}

                            {formikProps.errors[field.name] &&
                            formikProps.touched[field.name] ? (
                              <Error>
                                {formikProps.errors[field.name] as string}
                              </Error>
                            ) : null}
                          </Password>
                        </Item>
                      );
                    case "profile":
                      return (
                        <>
                          <ProfilePicture src={profile}>
                            <Edit onClick={openModal} />
                          </ProfilePicture>

                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            className="avatar_modal"
                            contentLabel="profile"
                            ariaHideApp={false}
                          >
                            {avatars.map((data: Avatar) => (
                              // eslint-disable-next-line react/jsx-key
                              <img
                                role="presentation"
                                onClick={() => {
                                  changeProfile(data.id, data.link);
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
                            <Error>
                              {formikProps.errors[profile] as string}
                            </Error>
                          ) : null}
                        </>
                      );

                    case "OTP":
                      return (
                        <Item key={field.name}>
                          <OtpInput
                            value={otp}
                            placeholder="000000"
                            numInputs={6}
                            isInputNum
                            shouldAutoFocus
                            separator={<span>--</span>}
                            onChange={(value: string | number) => setOtp(value)}
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
                            <Error>
                              {formikProps.errors[field.name] as string}
                            </Error>
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
                    onClick={login instanceof Function ? login(profile) : null}
                  >
                    {fields.submitValue || "Submit"}
                  </Submit>
                </Item>
                {fields.links &&
                  fields.links.length > 0 &&
                  fields.links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      <p>{link.text}</p>
                    </Link>
                  ))}
              </List>
            </Forem>
          )}
        </Formik>
      ))}
    </FormContainer>
  );
}

export default Form;

const Forem = styled.form``;

const Title = styled.h2``;

const List = styled.ul``;
// const Space = styled.div`
//   margin-top: 50px;
// `;

const threeSixty = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
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
  border-radius: 10px;
  border-right: none;
  border-top: none;
  color: white;
  cursor: pointer;
  display: inline;
  margin-top: 10px;
  outline: none;
`;

const PassInput = styled.input`
  background: rgba(20, 40, 40, 0.8);
  border: none;
  border-radius: 10px 0 0 10px;
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
  border-radius: 10px;
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
  border-radius: 10px;
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

const Submit = styled.button`
  align-self: center;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(10, 180, 180, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 20px;
  transition: 0.4s;

  &:hover {
    background: rgba(20, 20, 20, 0.8);
    padding: 10px 80px;
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

const ProfilePicture = styled.div<{ src: string }>`
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
`;
