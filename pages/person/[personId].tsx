import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';

import {
  fetchPerson,
  fetchPersonMovies,
  fetchPopular,
  fetchPersonTvCredits,
} from '../../helpers/tmdb/person';

import MovieCarousel from '../../components/Carousels/MovieCarousel';

import CastCarousel from '../../components/Carousels/CastCarousel';

import Social from '../../components/Social';

import { FULL_MONTHS } from '../../config';

import PeopleMovieCarousel from '../../components/Carousels/PeopleMovieCarousel';

import ImageCrousel from '../../components/Carousels/ImageCrousel';

import {
  Person,
  PersonExternalIdsResponse,
  PersonImagesResponse,
  TVCreditCast,
} from '../../types/tmdb';
import Meta from '../../components/Meta';

interface PeopleDeatail {
  person: Person & {
    images: PersonImagesResponse;
    external_ids: PersonExternalIdsResponse;
  };
}

function PeopleDetail({ person }: PeopleDeatail) {
  const router = useRouter();

  const castid = router.query.personId as string;

  const [castMovies, setCastMovies] = useState<any>(null);
  const [fullBio, toggleFullBio] = useState(
    person.biography?.length && person.biography?.length < 100
  );
  const [popularPeople, setPopularPeople] = useState([]);
  const [tvCreditCast, setTvCreditCast] = useState<TVCreditCast>([]);
  const domColor: any[] = [];

  useEffect(() => {
    fetchPersonMovies(castid).then((movies: any) => {
      if (!movies) {
        setCastMovies(null);
        return;
      }
      setCastMovies(movies);
    });

    fetchPersonTvCredits(castid).then((show) => {
      if (show && show.cast) setTvCreditCast(show.cast);
    });

    fetchPopular().then((popular: any) => {
      setPopularPeople(popular.results);
    });
  }, [castid]);

  return (
    <Container>
      <Meta
        title={`${person.name}`}
        description={person.biography?.split(' ').slice(0, 160).join(' ')}
        url={`https://movielust.in/person/${person.id}`}
        image={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
        lgImage={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
      />
      <Background>
        <Image
          alt="movieposter"
          crossOrigin="anonymous"
          layout="fill"
          src="/images/default_background.webp"
        />
      </Background>
      <UpperContainer>
        {/* Profile Poster */}
        <Profile>
          <Image
            // ref={backgroundRef as MutableRefObject<HTMLImageElement>}
            onLoad={() => {
              // setDomColor(colorThief.getColor(backgroundRef.current));
            }}
            width={300}
            height={500}
            crossOrigin="anonymous"
            alt={person.name}
            src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          />
        </Profile>
        {/* Images for PC View */}
        {person.images &&
        person.images.profiles &&
        person.images.profiles.length ? (
          <Images>
            <ImageCrousel
              images={person.images.profiles}
              type="cast"
              dom={domColor}
              height={300}
            />
          </Images>
        ) : null}
      </UpperContainer>
      <LowerContainer>
        <Info dom={domColor}>
          <Name>
            <h2>{person.name}</h2>
          </Name>
          <Information>
            {person.birthday && (
              <h3>
                Born {person.birthday}{' '}
                {person.place_of_birth && `in ${person.place_of_birth}`}
              </h3>
            )}
            <br />
            {person.deathday && <h3>Died :{person.deathday}</h3>}
          </Information>
          <Socials
            externalIds={person.external_ids}
            type="name"
            name={person.name}
          />
          {person.biography ? (
            <Bio>
              {fullBio
                ? person.biography
                : person.biography!.split(' ', 100).join(' ')}
              {!fullBio && (
                <ShowFullBio onClick={() => toggleFullBio(true)}>
                  . . .read more
                </ShowFullBio>
              )}
            </Bio>
          ) : null}
        </Info>

        {castMovies && castMovies.length > 0 ? (
          <CastWorks dom={domColor}>
            <MovieCarousel
              movies={castMovies}
              type="movie"
              title="Movies"
              watchall={person.id}
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

        {person.images &&
        person.images.profiles &&
        person.images.profiles.length ? (
          <MobileImages>
            <ImageCrousel
              images={person.images.profiles}
              type="cast"
              title="Images"
              dom={domColor}
              height={300}
            />
          </MobileImages>
        ) : null}

        {popularPeople && popularPeople.length ? (
          <CastCarousel cast={popularPeople} title="Popular" />
        ) : null}
      </LowerContainer>
    </Container>
  );
}

export default PeopleDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=604800, stale-while-revalidate=86400'
  );

  const { personId } = context.query as { personId: string };

  let { data } = await fetchPerson(personId);

  if (data.birthday) {
    const bDate = new Date(data.birthday);
    data = {
      ...data,
      birthday: `${
        FULL_MONTHS[bDate.getMonth()]
      }, ${bDate.getDate()} ${bDate.getFullYear()}`,
    };
  }

  if (data.deathday) {
    const dDate = new Date(data.deathday);
    data = {
      ...data,
      deathday: `${
        FULL_MONTHS[dDate.getMonth()]
      }, ${dDate.getDate()} ${dDate.getFullYear()}`,
    };
  }

  if (data.place_of_birth) {
    data = {
      ...data,
      place_of_birth: data.place_of_birth.split(',').join(', '),
    };
  }

  return { props: { person: data } };
};

const Container = styled.div`
  font-family: 'bariolregular', sans-serif;
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
      dom.length > 0 ? `rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2)` : ''};
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
      dom.length > 0 ? `rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2)` : ''};
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
