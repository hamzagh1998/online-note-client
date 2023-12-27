import { useEffect, useState } from "react";
import { ValidationError, object, string } from "yup";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedLight } from "react-icons/pi";

import { useFirebaseEmailRegisteration } from "../hooks/use-firebase-email-registration";
import { useFirebaseGmailAuth } from "../../hooks/use-firebase-gmail-auth";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";
import { GoogleButtonComponent } from "../../../../../common/components/buttons/google-button.component";
import { useToggle } from "../../../../../common/hooks/use-toggle";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";
import { ErrorBannerComponent } from "../../../../../common/components/banners/error-banner.component";

import { checkRequiredFields } from "../../../../../utils/check-required-fields";
import { SmallSpinnerIndicatorsComponent } from "../../../../../common/components/activities-indicators/spinner-indicators.component";

type FormValues = Record<string, { value: string; error: string | null }>;

export function RegisterFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    login: "/auth" + AUTH_ROUTES.LOGIN,
  };

  const [isRequiredInputEmpty, setIsRequiredInputEmpty] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: { value: "", error: null },
    lastName: { value: "", error: null },
    email: { value: "", error: null },
    password: { value: "", error: null },
  });

  const [showPwd, togglePwd] = useToggle(false);

  const { onRegister, isLoading, error } = useFirebaseEmailRegisteration({
    firstName: formValues.firstName.value.toLowerCase().trim(),
    lastName: formValues.lastName.value.toLowerCase().trim(),
    email: formValues.email.value.toLowerCase().trim(),
    password: formValues.password.value,
  });

  const {
    onAuth: onGoogleRegister,
    isLoading: isGoogleLoading,
    error: googleError,
  } = useFirebaseGmailAuth();

  useEffect(() => {
    const isValid = checkRequiredFields(formValues, [
      "firstName",
      "lastName",
      "email",
      "password",
    ]);
    validateForm();

    setIsRequiredInputEmpty(isValid);
  }, [formValues]);

  const registerSchema = object({
    firstName: string().required("First name is required!"),
    lastName: string().required("Last name is required!"),
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
      await registerSchema.validateAt(
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
      if (formValues[key].error) {
        setIsInputError(true);
        return false;
      }
    }
    setIsInputError(false);
    return true;
  };

  const onRegisterWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputError || isRequiredInputEmpty) return;

    onRegister();
  };

  return (
    <form
      className="flex flex-col items-center justify-center box-border border border-skin-accent h-fit md:w-1/2 lg:w-1/2 rounded-xl p-6 lg:p-8 bg-skin-fill-secondary shadow-md"
      onSubmit={isGoogleLoading ? () => null : onRegisterWithEmail}
    >
      <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-4xl md:text-5xl">
        Sign Up
      </span>
      <p className="my-4 float-righ text-left max-sm:text-sm w-full">
        Already have an account?&ensp;
        <span
          className="underline cursor-pointer text-skin-accent hover:opacity-80"
          onClick={() => navigate(redirections.login)}
        >
          Sign In
        </span>
      </p>
      {/* form content */}
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
      <div className="flex justify-center items-start gap-2 w-full">
        <CustomInput
          type="text"
          label="First Name:"
          placeholder="First name"
          value={formValues.firstName.value}
          setValue={(value: string) => handleInput("firstName", value)}
          error={formValues.firstName.error}
        />
        <CustomInput
          type="text"
          label="Last Name:"
          placeholder="Last name"
          value={formValues.lastName.value}
          setValue={(value: string) => handleInput("lastName", value)}
          error={formValues.lastName.error}
        />
      </div>
      <br />
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
      {isLoading ? (
        <SmallSpinnerIndicatorsComponent />
      ) : (
        <input
          type="submit"
          value="Sign Up"
          className={`mt-6 bg-skin-button-accent text-white font-bold tracking-wide rounded-xl py-3 px-6 w-full ${
            isInputError || isRequiredInputEmpty || isGoogleLoading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } ${
            isInputError || isRequiredInputEmpty || isGoogleLoading
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
        <div className="w-full" onClick={onGoogleRegister}>
          <GoogleButtonComponent text="Sign Up With Google" />
        </div>
      )}
      <p className="mt-6 text-xs">
        By continuing, you agree to OnlineNote&ensp;
        <a
          href="#"
          className="text-skin-accent text-sm cursor-pointer font-bold"
        >
          Terms of Service
        </a>
        &ensp;and&ensp;
        <a
          href="#"
          className="text-skin-accent text-sm cursor-pointer font-bold"
        >
          Privacy Policy.
        </a>
      </p>
    </form>
  );
}
