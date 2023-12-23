import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";
import { useToggle } from "../../../../../common/hooks/use-toggle";

export function NewPasswordFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    login: "/auth" + AUTH_ROUTES.LOGIN,
  };

  const [formValues, setFormValues] = useState({ newPwd: "", confirmPwd: "" });

  const [showPwd, togglePwd] = useToggle(false);
  const [showConfirmPwd, toggleConfirmPwd] = useToggle(false);

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
            &#60; Login
          </span>
          <br />
          <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-3xl md:text-5xl">
            Change Password
          </span>
          {/* form content */}
          <CustomInput
            type={showPwd ? "text" : "password"}
            label="New Password:"
            placeholder="New Password"
            value={formValues.newPwd}
            setValue={(value: string) =>
              setFormValues({ ...formValues, newPwd: value })
            }
            icon={
              showPwd ? (
                <BsEye size={20} onClick={togglePwd} />
              ) : (
                <PiEyeClosedLight size={20} onClick={togglePwd} />
              )
            }
          />
          <br />
          <CustomInput
            type={showConfirmPwd ? "text" : "password"}
            label="Confirm New Password:"
            placeholder="Confirm New Password"
            value={formValues.confirmPwd}
            setValue={(value: string) =>
              setFormValues({ ...formValues, confirmPwd: value })
            }
            icon={
              showConfirmPwd ? (
                <BsEye size={20} onClick={toggleConfirmPwd} />
              ) : (
                <PiEyeClosedLight size={20} onClick={toggleConfirmPwd} />
              )
            }
          />
          <input
            type="submit"
            value="Save"
            className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
}
