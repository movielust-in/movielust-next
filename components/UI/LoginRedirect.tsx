import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { useLockBodyScroll } from '../../hooks';

interface LoginRedirectProps {
  afterLoginRedirectTo: string;
}

function LoginRedirect({ afterLoginRedirectTo = '/' }: LoginRedirectProps) {
  const router = useRouter();
  useLockBodyScroll();
  const toLogin = () =>
    router.push(`/signin?redirectto=${afterLoginRedirectTo}`);

  return (
    <LoginContainer>
      <Content>
        <LoginContain>
          <CTALogoOne
            src="https://ik.imagekit.io/movielust/logo_uIeABdFs3.webp"
            alt="Logo"
          />
          <Login onClick={toLogin}>LOGIN</Login>
          <Description>
            Download free movies and TV Shows with Movielust which brings you to
            amazing download experience you ever had :
          </Description>
        </LoginContain>
        <BgImage />
      </Content>
    </LoginContainer>
  );
}

export default LoginRedirect;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  @media (max-width: 724px) {
    height: 85vh;
  }
`;

const Content = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 80px 40px;
  position: relative;
  width: 100%;
`;

const LoginContain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;

  width: 100%;
`;

const BgImage = styled.div`
  background-image: url('/images/login-background.webp');
  background-position: top;
  background-repeat: no-repeat;
  background-size: fill;
  height: 100vh;
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

const CTALogoOne = styled.img`
  display: block;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  opacity: 0.8;
  width: 100%;
  &:hover {
    opacity: 1;
    transition: opacity 1s ease;
  }
  @media (max-width: 724px) {
    max-width: 200px;
  }
`;

const Login = styled.button`
  background-color: #0063e5;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #f9f9f9;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 6px;
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 0;
  width: 80%;
  &:hover {
    background-color: rgba(21, 53, 235);
    transition: background-color 0.8s ease;
  }
  @media (max-width: 724px) {
    padding: 13px 0;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  letter-spacing: 1.5px;
  line-height: 1.5;
  margin-left: auto;
  /* margin: 0 0 24px; */
  margin-right: auto;
  width: 80%;
  @media (max-width: 724px) {
    letter-spacing: 1.3px;
  }
`;

// const Bottom = styled.div`
//   margin-bottom: 20px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   vertical-align: bottom;
//   margin-left: auto;
//   margin-right: auto;
//   width: 80%;
//   img {
//     max-width: 200px;
//   }
//   @media (max-width: 724px) {
//     img {
//       max-width: 80px;
//     }
//   }
// `;
