import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedLight } from "react-icons/pi";

import { CustomInput } from "../../../../../core/components/inputs/custom-input";
import { GoogleButtonComponent } from "../../../../../core/components/buttons/google-button.component";
import { useToggle } from "../../../../../core/hooks/use-toggle.hook";

import authIllustrationImg from "../../../../../assets/auth-illustration.svg";

import { AUTH_ROUTES } from "../../../../../core/constants/routes-names";

export function RegisterFormComponent() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPwd, togglePwd] = useToggle(false);

  return (
    <section className="flex w-screen">
      <div className="flex-1 flex flex-col items-center justify-start w-full p-4">
        <p className="my-8">
          <span className="font-bold tracking-wide text-skin-accent text-4xl md:text-5xl">
            NoteWeave
          </span>
        </p>
        <form
          className="flex flex-col items-center justify-center box-border border border-skin-accent  h-fit md:w-10/12 lg:w-1/2 rounded-xl p-6 lg:p-8 bg-skin-fill-secondary shadow-md"
          onSubmit={() => null}
        >
          <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-4xl md:text-5xl">
            Sign Up
          </span>
          <p className="my-4 float-righ text-left max-sm:text-sm w-full">
            Already have an account?&ensp;
            <span
              className="underline cursor-pointer text-skin-accent hover:opacity-80"
              onClick={() => navigate(AUTH_ROUTES.LOGIN)}
            >
              Sign In
            </span>
          </p>
          {/* form content */}
          <div className="flex justify-center items-center gap-2 w-full">
            <CustomInput
              type="text"
              label="First Name:"
              placeholder="First name"
              value={formValues.lastName}
              setValue={(value: string) =>
                setFormValues({ ...formValues, firstName: value })
              }
            />
            <CustomInput
              type="email"
              label="Last Name:"
              placeholder="Last name"
              value={formValues.firstName}
              setValue={(value: string) =>
                setFormValues({ ...formValues, lastName: value })
              }
            />
          </div>
          <br />
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
          <div className="flex justify-center w-full items-center gap-3 my-3 opacity-50 ">
            <div className="w-full bg-black h-[.5px]"></div>
            <p>Or</p>
            <div className="w-full bg-black h-[.5px]"></div>
          </div>
          <GoogleButtonComponent text="Sign Up With Google" />
          <input
            type="submit"
            value="Sign Up"
            className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
          />
          <p className="mt-6 text-xs">
            By continuing, you agree to NoteWeave&ensp;
            <a
              href="#"
              className="text-skin-accent text-sm cursor-pointer  font-bold"
            >
              Terms of Service
            </a>
            &ensp;and&ensp;
            <a
              href="#"
              className="text-skin-accent text-sm cursor-pointer  font-bold"
            >
              Privacy Policy.
            </a>
          </p>
        </form>
      </div>
      <div className="hidden flex-1 justify-center items-end md:flex floating">
        <img src={authIllustrationImg} alt="illustration img" />
      </div>
    </section>
  );
}
