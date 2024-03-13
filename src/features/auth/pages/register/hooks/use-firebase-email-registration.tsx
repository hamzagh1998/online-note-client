import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { AuthResponse, RegisterInputs, RegisterRequest } from "../../types";

import { auth } from "../../../../../libs/firebase";

import { useRegisterMutation } from "../../../slices/api/auth.service";

import { setUserData } from "../../../slices/auth.slice";

import { Response } from "../../../../../common/types";

export function useFirebaseEmailRegisteration(inputsInfo: RegisterInputs) {
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const [error, setError] = useState<Error | unknown | null | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegister = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { email, password } = inputsInfo;

      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (data.user && data.user.providerData && data.user.providerData[0]) {
          const userFbToken = await data.user.getIdToken(); // Get the Firebase ID token
          const { email, firstName, lastName } = inputsInfo; // Extract required fields
          const payload: RegisterRequest = {
            firstName,
            lastName,
            email,
            provider: "email",
          }; // Create the payload for registration
          dispatch(
            // save firebase token
            setUserData({
              fbToken: userFbToken,
              userData: null,
            })
          );
          try {
            const res = (await register(payload)) as Response;
            // Check for errors
            if (res.data.error) {
              // Handle error
              setError(
                "Something went wrong please check your network then try again!"
              );
            } else {
              await sendEmailVerification(data.user);
              dispatch(
                // save user data
                setUserData({
                  fbToken: userFbToken,
                  userData: res.data.detail as AuthResponse,
                })
              );
            }
          } catch (error) {
            if (userFbToken) await deleteUser(auth.currentUser!);
          }
        }
      } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;

        const errorType = errorCode.split("/")[1];
        setError(
          errorType === "email-already-in-use"
            ? "Email address already exists!"
            : errorType === "invalid-email"
              ? "Please enter a valid email address!"
              : "Something went wrong please check your network then try again!"
        );
      }
    } catch (err: Error | unknown | string) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { onRegister, isLoading, error };
}
