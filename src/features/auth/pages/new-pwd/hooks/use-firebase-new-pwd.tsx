import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";

import { auth } from "../../../../../libs/firebase";

export function useFirebaseNewPwd() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const changePwd = async (password: string, oobCode: string) => {
    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(
        "Your password has been successfully reset! You can now use your new password to sign in"
      );
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
    } finally {
      localStorage.removeItem("params");
      setIsLoading(false);
    }
  };
  return { changePwd, isLoading, success, error };
}
