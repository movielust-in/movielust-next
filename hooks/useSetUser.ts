import { useEffect, useRef } from "react";

import { useDispatch } from "../redux";

import { getProfile } from "../helpers/user/auth";

import { setUserLogin } from "../redux/reducers/user.reducer";

export default function useSetUser() {
  const dispatch = useDispatch();

  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;

    called.current = true;

    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("movielust_user");

        if (!token) return;

        const userStr = localStorage.getItem("user");

        if (!userStr) return;

        const userObj = JSON.parse(userStr);

        dispatch(setUserLogin(userObj));

        const user = await getProfile(token);

        if (userObj.avatar !== user.data.profile)
          dispatch(
            setUserLogin({
              name: user.data.name,
              email: user.data.email,
              avatar: user.data.profile,
              token,
            })
          );
      } catch {
        localStorage.clear();
      }
    };
    getUserProfile();
  }, [dispatch]);
}
