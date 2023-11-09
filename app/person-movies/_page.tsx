// 'use client';

// import { useEffect, useState } from 'react';
// import styled from '@emotion/styled';
// import { useParams } from 'next/navigation';

// import { useDispatch, useSelector } from '../../redux';
// import Loading from '../../components/UI/Loading';
// import Scroller from '../../components/UI/Scroller';
// import { setCurrentPage } from '../../redux/reducers/nav.reducer';
// import { fetchPerson } from '../../helpers/tmdb/person';
// import { fetchCastMovies } from '../../helpers/tmdb/movies';
// import {
//   setCastMovies,
//   setCastMoviesTotal,
//   resetMovies,
// } from '../../redux/reducers/movie.reducer';

// function PeopleMovies() {
//   const params = useParams()
//   const dispatch = useDispatch();

//   const id = params?.personID as string;

//   const [isLoading, setIsLoading] = useState(true);

//   const [name, setName] = useState<string>();

//   const total = useSelector((state) => state.movie.castmovies.total);

//   const storeMovies = useSelector((state) => state.movie.castmovies.movies);

//   useEffect(() => {
//     dispatch(setCurrentPage('peoplemovies'));
//   }, [dispatch]);

//   useEffect(() => {
//     const reset = () => dispatch(resetMovies());

//     const fetchMovies = () => {
//       fetchCastMovies(id).then((movies) => {
//         dispatch(setCastMovies(movies.results));
//         dispatch(
//           setCastMoviesTotal({
//             results: movies.total_results,
//             pages: movies.total_pages,
//           })
//         );
//       });
//     };
//     reset();

//     setIsLoading(true);
//     fetchMovies();

//     fetchPerson(id).then((details) => {
//       const detail = details.data;
//       document.title = `${detail.name} - Movielust`;
//       setName(detail.name);
//     });
//     setIsLoading(false);
//   }, [dispatch, id]);

//   return isLoading ? (
//     <Loading />
//   ) : (
//     <Container>
//       <Title>Movies Starring {name}</Title>
//       <Scroller movies={storeMovies} total={total} type="movie" />
//     </Container>
//   );
// }

// export default PeopleMovies;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin-top: 70px;
//   padding: 0 1px;
//   text-align: center;
//   @media (max-width: 724px) {
//     padding: 0 10px;
//     margin-top: 0;
//   }
// `;

// const Title = styled.div`
//   font-family: 'Bariol', sans-serif;
//   font-size: 30px;
//   font-weight: 600;
//   margin: 40px;
//   @media (max-width: 724px) {
//     font-size: 20px;
//     margin: 30px;
//   }
// `;
