import { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// import { Form, Validate } from '../components';

import Form from "../components/Form/Form";
import Validate from "../components/Form/Validation";

import {
  sendEmailVerifyOtp,
  submitSingUp,
  verifyOtp,
} from "../helpers/user/auth";

interface StepOneDataInterface {
  email: string;
  name: string;
  password: string;
}

function SignUp() {
  const router = useRouter();
  const otpRef = useRef<string>();
  const OTP_HEADER = "Enter OTP";

  const stepOneData = useRef<StepOneDataInterface>();

  useEffect(() => {
    document.title = "Signup - Movielust";
  }, []);

  const [email, setEmail] = useState("");

  const [ProfilePicture, setProfile] = useState(
    "https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"
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

      setEmail(values.email);

      stepOneData.current = {
        email: values.email,
        name: values.name,
        password: values.password,
      };

      await sendEmailVerifyOtp(values.email, values.name);

      setStep(stepTwo);
    } catch (err: any) {
      toast(err.response.data.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtp = async (otp: string) => {
    try {
      otpRef.current = otp;
      if (otp.length !== 6) {
        toast("Invalid OTP!");
        return;
      }

      setSubmitting(true);

      const verifyOtpRes = await verifyOtp(email, otp, 0);

      if (
        verifyOtpRes &&
        verifyOtpRes.data &&
        verifyOtpRes.data.success === true
      ) {
        if (stepOneData.current) {
          const registerRes = await submitSingUp({
            name: stepOneData.current.name,
            email: stepOneData.current.email,
            profile: ProfilePicture,
            password: stepOneData.current.password,
          });

          toast(registerRes.data.message);

          router.push("/signin");
        }
      } else {
        toast(verifyOtpRes.data.message);
      }
    } catch (err: any) {
      toast(err.response.data.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const stepOne = {
    fields: {
      name: "Sign Up",
      submitValue: "Sign Up",
      inputs: [
        { field: "profile" },
        {
          name: "name",
          type: "text",
          field: "input",
          placeholder: "Name",
        },
        {
          name: "email",
          type: "email",
          field: "input",
          placeholder: "Email",
        },
        {
          name: "password",
          type: "password",
          field: "password",
          placeholder: "Password",
          autocomplete: "on",
        },
      ],
      links: [{ text: "Already have an account? Login", href: "/signin" }],
    },

    formik: {
      initialValues: {
        name: "",
        email: "",
        password: "",
        profile: "",
      },

      validationSchema: signUpSchema,
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

  const [step, setStep] = useState<any>(stepOne);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Form
      formik={step.formik}
      fields={step.fields}
      isSubmitting={submitting}
      extraData={
        step.fields.name === "Sign Up"
          ? (pic: string) => setProfile(pic)
          : (otp: string) => handleOtp(otp)
      }
    />
  );
}

export default SignUp;
