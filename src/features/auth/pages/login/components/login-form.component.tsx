import { useEffect, useState } from "react";
import { object, string, ValidationError } from "yup";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedLight } from "react-icons/pi";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";
import { GoogleButtonComponent } from "../../../../../common/components/buttons/google-button.component";
import { ErrorBannerComponent } from "../../../../../common/components/banners/error-banner.component";
import { SmallSpinnerIndicatorsComponent } from "../../../../../common/components/activities-indicators/spinner-indicators.component";

import { useToggle } from "../../../../../common/hooks/use-toggle";
import { useFirebaseEmailLogin } from "../hooks/use-firebase-email-login";
import { useFirebaseGmailAuth } from "../../hooks/use-firebase-gmail-auth";

import { checkRequiredFields } from "../../../../../utils/check-required-fields";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";

type FormValues = {
  email: {
    value: string;
    error: string | null;
  };
  password: {
    value: string;
    error: string | null;
  };
};

export function LoginFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    register: "/auth" + AUTH_ROUTES.REGISTER,
    forgetPwd: "/auth" + AUTH_ROUTES.RESET_PWD,
  };

  const [isRequiredInputEmpty, setIsRequiredInputEmpty] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [formValues, setFormValues] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
  });

  const [showPwd, togglePwd] = useToggle(false);

  const { onLogin, isLoading, error } = useFirebaseEmailLogin({
    email: formValues.email.value,
    password: formValues.password.value,
  });

  const {
    onAuth: onGoogleLogin,
    isLoading: isGoogleLoading,
    error: googleError,
  } = useFirebaseGmailAuth();

  useEffect(() => {
    const isValid = checkRequiredFields(formValues, ["email", "password"]);
    validateForm();

    setIsRequiredInputEmpty(isValid);
  }, [formValues]);

  const loginSchema = object({
    email: string()
      .email("Invalid email address!")
      .required("Email is required!"),
    password: string().min(6).required("Password is required!"),
  });

  const handleInput = async (attribute: keyof FormValues, value: string) => {
    setFormValues((inputsInfo) => ({
      ...inputsInfo,
      [attribute]: { value, error: null },
    }));

    try {
      await loginSchema.validateAt(
        attribute,
        { [attribute]: value },
        { abortEarly: false }
      );
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        setFormValues((inputsInfo) => ({
          ...inputsInfo,
          [attribute]: {
            ...inputsInfo[attribute],
            error: (error as ValidationError).message,
          },
        }));
      }
    }
  };

  const validateForm = () => {
    for (const key in formValues) {
      if (formValues[key as keyof FormValues].error) {
        setIsInputError(true);
        return false;
      }
    }
    setIsInputError(false);
    return true;
  };

  const onLoginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputError || isRequiredInputEmpty) return;

    onLogin();
  };

  return (
    <form
      className="flex flex-col items-center justify-center box-border border border-skin-accent h-fit md:w-1/2 lg:w-1/2 rounded-xl p-6 lg:p-8 bg-skin-fill-secondary shadow-md"
      onSubmit={isGoogleLoading ? () => null : onLoginWithEmail}
    >
      <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-4xl md:text-5xl">
        Sign In
      </span>
      {error && !googleError ? (
        <ErrorBannerComponent
          message={typeof error === "string" ? error : ""}
        />
      ) : null}
      {googleError && !error ? (
        <ErrorBannerComponent
          message={typeof googleError === "string" ? googleError : ""}
        />
      ) : null}
      <p className="my-4 float-righ text-left max-sm:text-sm w-full">
        New to OnlineNote?&ensp;
        <span
          className="underline cursor-pointer text-skin-accent hover:opacity-80"
          onClick={() => navigate(redirections.register)}
        >
          Create an account
        </span>
      </p>
      {/* form content */}
      <CustomInput
        type="email"
        label="Eamil:"
        placeholder="Eamil"
        value={formValues.email.value}
        setValue={(value: string) => handleInput("email", value)}
        error={formValues.email.error}
      />
      <br />
      <CustomInput
        type={showPwd ? "text" : "password"}
        label="Password:"
        placeholder="Password"
        value={formValues.password.value}
        setValue={(value: string) => handleInput("password", value)}
        error={formValues.password.error}
        icon={
          showPwd ? (
            <BsEye size={20} onClick={togglePwd} />
          ) : (
            <PiEyeClosedLight size={20} onClick={togglePwd} />
          )
        }
      />
      <p
        className="mt-3 float-righ text-right text-sm text-skin-accent w-full underline cursor-pointer hover:opacity-80"
        onClick={() => navigate(redirections.forgetPwd)}
      >
        Forgot your password?
      </p>
      {isLoading ? (
        <SmallSpinnerIndicatorsComponent />
      ) : (
        <input
          type="submit"
          value="Sign Up"
          className={`mt-6 bg-skin-button-accent text-white font-bold tracking-wide rounded-xl py-3 px-6 w-full ${
            isInputError || isRequiredInputEmpty
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } ${
            isInputError || isRequiredInputEmpty
              ? "opacity-50"
              : "hover:opacity-95"
          }`}
        />
      )}
      <div className="flex justify-center w-full items-center gap-3 my-3 opacity-50 ">
        <div className="w-full bg-black h-[.5px]"></div>
        <p>Or</p>
        <div className="w-full bg-black h-[.5px]"></div>
      </div>
      {isGoogleLoading ? (
        <SmallSpinnerIndicatorsComponent />
      ) : (
        <div className="w-full" onClick={onGoogleLogin}>
          <GoogleButtonComponent text="Sign Up With Google" />
        </div>
      )}
    </form>
  );
}
