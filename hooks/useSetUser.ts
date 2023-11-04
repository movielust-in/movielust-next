// import { useEffect } from 'react';

// import { useDispatch } from '../redux';

// export default function useSetUser() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const getUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('movielust_user');

//         if (!token) return;

//         const userStr = localStorage.getItem('user');

//         if (!userStr) return;

//         const userObj = JSON.parse(userStr);

//         const { setUserLogin } = await import('../redux/reducers/user.reducer');

//         dispatch(setUserLogin(userObj));

//         const { getProfile } = await import('../helpers/user/auth');

//         const user = await getProfile(token);

//         if (userObj.avatar !== user.data.profile) {
//           dispatch(
//             setUserLogin({
//               name: user.data.name,
//               email: user.data.email,
//               avatar: user.data.profile,
//               token,
//             })
//           );
//         }
//       } catch {
//         localStorage.clear();
//       }
//     };
//     getUserProfile();
//   }, [dispatch]);
// }
