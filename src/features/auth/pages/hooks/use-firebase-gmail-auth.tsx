import { useState } from "react";
import { GoogleAuthProvider, deleteUser, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../slices/api/auth.service";

import { auth, googleProvider } from "../../../../libs/firebase";

import { setUserData } from "../../slices/auth.slice";

import { GoogleAuthRequest } from "../types";

import { MiddlewareErrorResponse, Response } from "../../../../common/types";

export function useFirebaseGmailAuth() {
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const [error, setError] = useState<Error | unknown | null | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAuth = async () => {
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
        const payload: GoogleAuthRequest = {
          firstName,
          lastName,
          email,
          photoURL: photoURL || "",
          provider: "google",
        };
        const res = (await login(payload as GoogleAuthRequest)) as
          | Response
          | MiddlewareErrorResponse;
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
      // The AuthCredential type that was used.
      GoogleAuthProvider.credentialFromError(error as FirebaseError);
      setError(
        "Oops! Something went wrong. Please ensure that you have allowed pop-ups for authentication in your browser settings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { onAuth, isLoading, error };
}
