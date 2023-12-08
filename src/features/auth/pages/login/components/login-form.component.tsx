import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedLight } from "react-icons/pi";

import { CustomInput } from "../../../../../core/components/inputs/custom-input";
import { GoogleButtonComponent } from "../../../../../core/components/buttons/google-button.component";
import { useToggle } from "../../../../../core/hooks/use-toggle";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";

export function LoginFormComponent() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [showPwd, togglePwd] = useToggle(false);

  return (
    <form
      className="flex flex-col items-center justify-center box-border border border-skin-accent h-fit md:w-1/2 lg:w-1/2 rounded-xl p-6 lg:p-8 bg-skin-fill-secondary shadow-md"
      onSubmit={() => null}
    >
      <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-4xl md:text-5xl">
        Sign In
      </span>
      <p className="my-4 float-righ text-left max-sm:text-sm w-full">
        New to OnlineNote?&ensp;
        <span
          className="underline cursor-pointer text-skin-accent hover:opacity-80"
          onClick={() => navigate(AUTH_ROUTES.REGISTER)}
        >
          Create an account
        </span>
      </p>
      {/* form content */}
      <CustomInput
        type="email"
        label="Eamil:"
        placeholder="Eamil"
        value={formValues.email}
        setValue={(value: string) =>
          setFormValues({ ...formValues, email: value })
        }
      />
      <br />
      <CustomInput
        type={showPwd ? "text" : "password"}
        label="Password:"
        placeholder="Password"
        value={formValues.password}
        setValue={(value: string) =>
          setFormValues({ ...formValues, password: value })
        }
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
        onClick={() => navigate(AUTH_ROUTES.RESET_PWD)}
      >
        Forgot your password?
      </p>
      <input
        type="submit"
        value="Sign In"
        className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
      />
      <div className="flex justify-center w-full items-center gap-3 my-3 opacity-50 ">
        <div className="w-full bg-black h-[.5px]"></div>
        <p>Or</p>
        <div className="w-full bg-black h-[.5px]"></div>
      </div>
      <GoogleButtonComponent text="Sign In With Google" />
    </form>
  );
}
