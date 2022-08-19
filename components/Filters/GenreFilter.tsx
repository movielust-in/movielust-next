import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { useDispatch, useSelector } from '../../redux';
import { MOVIE_GENRES, TV_GENRES } from '../../config';
import {
    resetMovies,
    toggleMovieGenreId,
    setMovieGenres,
} from '../../redux/reducers/movie.reducer';
import {
    resetSeries,
    toggleSeriesGenreId,
    setSeriesGenres,
} from '../../redux/reducers/series.reducer';
import { ScrollbarStyle } from '../../styles';

interface GenreFilterProps {
    type: string;
}

function GenreFilter({ type }: GenreFilterProps) {
    const [genreDropDownOpen, setGenreDropDownOpen] = useState(false);
    const dispatch = useDispatch();

    const genres = type === 'movie' ? MOVIE_GENRES : TV_GENRES;

    const filters = useSelector((state) =>
        type === 'movie' ? state.movie.filters : state.series.filters
    );

    const reset = () => dispatch(type === 'movie' ? resetMovies() : resetSeries());

    const addOrRemoveGenreIdFromFilter = (id: number) => {
        if (type === 'movie') {
            reset();
            dispatch(toggleMovieGenreId(id));
        } else {
            reset();
            dispatch(toggleSeriesGenreId(id));
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search).get('genre');

        if (urlParams) {
            let urlGenres = urlParams
                .split(',')
                .map((id) => parseInt(id, 10))
                .filter((id) => !Number.isNaN(id) && genres.find((genre) => genre.id === id));

            if (urlGenres.length) {
                urlGenres = [...new Set(urlGenres)];
                dispatch(type === 'movie' ? setMovieGenres(urlGenres) : setSeriesGenres(urlGenres));
            }
        }
    }, [genres, type, dispatch]);

    return (
        <Container>
            <Button
                onClick={() => {
                    setGenreDropDownOpen((state) => !state);
                }}
            >
                Genres <FaAngleDoubleDown />
            </Button>

            <DropList open={genreDropDownOpen}>
                {genres.map((genre) => (
                    <Item
                        role="presentation"
                        key={genre.id}
                        onClick={() => {
                            addOrRemoveGenreIdFromFilter(genre.id!!);
                            setGenreDropDownOpen(false);
                        }}
                        style={{
                            backgroundColor: filters.genres.includes(genre.id!) ? 'silver' : '',
                            borderRadius: filters.genres.includes(genre.id!) ? '5px' : '',
                            color: filters.genres.includes(genre.id!) ? 'black' : '',
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
    transition: opacity 200ms;
    max-height: 500px;
    z-index: 5;
    li {
        display: ${(props) => (props.open ? 'flex' : 'none')};
    }
    &::-webkit-scrollbar {
        /* display: none; */
    }

    ${ScrollbarStyle}

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
    transition: all 250ms;
    user-select: none;

    &:hover {
        background-color: gray;
    }
    @media (max-width: 724px) {
        padding: 1px 10px 0 10px;
    }
`;
