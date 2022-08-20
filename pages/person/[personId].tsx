import { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "@emotion/styled";
// @ts-ignore
// import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs";

import {
  fetchPerson,
  fetchPersonMovies,
  fetchPopular,
  fetchPersonTvCredits,
  fetchPeopleExternalIds,
  fetchPersonImage,
} from "../../helpers/tmdb/person";

// import { Loading, Movie as MovieCarousel, Cast, Social } from '../components';

import Loading from "../../components/UI/Loading";

import MovieCarousel from "../../components/Carousels/MovieCarousel";

import CastCarousel from "../../components/Carousels/CastCarousel";

import Social from "../../components/Social";

import { FULL_MONTHS } from "../../config";

import PeopleMovieCarousel from "../../components/Carousels/PeopleMovieCarousel";

import ImageCrousel from "../../components/Carousels/ImageCrousel";

import { DefaultBackground } from "../../assets";
import {
  PersonExternalIdsResponse,
  Profile as ProfileType,
  TVCreditCast,
} from "../../types/tmdb";
import { useRouter } from "next/router";
import Image from "next/image";

// const colorThief = new ColorThief();

function PeopleDeatail() {
  const backgroundRef = useRef<HTMLImageElement>();
  const router = useRouter();

  const castid = router.query.personId as string;

  const [bday, setBday] = useState<string>();
  const [personImages, setImages] = useState<ProfileType[]>();
  const [profile, setProfile] = useState<string | null>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [dday, setDday] = useState<string>();
  const [id, setId] = useState<number>();
  const [bplace, setBplace] = useState<string | null>();
  const [castMovies, setCastMovies] = useState<any>(null);
  const [externalIds, setExternalids] = useState<PersonExternalIdsResponse>();
  const [fullBio, toggleFullBio] = useState(true);
  const [popularPeople, setPopularPeople] = useState([]);
  const [tvCreditCast, setTvCreditCast] = useState<TVCreditCast>([]);
  const [domColor, setDomColor] = useState([]);

  const setBirth = (birthday: string | null | undefined) => {
    if (!birthday) {
      setBday("");
      return;
    }
    const bDate = new Date(birthday);
    setBday(
      `${
        FULL_MONTHS[bDate.getMonth()]
      }, ${bDate.getDate()} ${bDate.getFullYear()}`
    );
  };

  const setdied = (dead: string | null | undefined) => {
    if (!dead) {
      setDday("");
      return;
    }
    const diedOn = new Date(dead);
    setDday(
      `${
        FULL_MONTHS[diedOn.getMonth()]
      }, ${diedOn.getDate()} ${diedOn.getFullYear()}`
    );
  };

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);

    if (mounted.current) {
      fetchPerson(castid).then((details) => {
        const detail = details.data;
        document.title = `${detail.name} - Movielust`;
        setId(detail.id);
        setName(detail.name);
        setProfile(detail.profile_path);
        setBio(detail.biography);
        if (detail && detail.biography && detail.biography.length > 100)
          toggleFullBio(false);
        setBirth(detail.birthday);
        setdied(detail.deathday);
        setBplace(detail.place_of_birth);
      });

      fetchPersonMovies(castid).then((movies: any) => {
        if (!movies) {
          setCastMovies(null);
          return;
        }
        setCastMovies(movies);
      });
      fetchPersonImage(castid).then((images) => {
        setImages(images.profiles);
      });

      fetchPersonTvCredits(castid).then((show) => {
        if (show && show.cast) setTvCreditCast(show.cast);
      });

      fetchPeopleExternalIds(castid).then((ids) => {
        setExternalids(ids);
      });

      fetchPersonImage(castid).then((images) => {
        setImages(images.profiles);
      });

      fetchPopular().then((popular: any) => {
        setPopularPeople(popular.results);
      });
    }
    setLoading(false);
  }, [castid]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Background>
            <Image
              alt="movieposter"
              crossOrigin="anonymous"
              src={DefaultBackground}
            />
          </Background>
          <UpperContainer>
            {/* Profile Poster */}
            <Profile>
              <img
                ref={backgroundRef as MutableRefObject<HTMLImageElement>}
                onLoad={() => {
                  // setDomColor(colorThief.getColor(backgroundRef.current));
                }}
                crossOrigin="anonymous"
                alt={name}
                src={`https://image.tmdb.org/t/p/w500/${profile}`}
              />
            </Profile>
            {/* Images for PC View */}
            {personImages && (
              <Images>
                <ImageCrousel
                  images={personImages}
                  type="cast"
                  dom={domColor}
                />
              </Images>
            )}
          </UpperContainer>
          <LowerContainer>
            <Info dom={domColor}>
              <Name>
                <h2>{name}</h2>
              </Name>
              <Information>
                {bday && (
                  <h3>
                    Born {bday} {bplace && `in ${bplace.split(",").join(", ")}`}
                  </h3>
                )}
                <br />
                {dday && <h3>Died :{dday}</h3>}
              </Information>
              <Socials externalIds={externalIds} type="name/" name={name} />
              <Bio>
                {fullBio ? bio : bio!.split(" ", 100).join(" ")}
                {!fullBio && (
                  <ShowFullBio onClick={() => toggleFullBio(true)}>
                    . . .read more
                  </ShowFullBio>
                )}
              </Bio>
            </Info>

            {castMovies && castMovies.length > 0 ? (
              <CastWorks dom={domColor}>
                <MovieCarousel
                  movies={castMovies}
                  type="movie"
                  title="Movies"
                  watchall={id}
                />
              </CastWorks>
            ) : null}

            {tvCreditCast.length > 0 ? (
              <CastWorks dom={domColor}>
                <PeopleMovieCarousel
                  movies={tvCreditCast}
                  type="tv"
                  title="TV Series"
                />
              </CastWorks>
            ) : null}

            <MobileImages>
              {personImages && (
                <ImageCrousel
                  images={personImages}
                  type="cast"
                  title="Images"
                  dom={domColor}
                />
              )}
            </MobileImages>

            {popularPeople && (
              <CastCarousel
                cast={popularPeople}
                title="Popular"
                dom={domColor}
              />
            )}
          </LowerContainer>
        </>
      )}
    </Container>
  );
}

export default PeopleDeatail;

const Container = styled.div`
  font-family: "bariolregular", sans-serif;
  min-height: calc(100vh - 73px);
  overflow: hidden;
  position: relative;
  @media (max-width: 724px) {
    margin-top: -40px;
  }
`;

const Background = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  opacity: 0.1;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const UpperContainer = styled.div`
  align-items: center;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  @media (max-width: 870px) {
    margin: 0;
  }
  @media (max-width: 724px) {
    flex-direction: row;
    margin: 0;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
  margin: 70px 10px 0 50px;
  min-height: 350px;
  min-width: 250px;
  object-fit: cover;
  width: 275px;
  img {
    border-radius: 20px;
    height: 100%;
    width: 100%;
  }

  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin: 10px 10px 0 50px;
    min-height: 250px;
    min-width: 150px;
    height: 300px;
    width: 200px;
  }
  @media (max-width: 45.25em) {
    margin: 50px auto 0 auto;
  }
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0 0 20px;

  text-align: center;

  width: 72vw;
  @media (max-width: 724px) {
    display: none;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    width: 60%;
  }
`;
const MobileImages = styled.div`
  display: none;
  @media (max-width: 724px) {
    display: contents;
  }
`;

const Socials = styled(Social as any)<any>`
  margin: 0;
  @media (max-width: 724px) {
    margin: 0 0 0 50px;
  }
`;

const Name = styled.div`
  h2 {
    display: inline-block;
    font-size: 40px;
    margin: 0;
  }

  @media (max-width: 724px) {
    text-align: center;
    margin: 10px 0 0 0;
    h2 {
      margin: 0;

      font-size: 25px;
    }
  }
`;

const Information = styled.div`
  h3 {
    display: inline-block;
    font-size: 15px;
    margin-top: 10px;
  }

  @media (max-width: 724px) {
    margin: 10px 0 20px 0;
    text-align: center;
    h3 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const LowerContainer = styled.div`
  margin: 10px 70px 50px 50px;
  @media (max-width: 724px) {
    padding: calc(3.5vw + 5px);
    margin: 0;
  }
`;

const Info = styled.div<{ dom: any }>`
  border-radius: 12px;
  padding: 5px 10px;

  @media (min-width: 724px) {
    background-color: ${({ dom }) =>
      dom.length > 0 ? `rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2)` : ""};
  }
`;
const Bio = styled.div`
  color: rgb(249, 249, 249);
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  line-height: 2;
  margin-top: 10px;
  max-width: 100%;
  text-align: justify;
  text-justify: inter-word;
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    font-size: 18px;
  }

  @media (max-width: 724px) {
    margin-top: 25px;
    font-size: 15px;
  }
`;

const CastWorks = styled.div<{ dom: any }>`
  border-radius: 15px;
  box-shadow: 5px 3px 30px black;
  margin: 10px 0 5px 0;
  overflow: hidden;
  padding: 10px;
  position: relative;

  @media (min-width: 724px) {
    background-color: ${({ dom }) =>
      dom.length > 0 ? `rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2)` : ""};
  }
  @media (max-width: 724px) {
    padding: 0 5px 5px 5px;
    margin: 5px 0 15px 0;
  }
`;
const ShowFullBio = styled.button`
  background-color: transparent;
  border: none;
  color: lightblue;
  cursor: pointer;
  display: inline;
`;
