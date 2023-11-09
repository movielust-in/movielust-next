import { useCallback, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { MOVIE_GENRES, TV_GENRES } from '../../../../lib/tmdb/constants';

interface GenreFilterProps {
  type: string;
}

function GenreFilter({ type }: GenreFilterProps) {
  const [genreDropDownOpen, setGenreDropDownOpen] = useState(false);

  const GENRES = type === 'movie' ? MOVIE_GENRES : TV_GENRES;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedGenres = searchParams
    ?.get('genres')
    ?.split(',')
    .map((n) => parseInt(n, 10));

  const addOrRemoveGenreIdFromFilter = useCallback(
    (id: number) => {
      if (!searchParams) return;

      const tempGenres = selectedGenres?.slice() || [];
      const index = selectedGenres?.indexOf(id);

      if (index !== undefined && index > -1) tempGenres?.splice(index, 1);
      else tempGenres.push(id);

      const params = new URLSearchParams(searchParams);
      if (tempGenres.length) {
        params.set('genres', tempGenres.join(','));
      } else {
        params.delete('genres');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, selectedGenres]
  );

  return (
    <Container>
      <Button onClick={() => setGenreDropDownOpen((state) => !state)}>
        Genres <FaAngleDoubleDown />
      </Button>

      <DropList open={genreDropDownOpen}>
        {GENRES.map((genre) => (
          <Item
            role="presentation"
            key={genre.id}
            onClick={() => {
              addOrRemoveGenreIdFromFilter(genre.id!!);
              setGenreDropDownOpen(false);
            }}
            style={{
              backgroundColor: selectedGenres?.includes(genre.id!)
                ? 'silver'
                : '',
              borderRadius: selectedGenres?.includes(genre.id!) ? '5px' : '',
              color: selectedGenres?.includes(genre.id!) ? 'black' : '',
            }}
          >
            <div>{genre.name}</div>
          </Item>
        ))}
      </DropList>
    </Container>
  );
}

export default GenreFilter;

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 1px solid silver;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  margin-right: 7rem;
  padding: 7px 12px 7px 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 724px) {
    margin-top: 10px;
    margin-right: 12px;
    font-size: 1rem;
    padding: 7px 10px 7px 10px;
    text-align: center;
  }

  @media (min-width: 724px) {
    &:hover + ul,
    & + ul:hover {
      display: block;
      opacity: 1;
      min-height: 100px;
      padding: 5px;
      text-align: center;
      li {
        display: block;
      }
    }
  }
`;

const DropList = styled.ul<{ open: boolean }>`
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 1px solid silver;
  border-radius: 8px;
  display: none;
  list-style: none;
  min-height: ${(props) => (props.open ? '150px' : 0)};
  min-width: 100px;
  opacity: ${(props) => (props.open ? 0.95 : 0)};
  overflow-y: scroll;
  position: absolute;
  text-align: left;
  transform: translatey(-15px) translateX(-53px);
  transition: all 200ms ease 0s;
  max-height: 500px;
  z-index: 5;
  li {
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }
  &::-webkit-scrollbar {
    /* display: none; */
  }

  @media (max-width: 724px) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
    display: block;
    max-height: 350px;
    padding: 16px;
    transform: translatey(-15px);
  }
`;
const Item = styled.li`
  border-bottom: 1px solid transparent;
  cursor: pointer;
  margin: 10px 0;
  padding: 2px 31px;
  user-select: none;
  transition: all 500ms ease 0s;
  &:hover {
    background-color: gray;
  }
  @media (max-width: 724px) {
    padding: 1px 10px 0 10px;
  }
`;
