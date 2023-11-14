import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../libs/firebase";
import { MainRouter } from "./main.router";
import { AuthRouter } from "./auth.router";

export function RoutesNavigator() {
  const location = useLocation();
  const navigate = useNavigate();

  const [, setUserData] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/new-password",
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
    <Routes>
      {isLoading ? (
        <Route path="/*" element={<div>Loading ...</div>} />
      ) : isLoggedIn ? (
        <Route path="/main/*" element={<MainRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}
    </Routes>
  );
}
