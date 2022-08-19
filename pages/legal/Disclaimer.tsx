import { useEffect } from "react";
import styled from "@emotion/styled";
import Footer from "../../components/UI/Footer";

function Disclaimer() {
  useEffect(() => {
    document.title = "Disclaimer - Movielust";
  }, []);
  return (
    <>
      <Container>
        <h3>Website Disclaimer</h3>
        <Notice>
          <li>
            <h2>01</h2>
            <p>
              All the posts are made only for educational purposes and any
              linked content is stored only in third-party websites. Since
              freedom of speech is allowed in this fashion, we do not attend in
              any kind of copyright infringing.
            </p>
          </li>
          <li>
            <h2>02</h2>
            <p>
              Movielust does not host any files on servers.All files or contents
              hosted on third party websites. Movielust.in does not accept
              responsibility for contents hosted on third party websites. We
              just index those links which are already available in internet
              This is a promotional website only, all the content provided on
              this site (All materials) is for testing/promotion purposes only.
              All files placed here are for introducing purpose.
            </p>
          </li>
          <li>
            <h2>03</h2>
            <p>
              We highly ENCOURAGE users to BUY the OTT platform subscription for
              watching movies and TV series.Please, buy OTT platform
              subscription contents from author or developer site! If you Do not
              agree to all the terms, please disconnect from this site now
              itself.
            </p>
          </li>
          <li>
            <h2>04</h2>
            <p>
              By remaining at this site, you affirm your understanding and
              compliance of the above disclaimer and absolve this site of any
              responsibility henceforth.Also, you accept that it is not harmful
              to watch and download this data. Moreover,no data is used for
              business or to earn profit.
            </p>
          </li>
          <li>
            <h2>05</h2>
            <p>
              All files found on this site have been collected from various
              sources across the web and are believed to be in the “public
              domain”. You should DELETE IT(data) within 24 hours and make a
              point to buy the OTT platform subscription.
            </p>
          </li>
          <li>
            <h2>06</h2>
            <p>
              If you are the rightful owner of any contents posted here and
              object to them being displayed or If you are one of the
              representatives of copy rights department and you don’t like our
              conditions of store, please mail us regarding your query.
            </p>
          </li>
        </Notice>
      </Container>
      <Footer />
    </>
  );
}

export default Disclaimer;

const Container = styled.div`
  border: 1px solid silver;
  border-radius: 10px;
  color: #bbc3c8;
  display: inline-block;
  font-family: "bariolregular", serif;
  font-size: 18px;
  font-style: italic;
  margin: 90px 20px 20px 18px;
  padding: 10px 12px 8px;

  h3 {
    border-bottom: 2px solid whitesmoke;
    color: #ffffff;
    font-size: 34px;
    font-weight: 500;
    line-height: 58px;
    margin: 0 0 58px;
    padding: 10px;
  }
  @media (max-width: 724px) {
    margin: 0 7px 20px 7px;
    h3 {
      color: #ffffff;
      font-size: 25px;
      font-weight: 500;
      border-bottom: 2px solid whitesmoke;
      margin: 0 0 58px 0;
    }
  }
`;

const Notice = styled.ul`
  color: white;
  list-style: none;
  margin: 50px auto;
  padding: 0;
  text-align: center;

  li {
    background: #262a2b;
    border: 1px solid #252727;
    border-radius: 10px;
    display: inline-block;
    font-family: "bariolregular", sans-serif;
    margin: 20px;
    max-width: 90%;
    min-width: 200px;
    padding: 40px 50px 30px;
    position: relative;
    text-align: left;
    vertical-align: top;
    width: 90%;
  }
  li h2 {
    font-size: 90px;
    margin: 0;
    opacity: 0.2;
    position: absolute;
    right: 10px;
    top: 50px;
    transition: all 0.3s ease-in-out;
  }

  li p {
    color: whitesmoke;
    font-size: 16px;
    line-height: 25px;
    margin-top: 5px;
    text-align: justify;
  }

  li:hover h2 {
    opacity: 0.6;
    top: 0px;
  }

  li:before {
    background: #fff;
    border-radius: 10px;
    bottom: 8px;
    content: "";
    left: -3px;
    position: absolute;
    right: -3px;
    top: 9px;
    transform: skew(2deg, 2deg);
    z-index: -1;
  }
  li:after {
    background: rgba(255, 255, 255, 0.02);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 40%;
  }

  li:nth-of-type(1):before {
    background: linear-gradient(to right, #ffafbd, #c9ffbf);
    background: #c9ffbf;
  }
  li:nth-of-type(2):before {
    background: linear-gradient(to right, #ff9472, #f2709c);
    background: #f2709c;
  }
  li:nth-of-type(3):before {
    background: linear-gradient(to right, #ffc500, #c21500);
    background: #c21500;
  }
  li:nth-of-type(4):before {
    background: linear-gradient(to right, #0abfbc, #fc354c);
    background: #fc354c;
  }
  li:nth-of-type(5):before {
    background-color: #2b1331;
    background-image: linear-gradient(315deg, #2b1331 0%, #b9abcf 74%);
  }
  li:nth-of-type(6):before {
    background: linear-gradient(315deg, #9e8fb2 0%, #a7acd9 74%);
    background: #9e8fb2;
  }
  li:nth-of-type(7):before {
    background: linear-gradient(to right, #9e8fb2, #a7acd9);
    background-color: #44b09e;
    background-image: linear-gradient(315deg, #44b09e 0%, #e0d2c7 74%);
  }

  @media (max-width: 724px) {
    li:before {
      content: "";
      position: absolute;
      top: -2px;
      left: -3px;
      right: -2px;
      bottom: -2px;
      z-index: -1;
      background: #fff;
      transform: skew(2deg, 2deg);
    }
    li p {
      font-size: 13px;
      color: whitesmoke;
      text-align: center;
    }
  }
`;

// will be used later if needed

/* li h3 {
    font-size: 20px;
    color: #b7b7b7;
    margin-bottom: 5px;
  } */
/* li button {
    background: transparent;
    border: 1px solid #b7b7b7;
    padding: 10px 20px;
    color: #b7b7b7;
    border-radius: 3px;
    position: relative;
    transition: all 0.3s ease-in-out;
    transform: translateY(-40px);
    opacity: 0;
    cursor: pointer;
    overflow: hidden;
  } */
/* li button:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 120%;
    background: #b7b7b7;
    top: 0;
    opacity: 0;
    left: -140px;
    border-radius: 0 20px 20px 0;
    z-index: -1;
    transition: all 0.3s ease-in-out;
  } */
/* li:hover button {
    transform: translateY(5px);
    opacity: 1;
  }
  li button:hover {
    color: #262a2b;
  }
  li button:hover:before {
    left: 0;
    opacity: 1;
  } */
