import styled from '@emotion/styled';

import {
  InstagramIcon,
  TwitterIcon,
  FaceBookIcon,
  IMDBIcon,
  WikiPediaIcon,
} from '../assets';
import { MovieExternalIdsResponse, TvExternalIdsResponse } from '../types/tmdb';

interface SocialProps {
  externalIds: MovieExternalIdsResponse | TvExternalIdsResponse;
  type: string;
  name?: string;
  title?: string;
}

Social.defaultProps = {
  name: null,
  title: null,
};

function Social({ externalIds, type, name, title }: SocialProps) {
  if (!externalIds) return null;

  const Instagram = `https://www.instagram.com/${externalIds.instagram_id}/`;
  const IMDB = `https://www.imdb.com/${type}/${externalIds.imdb_id}`;
  const Facebook = `https://www.facebook.com/${externalIds.facebook_id}`;
  const Twitter = `https://twitter.com/${externalIds.twitter_id}`;

  let Wikipedia;

  if (name)
    Wikipedia = `https://en.wikipedia.org/wiki/${name.replace(' ', '_')}`;

  if (title)
    Wikipedia = `https://en.wikipedia.org/wiki/${title.replace(' ', '_')}`;

  return (
    <Socials>
      {externalIds.instagram_id && (
        <Logo>
          <a href={Instagram} target="_blank" rel="noreferrer">
            <InstagramIcon width="25px" height="25px" />
          </a>
        </Logo>
      )}
      {externalIds.twitter_id && (
        <Logo>
          {' '}
          <a href={Twitter} target="_blank" rel="noreferrer">
            <TwitterIcon width="25px" height="25px" />
          </a>
        </Logo>
      )}
      {externalIds.facebook_id && (
        <Logo>
          <a href={Facebook} target="_blank" rel="noreferrer">
            <FaceBookIcon width="25px" height="25px" />
          </a>
        </Logo>
      )}
      {externalIds.imdb_id && (
        <Logo>
          <a href={IMDB} target="_blank" rel="noreferrer">
            <IMDBIcon width="25px" height="25px" />
          </a>
        </Logo>
      )}

      <Wiki>
        <a href={Wikipedia} target="_blank" rel="noreferrer">
          <WikiPediaIcon width="25px" height="25px" />
        </a>
      </Wiki>
    </Socials>
  );
}

export default Social;

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  width: 280px;

  div:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  img {
    width: 30px;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    width: 250px;
    img {
      width: 25px;
    }
  }
  @media (max-width: 724px) {
    justify-content: space-between;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    img {
      width: 25px;
    }
  }
`;

const Wiki = styled.div`
  transform: rotate(0deg);
  &:hover {
    transform: rotate(360deg);
    transition: all 2000ms;
  }
  transition: all 1000ms;
`;

const Logo = styled.div`
  padding: 0 15px;
`;
