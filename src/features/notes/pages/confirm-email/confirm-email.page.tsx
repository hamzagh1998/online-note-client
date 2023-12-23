import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyActionCode, checkActionCode, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth } from "../../../../libs/firebase";
import { MAIN_REOTES } from "../../../../routes/_routes-names";

export function ConfirmEmailPage() {
  const navigate = useNavigate();

  const [error, setError] = useState<FirebaseError | null>(null);

  const params = JSON.parse(localStorage.getItem("params")!);

  const handleEmailAction = async (mode: string, oobCode: string) => {
    try {
      if (mode === "verifyEmail") {
        // Check if the action code is valid
        await checkActionCode(auth, oobCode!);

        // Apply the action (in this case, verify the email)
        await applyActionCode(auth, oobCode!);
      }
    } catch (error) {
      setError(error as FirebaseError); // Explicitly type error as FirebaseError
    }
  };

  if (params) {
    (async () => {
      await handleEmailAction(params.mode, params.oobCode);
      localStorage.removeItem("params");
      navigate("/main" + MAIN_REOTES.NOTES);
    })();
  }

  const onSignOut = async () => {
    try {
      await signOut(auth); // Await the signOut method
    } catch (error) {
      setError(error as FirebaseError); // Explicitly type error as FirebaseError
    }
  };

  return (
    <div>
      <button onClick={onSignOut}>Logout</button>
      {error ? <p>{error.message}</p> : <></>}
    </div>
  );
}
