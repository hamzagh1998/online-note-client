import { ReactNode } from "react";

import authIllustrationImg from "../../../assets/auth-illustration.svg";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-screen">
      <div className="flex-1 flex flex-col items-center justify-start w-full p-4">
        <p className="my-8">
          <span className="font-bold font-pacifico tracking-wide text-skin-accent text-4xl md:text-6xl">
            OnlineNote
          </span>
        </p>
        {children}
      </div>
      <div className="hidden flex-1 justify-center items-end md:flex floating">
        <img src={authIllustrationImg} alt="illustration img" />
      </div>
    </section>
  );
}
