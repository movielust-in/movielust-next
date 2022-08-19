import { useEffect } from "react";
import styled from "@emotion/styled";
import Footer from "../../components/UI/Footer";

function Aboutus() {
  useEffect(() => {
    document.title = "About us - Movielust";
  }, []);
  return (
    <>
      <Container>
        <h3>About Us</h3>
        <Notice>
          <li>
            <p>
              This website is result of project for educational research and is
              not for commercial purposes.We are building Movie Recommendation
              Webapp for user to find entertainment content relavent to their
              taste so user can get best recommendation.
            </p>
          </li>
          <li>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <a href="https://www.themoviedb.org/">
                <img
                  width="100"
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="TMDB Logo"
                />
              </a>
              <a href="https://en.wikipedia.org/wiki/YIFY">
                <img
                  width="40"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Logo-YTS.svg/220px-Logo-YTS.svg.png"
                  alt="YTS logo"
                />
              </a>
            </div>

            <p>
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.We do not claim the ownership of data and images on this
              website. All the data and images are sourced from TMDB and YTS.
            </p>
          </li>
          <li>
            <p>
              Reach us at
              <Mail href="mailto:support@movielust.store">
                <b> support@movielust.store</b>
              </Mail>
            </p>
          </li>
        </Notice>
      </Container>
      <Footer />
    </>
  );
}

export default Aboutus;

const Container = styled.div`
  border: 1px solid silver;
  border-radius: 10px;
  color: #bbc3c8;
  display: inline-block;
  font-family: "bariolregular", serif;
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
    a {
      color: white;
    }
  }
  li p {
    color: whitesmoke;
    font-size: 16px;
    line-height: 25px;
    margin-top: 5px;
    text-align: justify;
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

const Mail = styled.a`
  cursor: pointer;
`;
