import { useState } from "react";
import { useDispatch } from "react-redux";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useLoginMutation } from "../../../slices/api/auth.service";

import { auth } from "../../../../../libs/firebase";

import { setUserData } from "../../../slices/auth.slice";

import { LoginInputs, LoginRequest } from "../../types";
import { Response } from "../../../../../common/types";

export function useFirebaseEmailLogin(inputsInfo: LoginInputs) {
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const [error, setError] = useState<Error | unknown | null | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { email, password } = inputsInfo;
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log("data", data);
      if (data.user && data.user.providerData && data.user.providerData[0]) {
        const userFbToken = await data.user.getIdToken(); // Get the Firebase ID token
        const payload: LoginRequest = {
          email,
          provider: "email",
        }; // Create the payload for login
        dispatch(
          // save firebase token
          setUserData({
            fbToken: userFbToken,
            userData: null,
          })
        );
        const res = (await login(payload)) as Response;
        // Check for errors
        if (res.data.error) {
          // Handle error
          setError(
            "Something went wrong please check your network then try again!"
          );
        } else {
          dispatch(
            // save user data
            setUserData({
              fbToken: userFbToken,
              userData: res.data.detail,
            })
          );
        }
      }
    } catch (error: Error | unknown | string) {
      const firebaseError = error as FirebaseError;
      const errorCode = firebaseError.code;
      const errorType = errorCode.split("/")[1];
      console.log("errorType", errorType);

      const invalidCredentials = "Invalid login credentials!";
      const emailError =
        "No account found with this email. Please check your email or sign up!";
      const passwordError =
        "Password is incorrect. Please re-enter your password!";
      setError(
        errorType === "invalid-login-credentials"
          ? invalidCredentials
          : errorType === "user-not-found"
            ? emailError
            : passwordError
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading, error };
}
