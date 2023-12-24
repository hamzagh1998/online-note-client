import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { ValidationError, object, string } from "yup";

import { auth } from "../../../../../libs/firebase";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";
import { SmallSpinnerIndicatorsComponent } from "../../../../../common/components/activities-indicators/spinner-indicators.component";
import { ErrorBannerComponent } from "../../../../../common/components/banners/error-banner.component";
import { SuccessBannerComponent } from "../../../../../common/components/banners/success-banner.component";

export function ResetPasswordFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    login: "/auth" + AUTH_ROUTES.LOGIN,
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const emailSchema = object({
    email: string()
      .email("Pls enter a valid email address!")
      .required("Email is required!"),
  });

  const handleInput = async (value: string) => {
    setEmail(value);
    setEmailError("");
    try {
      await emailSchema.validateAt("email", { email: value });
    } catch (err) {
      const validationError = err as ValidationError;
      validationError.inner.forEach((error) => {
        setEmailError(error.message);
      });
    }
  };

  const onSendResetEmail = async () => {
    setIsLoading(true);
    setEmailError("");
    try {
      await emailSchema.validate({ email: email }, { abortEarly: false });
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess(
          "An email containing a reset link has been sent to your email address!  If you don't see the email in your inbox, please check your spam or junk folder."
        );
      } catch (error) {
        const fireBaseError = error as FirebaseError;
        const errorCode = fireBaseError.code;
        const errorType = errorCode.split("/")[1];
        const emailError = "Incorrect email. Please enter it again!";
        const userNotFoundError = "No account found with this email!";
        setError(
          errorType === "invalid-email" ? emailError : userNotFoundError
        );
      }
    } catch (err) {
      const validationError = err as ValidationError;
      validationError.inner.forEach((error) => {
        setEmailError(error.message);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-screen">
      <div className="flex-1 flex flex-col items-center justify-start w-full p-4">
        <p className="my-8">
          <span className="font-bold font-pacifico tracking-wide text-skin-accent text-4xl md:text-6xl">
            OnlineNote
          </span>
        </p>
        <form
          className="flex flex-col items-center justify-center box-border border border-skin-accent h-fit sm:w-[50%] lg:w-[33%] rounded-xl p-8 bg-skin-fill-secondary shadow-md"
          onSubmit={() => null}
        >
          <span
            className="w-full font-bold text-lg text-skin-accent hover:opacity-90 cursor-pointer"
            onClick={() => navigate(redirections.login)}
          >
            &#60; Back
          </span>
          <br />
          {error.length ? <ErrorBannerComponent message={error} /> : null}
          {success.length ? <SuccessBannerComponent message={success} /> : null}
          <br />
          <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-3xl md:text-5xl">
            Reset Password
          </span>
          {/* form content */}
          <CustomInput
            type="email"
            label="Eamil:"
            placeholder="Eamil"
            value={email}
            setValue={(value: string) => handleInput(value)}
            error={emailError}
          />
          {isLoding ? (
            <SmallSpinnerIndicatorsComponent />
          ) : (
            <input
              className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
              value="Send reset link"
              type="submit"
              onClick={onSendResetEmail}
            />
          )}
        </form>
      </div>
    </section>
  );
}
