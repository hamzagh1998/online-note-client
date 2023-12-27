import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyActionCode, checkActionCode, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth } from "../../../../libs/firebase";

import { ErrorBannerComponent } from "../../../../common/components/banners/error-banner.component";

import { MAIN_REOTES } from "../../../../routes/_routes-names";

import emailLogo from "../../../../assets/email.png";

export function ConfirmEmailPage() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

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
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
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
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center max-sm:items-start max-sm:p-6">
      <div className="w-full text-center lg:rounded-lg lg:w-1/2 h-fit bg-skin-fill-secondary lg:p-16 p-6 shadow-sm">
        {error ? <ErrorBannerComponent message={error} /> : <></>}
        <img src={emailLogo} alt="email icon" className="w-[12rem] m-auto" />
        <p className="font-bold lg:text-4xl text-lg mt-10">
          Verification Email Sent!
        </p>
        <br />
        <p className="text-xs lg:text-lg text-skin-muted underline">
          kindly check your inbox in order to verify your account
        </p>
        <br />
        <button
          className="bg-skin-button-accent px-8 py-2 rounded-lg text-white"
          onClick={onSignOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
