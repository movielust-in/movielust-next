import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Link from "next/link";
// import { BsInstagram } from 'react-icons/bs';

function Footer() {
  return (
    <Container>
      <Link href="/">
        <a>
          <TitleBar>
            <Title> Movielust </Title>
          </TitleBar>
        </a>
      </Link>
      <Footernotice>
        <Link href="/aboutus">
          <a>About us</a>
        </Link>
        <Link href="/disclaimer">
          <a>Disclaimer</a>
        </Link>
        <Link href="/contactus">
          <a>Contact us</a>
        </Link>
      </Footernotice>
      <MDBContainer>
        &copy; {new Date().getFullYear()} Copyright : The DBA Pvt.{" "}
      </MDBContainer>
      <MDBContainer>All rights reserved</MDBContainer>
    </Container>
  );
}
export default Footer;

const Container = styled.div`
  background-color: #031d30;
  bottom: 0;
  padding: 0 60px 20px 60px;
  user-select: none;
  @media (max-width: 724px) {
    padding: 0 40px 80px 40px;
  }
`;
const Glow = keyframes`
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0000FF,
      0 0 40px #e60073, 0 0 40px #e60073, 0 0 40px #0000FF, 0 0 40px #0000FF;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #0000FF, 0 0 60px #0000FF, 0 0 70px #0000FF, 0 0 80px #ff4da6;
  }
`;

const Title = styled.h1`
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 40px;
  font-weight: 550;
  letter-spacing: 1px;
  margin: 0;
  padding: 10px;

  &:hover {
    /* text-shadow: 1px 1px 2px black, 0 0 30px blue, 0 0 55px darkblue;
    transition: text-shadow 1s; */
    animation: ${Glow} 1500ms ease-in-out infinite alternate;
  }
  @media (max-width: 724px) {
    font-size: 25px;
  }
`;
const TitleBar = styled.div`
  border-bottom: 1px solid silver;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 724px) {
    margin-bottom: 10px;
  }
`;

const Footernotice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5px;

  a {
    border-left: 1px solid silver;
    border-right: 1px solid silver;
    color: white;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
    padding: 0 20px 0 20px;
    text-decoration: none;
  }
  @media (max-width: 724px) {
    margin-bottom: 0;
    a {
      font-size: 10px;
      padding: 0 5px 0 5px;
    }
  }
  @media (max-width: 400px) {
    a {
      font-size: 8px;
      padding: 0 5px 0 5px;
    }
  }
`;

const MDBContainer = styled.div`
  display: flex;
  font-size: 11px;
  justify-content: center;
  @media (max-width: 724px) {
    font-size: 9px;
  }
`;

// const Instagram = styled.a`
//   height: 25px;
//   border-radius: 8px;
//   padding: 0;
//   svg {
//     margin: 0;
//     padding: 0;
//   }
//   margin: 15px 0 10px 0;
//   font-size: 25px;
//   color: white;
//   background-image: linear-gradient(
//     45deg,
//     #f09433 0%,
//     #e6683c 25%,
//     #dc2743 50%,
//     #cc2366 75%,
//     #bc1888 100%
//   );
//   background-size: 0%;

//   &:hover {
//     background-size: 100%;
//   }
// `;
