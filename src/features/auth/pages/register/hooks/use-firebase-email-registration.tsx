import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { jwtDecode } from "jwt-decode";

import { RegisterInputs, RegisterRequest, RegisterResponse } from "../../types";

import { auth } from "../../../../../libs/firebase";

import { useRegisterMutation } from "../../slices/auth.service";

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
              } else if (res.token) {
                const token = res.token;
                await sendEmailVerification(data.user);
                const decoded = jwtDecode(token) || null;
                dispatch(
                  setUserData({
                    token: token,
                    fbToken: userFbToken,
                    userData: decoded,
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
        setError(
          errorType === "email-already-in-use"
            ? "Email address already exists!"
            : "Something went wrong please check your network then try again!"
        );
      }
    } catch (err: Error | unknown | string) {
      setError(err);
    }
  };

  return { onRegister, isLoading, error };
}
