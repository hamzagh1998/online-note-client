import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { RegisterInputs, RegisterRequest, RegisterResponse } from "../../types";

import { auth } from "../../../../../libs/firebase";

import { useRegisterMutation } from "../../slices/api/auth.service";

import { setUserData } from "../../slices/auth.slice";

export function useFirebaseEmailRegisteration(inputsInfo: RegisterInputs) {
  const dispatch = useDispatch();

  const [register, { isLoading, data: regsiterData, error: registerError }] =
    useRegisterMutation();

  const [error, setError] = useState<Error | unknown | null | string>();

  const onRegister = async () => {
    setError(null);
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
          const { email, password, firstName, lastName } = inputsInfo; // Extract required fields
          const payload: RegisterRequest = {
            firstName,
            lastName,
            email,
            password,
            userFbToken,
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
            await register(payload);
            // Check for errors
            if (registerError) {
              // Handle error
              setError(
                "Something went wrong please check your network then try again!"
              );
            } else {
              // Access data
              const res: RegisterResponse = regsiterData;
              // Server side error
              if (res.statusCode > 201) {
                setError(res.error);
                if (userFbToken) await deleteUser(auth.currentUser!);
              } else if (res.userData) {
                const userData = res.userData;
                await sendEmailVerification(data.user);
                dispatch(
                  // save user data
                  setUserData({
                    fbToken: userFbToken,
                    userData,
                  })
                );
              }
            }
          } catch (error) {
            if (userFbToken) await deleteUser(auth.currentUser!);
          }
        }
      } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;

        const errorType = errorCode.split("/")[1];
        console.log(errorType);

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
    }
  };

  return { onRegister, isLoading, error };
}
