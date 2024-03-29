import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { setUserData } from "../features/auth/slices/auth.slice";
import { setUserProfile } from "../features/content-management/slices/profile.slice";

import { useLazyAuthQuery } from "../features/auth/slices/api/auth.service";
import { useLazyInfoQuery } from "../features/content-management/slices/api/profile/profile.service";

import { auth } from "../libs/firebase";

import { MainRouter } from "./main.router";
import { AuthRouter } from "./auth.router";
import { NotFoundPage } from "../features/auth/pages/not-found.page";

import { RootState } from "../redux/store";

import { AUTH_ROUTES, MAIN_ROUTES } from "./_routes-paths";

import { SpinnerIndicatorsComponent } from "../common/components/activities-indicators/spinner-indicators.component";
import { AuthResponse } from "../features/auth/pages/types";

export function RoutesNavigator() {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authData = useSelector((store: RootState) => store.auth);
  const profile = useSelector((store: RootState) => store.profile);

  const { preferdTheme } = profile;
  const { userData } = authData;

  const [getUserData] = useLazyAuthQuery({});
  const [getProfileData] = useLazyInfoQuery({});

  const [preferdUserTheme, setPreferdUserTheme] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme") as string);
    if (theme)
      dispatch(
        setUserProfile({ ...profile, preferdTheme: theme ? theme : "default" })
      );
    // check user auth
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const fbToken = await user.getIdToken();
        dispatch(setUserData({ fbToken, userData: null }));
        const res = await getUserData({});
        if (!res.data.error) {
          dispatch(
            setUserData({ fbToken, userData: res.data.detail as AuthResponse })
          );
        }
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!userData) return;
    (async () => {
      const res = await getProfileData({});

      if (!res.data.error) {
        const data = res.data.detail;
        dispatch(
          setUserProfile({
            ...data,
            preferdTheme,
          })
        );
      }
    })();
  }, [userData]);

  useEffect(() => {
    if (preferdTheme === "dark") {
      setPreferdUserTheme("dark-theme bg-skin-fill-primary text-skin-base");
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else if (preferdTheme === "light") {
      setPreferdUserTheme("light-theme bg-skin-fill-primary text-skin-base");
      localStorage.setItem("theme", JSON.stringify("light"));
    } else {
      const isItDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isItDarkMode) {
        setPreferdUserTheme("dark-theme bg-skin-fill-primary text-skin-base");
        localStorage.setItem("theme", JSON.stringify("default"));
      } else {
        setPreferdUserTheme("light-theme bg-skin-fill-primary text-skin-base");
        localStorage.setItem("theme", JSON.stringify("default"));
      }
    }
  }, [preferdTheme]);

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
    mainDomain + MAIN_ROUTES.CONFIRM_EMAIL,
    mainDomain + MAIN_ROUTES.NOTES,
    mainDomain + MAIN_ROUTES.NOTE_DETAIL,
    mainDomain + MAIN_ROUTES.NOTE_CRUD,
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
    <div className={preferdUserTheme}>
      <Routes>
        {isLoading ? (
          <Route path="/*" element={<SpinnerIndicatorsComponent />} />
        ) : isLoggedIn ? (
          <Route path="/main/*" element={<MainRouter />} />
        ) : (
          <Route path="/auth/*" element={<AuthRouter />} />
        )}
        {!authRoutes.includes(currentPath) &&
        !mainRoutes.includes(currentPath) ? (
          <Route path="*" element={<NotFoundPage />} />
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
}
