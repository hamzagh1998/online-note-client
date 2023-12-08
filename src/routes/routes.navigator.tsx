import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User, onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../libs/firebase";

import { MainRouter } from "./main.router";
import { AuthRouter } from "./auth.router";
import { AUTH_ROUTES } from "../core/constants/routes-names";
import { SpinnerIndicatorsComponent } from "../core/components/indicators/spinner-indicators.component";

import { RootState } from "../redux/store";

export function RoutesNavigator() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const [, setUserData] = useState<User | null>(null);
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserData(user);
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

  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);

  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode");

  if (mode && oobCode)
    localStorage.setItem("params", JSON.stringify({ mode, oobCode }));

  const authRoutes = [
    AUTH_ROUTES.LOGIN,
    AUTH_ROUTES.REGISTER,
    AUTH_ROUTES.RESET_PWD,
    AUTH_ROUTES.NEW_PWD,
  ];
  const mainRoutes = [
    "/main/confirm-email",
    "/main/notes",
    "/main/note",
    "/main/note-crud",
  ];

  useEffect(() => {
    if (!isLoggedIn && !authRoutes.includes(currentPath))
      navigate("/auth/login");
    else if (isLoggedIn) {
      if (!auth.currentUser?.emailVerified) {
        navigate("/main/confirm-email");
      } else if (!mainRoutes.includes(currentPath)) {
        navigate("/main/notes");
      }
    }
  }, [isLoggedIn, mode]);

  return (
    <div className={prefersMode}>
      <Routes>
        {isLoading ? (
          <Route path="/*" element={<SpinnerIndicatorsComponent />} />
        ) : isLoggedIn && token ? (
          <Route path="/main/*" element={<MainRouter />} />
        ) : (
          <Route path="/auth/*" element={<AuthRouter />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

function NotFoundPage() {
  return <div>404 - Page Not Found</div>;
}
