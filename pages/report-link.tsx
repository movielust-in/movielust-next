import { useEffect } from "react";
import styled from "@emotion/styled";

import { MovielustLogo } from "../assets";
import Image from "next/image";

function Contactus() {
  useEffect(() => {
    document.title = "Report - Movielust";
  }, []);
  return (
    <Container>
      <Contact>
        <Info>
          <h2>Welcome to Movielust</h2>
          <Image src={MovielustLogo} alt="logo" />
          <p>A New Experience for your movie lust</p>
        </Info>
        <Form>
          <form action="#" method="POST" name="signupform">
            <h2>Report</h2>
            <ul>
              <li>
                <Input placeholder="Name" />
              </li>

              <li>
                <Input placeholder="Email" />
              </li>
              <li>
                <Input placeholder="Movie/Series name" />
              </li>
              <li>
                <MessageInput placeholder="Message" />
              </li>
              <Submit>
                <li>Submit</li>
              </Submit>
            </ul>
          </form>
        </Form>
      </Contact>
    </Container>
  );
}

export default Contactus;

const Container = styled.div`
  overflow: hidden;

  &:before {
    background-image: url("/images/25565.webp");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
`;

const Contact = styled.div`
  background-image: url("/images/25560.webp");
  background-repeat: no-repeat;
  border: 1px solid silver;
  border-radius: 15px;
  color: white;
  display: flex;
  height: 550px;
  margin: 5% 20% 1%;
  text-align: center;
  width: 900px;

  @media (max-width: 724px) {
    margin: 5% 3% 5%;
    width: 90%;
    height: 480px;
    max-width: 900px;
  }
`;

const Info = styled.div`
  background: rgba(20, 20, 20, 0.8);
  border-radius: 15px 0 0 15px;
  border-radius: 15px;
  width: 45%;
  h2 {
    font-size: 30px;
    font-weight: 500;
    padding-top: 35px;
  }
  p {
    font-size: 16px;
    padding: 40px;
  }
  img {
    height: 38%;
    width: 68%;
  }

  @media (max-width: 724px) {
    width: 50%;
    h2 {
      padding-top: 48px;
      font-weight: 500;
      font-size: 20px;
    }
    p {
      font-size: 12px;
      padding: 20px;
    }
    img {
      width: 90%;
      height: 28%;
    }
  }
`;

const Form = styled.div`
  background: rgba(9, 13, 21, 0.65);
  border-radius: 0 15px 15px 0;
  padding: 10px 0;
  transition: 0.2s;
  width: 70%;
  ul {
    list-style-type: none;
    padding: 0;
  }
  h2 {
    font-size: 30px;
    font-weight: 500;
  }
  @media (max-width: 724px) {
    h2 {
      font-size: 24px;
    }
  }
`;

const Input = styled.input`
  background: rgba(20, 40, 40, 0.8);
  border: 1px solid rgba(10, 180, 180, 1);
  border-left: none;
  border-right: none;
  border-top: none;
  color: white;
  font-size: 15px;
  margin: 15px 0;
  outline: none;
  padding: 10px;
  width: 250px;
  @media (max-width: 724px) {
    margin: 10px 0;
    font-size: 10px;
    width: 150px;
  }
`;
const MessageInput = styled.textarea`
  background: rgba(20, 40, 40, 0.8);
  border: 1px solid rgba(10, 180, 180, 1);
  border-left: none;
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
    font-size: 10px;
    height: 70px;
    width: 150px;
  }
`;

const Submit = styled.button`
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(10, 180, 180, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 15px;
  margin-top: 20px;
  padding: 10px 50px;
  transition: 0.4s;
  &:hover {
    background: rgba(20, 20, 20, 0.8);
    padding: 10px 80px;
  }
  @media (max-width: 724px) {
    margin-top: 10px;
    font-size: 12px;
    transition: none;
    padding: 8px 40px;
    &:hover {
      padding: 8px 40px;
    }
  }
`;
