import { useState } from "react";
import { GoogleAuthProvider, deleteUser, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";

import {
  useLoginMutation,
  useRegisterMutation,
} from "../slices/api/auth.service";

import { auth, googleProvider } from "../../../../libs/firebase";

import { setUserData } from "../slices/auth.slice";

import { LoginRequest, RegisterRequest } from "../types";

import { MiddlewareErrorResponse, Response } from "../../../../common/types";

type AuthType = "register" | "login";

export function useFirebaseGmailAuth(authType: AuthType) {
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const [error, setError] = useState<Error | unknown | null | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegister = async () => {
    setIsLoading(true);
    try {
      const data = await signInWithPopup(auth, googleProvider);

      // The signed-in user info.
      const user = data.user;
      if (data.user && data.user.providerData && data.user.providerData[0]) {
        const userFbToken = await user?.getIdToken(); // firbase access token
        const { email, providerData, photoURL } = user;
        const [firstName, lastName] = (providerData[0].displayName ?? "").split(
          " "
        );
        dispatch(setUserData({ fbToken: userFbToken, userData: null }));
        if (!email) return setError("Error, no email provided!");
        const payload: RegisterRequest | LoginRequest =
          authType === "register"
            ? {
                firstName,
                lastName,
                email,
                photoURL: photoURL || "",
                provider: "google",
              }
            : {
                email,
                photoURL: photoURL || "",
                provider: "google",
              }; // Create the payload for registration
        const res =
          authType === "register"
            ? ((await register(payload as RegisterRequest)) as
                | Response
                | MiddlewareErrorResponse)
            : ((await login(payload as LoginRequest)) as
                | Response
                | MiddlewareErrorResponse);
        // Check if 'error' property exists to determine the type
        if ("error" in res) {
          // 'res' is of type 'MiddlewareErrorResponse'
          if (user) await deleteUser(auth.currentUser!);
        } else {
          // 'res' is of type 'Response'
          if (res.data.error) {
            if (user) await deleteUser(auth.currentUser!);
          } else {
            const userData = res.data.detail || null;
            dispatch(setUserData({ fbToken: userFbToken, userData }));
          }
        }
      }
    } catch (error) {
      console.error("Error while login with google: ", error);
      // The AuthCredential type that was used.
      GoogleAuthProvider.credentialFromError(error as FirebaseError);
      setError(
        "Oops! Something went wrong. Please ensure that you have allowed pop-ups for authentication in your browser settings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { onRegister, isLoading, error };
}
