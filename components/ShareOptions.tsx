import styled from '@emotion/styled';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface ShareOptionsProps {
  title: string;
  type: string;
  show: boolean;
}

function ShareOptions({ title, type, show }: ShareOptionsProps) {
  const SocialShare = `Hey! Watch and Download this amazing ${
    type === 'movie' ? 'movie' : 'series'
  } *${title}* `;

  return show ? (
    <Buttons>
      <WhatsappShareButton
        title={SocialShare}
        separator=" "
        url={window.location.href}
      >
        <Icons>
          <WhatsappIcon size="2rem" round />
        </Icons>
      </WhatsappShareButton>

      <FacebookShareButton quote={SocialShare} url={window.location.href}>
        <Icons>
          <FacebookIcon size="2rem" round />
        </Icons>
      </FacebookShareButton>

      <TwitterShareButton title={SocialShare} url={window.location.href}>
        <Icons>
          <TwitterIcon size="2rem" round />
        </Icons>
      </TwitterShareButton>
    </Buttons>
  ) : null;
}

export default ShareOptions;

const Buttons = styled.div`
  /* backdrop-filter: blur(35px); */
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  opacity: 1;
  overflow: hidden;
  padding: 3px 5px 0 5px;
  transition: opacity 1s;
  width: 160px;
`;

const HoverMessage = styled.div`
  background-color: black;
  border-radius: 10px;
  color: white;
  display: none;
  float: right;
  font-size: 15px;
  margin-top: -50px;
  padding: 10px;
  position: absolute;
  z-index: 1001;
`;

const Icons = styled.div`
  padding: 0 25px 0 0;
  &:hover {
    ${HoverMessage} {
      display: flex;
    }
  }
`;
