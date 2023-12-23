import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";

import { AUTH_ROUTES } from "../../../../../routes/_routes-names";

export function ResetPasswordFormComponent() {
  const navigate = useNavigate();

  const redirections = {
    login: "/auth" + AUTH_ROUTES.LOGIN,
  };

  const [formValues, setFormValues] = useState({ email: "" });

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
          <span className="font-bold tracking-wide w-full float-left text-skin-base mb-6 text-3xl md:text-5xl">
            Reset Password
          </span>
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
          <input
            type="submit"
            value="Send reset link"
            className="mt-6 bg-skin-button-accent text-white font-bold tracking-wide hover:opacity-95 rounded-xl py-3 px-6 w-full cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
}
