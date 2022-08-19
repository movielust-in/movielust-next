import { useState, useRef } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter as useNavigate } from "next/router";

// import { Validate, Form } from '..';

import Form from "./Form";
import Validate from "./Validation";

import { sendPassReOtp, verifyOtp, resetPassword } from "../../api/user/auth";

const FORM_NAME = "Reset Password";
const OTP_HEADER = "Enter OTP";
const NEW_PASSWORD_H = "Create New Password";

function ResetPass() {
  const navigate = useNavigate();
  const otpRef = useRef<string>();

  const [email, setEmail] = useState("");

  const handleOtp = (otp: string) => {
    otpRef.current = otp;
    if (otp.length !== 6) {
      toast("Invalid OTP!");
      return;
    }
    verifyOtp(email, otp, 1)
      .then((res: any) => {
        if (res && res.data && res.data.success === true) {
          setStep(stepThri);
        } else {
          toast(res.data.message || "Something went wrong!");
        }
      })
      .catch(() => {
        toast("Something went wrong!");
      });
  };

  const resetOneSchema = Yup.object().shape({
    email: Validate.email,
  });

  const submitOne = async (values: any) => {
    try {
      setSubmitting(true);
      setEmail(values.email);
      await sendPassReOtp(values.email);
      setStep(stepTwo);
    } catch (err: any) {
      toast(err.response.data.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const stepOne = {
    fields: {
      name: FORM_NAME,
      submitValue: "Send OTP",
      inputs: [
        {
          name: "email",
          type: "email",
          field: "input",
          placeholder: "Email",
        },
      ],
      links: [
        {
          text: "If an account with given email exists a One-time password will be sent on same email address.",
          href: "/forgotpassword",
        },
      ],
    },
    formik: {
      initialValues: { email: "" },
      validationSchema: resetOneSchema,
      onSubmit: submitOne,
    },
  };

  const submitTwo = () => {};

  const stepTwo = {
    fields: {
      submitValue: "Submit",
      name: OTP_HEADER,
      inputs: [
        {
          name: "OTP",
          type: "text",
          field: "OTP",
        },
      ],
      links: [
        {
          text: "Enter the OTP recieved on your email. OTP is valid for 10 minutes.",
          href: "/forgotpassword",
        },
        {
          text: "*Do not refresh the page.",
          href: "/forgotpassword",
        },
      ],
    },
    formik: {
      initialValues: { OTP: "" },
      validationSchema: resetOneSchema,
      onSubmit: submitTwo,
    },
  };

  const submitThri = (values: any) => {
    if (values.password !== values.cnfPassword) {
      toast("Password does not match!");
    } else {
      resetPassword(email, otpRef.current!, values.password)
        .then((res: any) => {
          const { data } = res;
          if (data.success === true) {
            toast("Password Updated!");
            navigate.push("/login");
          } else {
            toast(data.message);
            navigate.push("/login");
          }
        })
        .catch(() => {
          toast("Something Went Wrong!");
        });
    }
  };

  const newPassSchema = Yup.object().shape({
    password: Validate.password,
    cnfPassword: Validate.password,
  });

  const stepThri = {
    fields: {
      submitValue: "Set Password",
      name: NEW_PASSWORD_H,
      inputs: [
        {
          name: "password",
          type: "password",
          field: "password",
          placeholder: "New Password",
        },
        {
          name: "cnfPassword",
          type: "password",
          field: "password",
          placeholder: "Confirm Password",
        },
      ],
      links: [
        {
          text: "*Password must be at least 6 character long.",
          href: "/forgotpassword",
        },
        {
          text: "*Do not refresh the page.",
          href: "/forgotpassword",
        },
      ],
    },
    formik: {
      initialValues: { password: "", cnfPassword: "" },
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
