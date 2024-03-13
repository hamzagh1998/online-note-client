import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError, object, string } from "yup";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";

import { AUTH_ROUTES } from "../../../../../routes/_routes-paths";
import { useFirebaseNewPwd } from "../hooks/use-firebase-new-pwd";

import { useToggle } from "../../../../../common/hooks/use-toggle";
import { CustomInput } from "../../../../../common/components/inputs/custom-input";
import { ErrorBannerComponent } from "../../../../../common/components/banners/error-banner.component";
import { SuccessBannerComponent } from "../../../../../common/components/banners/success-banner.component";
import { SmallSpinnerIndicatorsComponent } from "../../../../../common/components/activities-indicators/spinner-indicators.component";

type FormValues = {
  password: {
    value: string;
    error: string | null;
  };
  confirmPassword: {
    value: string;
    error: string | null;
  };
};

export function NewPasswordFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    login: "/auth" + AUTH_ROUTES.LOGIN,
  };

  const { changePwd, isLoading, success, error } = useFirebaseNewPwd();

  const [formValues, setFormValues] = useState<FormValues>({
    password: { value: "", error: null },
    confirmPassword: { value: "", error: null },
  });
  const [isInputError, setIsInputError] = useState(false);

  const [showPwd, togglePwd] = useToggle(false);
  const [showConfirmPwd, toggleConfirmPwd] = useToggle(false);

  const params = JSON.parse(localStorage.getItem("params")!);

  const mode: string | null = params ? params.mode : null;
  const oobCode: string | null = params ? params.oobCode : null;

  useEffect(() => {
    if (!oobCode || !mode) navigate(redirections.login);
    if (mode !== "resetPassword") navigate(redirections.login);
  }, [oobCode, mode]);

  const newPwdSchema = object({
    password: string().min(6).required("Password is required!"),
    confirmPassword: string().min(6).required("Password is required!"),
  });

  useEffect(() => {
    if (!mode || !oobCode) navigate(redirections.login);
  }, []);

  const handleInput = async (attribute: keyof FormValues, value: string) => {
    setIsInputError(false);
    setFormValues((inputsInfo) => ({
      ...inputsInfo,
      [attribute]: { value, error: null },
    }));

    try {
      await newPwdSchema.validateAt(
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
      setIsInputError(true);
    }
  };

  const onChangePwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.password.value.length) return setIsInputError(true);
    if (formValues.password.value !== formValues.confirmPassword.value) {
      setFormValues({
        ...formValues,
        confirmPassword: {
          ...formValues.confirmPassword,
          error: "Two passwords didn't match!",
        },
      });
      return setIsInputError(true);
    }
    if (!error && !isInputError && oobCode) {
      changePwd(formValues.password.value.toLowerCase().trim(), oobCode);
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
        <form className="flex flex-col items-center justify-center box-border border border-skin-accent h-fit sm:w-[50%] lg:w-[33%] rounded-xl p-8 bg-skin-fill-secondary shadow-md">
          <span
            className="w-full font-bold text-lg text-skin-accent hover:opacity-90 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("params");
              navigate(redirections.login);
            }}
          >
            &#60; Login
          </span>
          <br />
          {error.length ? <ErrorBannerComponent message={error} /> : null}
          {success.length ? <SuccessBannerComponent message={success} /> : null}
          <br />
          <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-3xl md:text-5xl">
            Change Password
          </span>
          {/* form content */}
          <CustomInput
            type={showPwd ? "text" : "password"}
            label="New Password:"
            placeholder="New Password"
            value={formValues.password.value}
            setValue={(value: string) => handleInput("password", value)}
            icon={
              showPwd ? (
                <BsEye size={20} onClick={togglePwd} />
              ) : (
                <PiEyeClosedLight size={20} onClick={togglePwd} />
              )
            }
            error={formValues.password.error}
          />
          <br />
          <CustomInput
            type={showConfirmPwd ? "text" : "password"}
            label="Confirm New Password:"
            placeholder="Confirm New Password"
            value={formValues.confirmPassword.value}
            setValue={(value: string) => handleInput("confirmPassword", value)}
            icon={
              showConfirmPwd ? (
                <BsEye size={20} onClick={toggleConfirmPwd} />
              ) : (
                <PiEyeClosedLight size={20} onClick={toggleConfirmPwd} />
              )
            }
            error={formValues.confirmPassword.error}
          />
          {isLoading ? (
            <SmallSpinnerIndicatorsComponent />
          ) : (
            <input
              onClick={isInputError ? (e) => e.preventDefault() : onChangePwd}
              type="submit"
              value="Save"
              className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
            />
          )}
        </form>
      </div>
    </section>
  );
}
