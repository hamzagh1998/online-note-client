import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { setUserData } from "../features/auth/slices/auth.slice";

import { useAuthQuery } from "../features/auth/slices/api/auth.service";

import { auth } from "../libs/firebase";

import { MainRouter } from "./main.router";
import { AuthRouter } from "./auth.router";
import { NotFoundPage } from "../features/auth/pages/not-found.page";

import { AUTH_ROUTES, MAIN_REOTES } from "./_routes-names";

import { SpinnerIndicatorsComponent } from "../common/components/activities-indicators/spinner-indicators.component";
import { AuthResponse } from "../features/auth/pages/types";

export function RoutesNavigator() {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { refetch } = useAuthQuery({});

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  let prefersMode: string;
  const theme = localStorage.getItem("theme");
  if (theme) {
    prefersMode =
      theme === "dark"
        ? "dark-theme bg-skin-fill-primary text-skin-base"
        : "light-theme bg-skin-fill-primary text-skin-base";
  } else {
    const isItDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    prefersMode = isItDarkMode
      ? "dark-theme bg-skin-fill-primary text-skin-base"
      : "light-theme bg-skin-fill-primary text-skin-base";
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const fbToken = await user.getIdToken();
        dispatch(setUserData({ fbToken, userData: null }));
        const res = await refetch();
        if (!res.data.error) {
          dispatch(
            setUserData({ fbToken, userData: res.data.detail as AuthResponse })
          );
        }
        setIsLoggedIn(true);
        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);

  const currentPath = location.pathname;

  const authDomain = "/auth";
  const mainDomain = "/main";

  const authRoutes = [
    authDomain + AUTH_ROUTES.LOGIN,
    authDomain + AUTH_ROUTES.REGISTER,
    authDomain + AUTH_ROUTES.RESET_PWD,
    authDomain + AUTH_ROUTES.NEW_PWD,
  ];
  const mainRoutes = [
    mainDomain + MAIN_REOTES.CONFIRM_EMAIL,
    mainDomain + MAIN_REOTES.NOTES,
    mainDomain + MAIN_REOTES.NOTE_DETAIL,
    mainDomain + MAIN_REOTES.NOTE_CRUD,
  ];

  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);

  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode");

  if (mode && oobCode)
    localStorage.setItem("params", JSON.stringify({ mode, oobCode }));

  useEffect(() => {
    if (!isLoggedIn && !authRoutes.includes(currentPath))
      navigate(authRoutes[0]);
    else if (isLoggedIn) {
      if (!auth.currentUser?.emailVerified) {
        navigate(mainRoutes[0]);
      } else if (!mainRoutes.includes(currentPath)) {
        navigate(mainRoutes[1]);
      }
    }
  }, [isLoggedIn, mode]);

  return (
    <div className={prefersMode}>
      <Routes>
        {isLoading ? (
          <Route path="/*" element={<SpinnerIndicatorsComponent />} />
        ) : isLoggedIn ? (
          <Route path="/main/*" element={<MainRouter />} />
        ) : (
          <Route path="/auth/*" element={<AuthRouter />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
