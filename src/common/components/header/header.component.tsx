import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";

import logo from "../../../assets/logo-500.png";

type User = {
  firstName: null | string;
  lastName: null | string;
  email: null | string;
  photoURL: null | string;
  isPremium: null | boolean;
  plan: null | string;
};

export function HeaderComponent({ isLoading = false }) {
  const userData = useSelector((store: RootState) => store.auth.userData);
  const userProfile = useSelector((store: RootState) => store.profile);

  const [user, setUser] = useState<User>({
    firstName: null,
    lastName: null,
    email: null,
    photoURL: null,
    isPremium: null,
    plan: null,
  });

  useEffect(() => {
    if (!userData || !userProfile) return;
    setUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      photoURL: userData.photoURL,
      isPremium: userProfile.isPremium,
      plan: userProfile.plan,
    });
  }, [userData, userProfile]);

  console.log(user, isLoading);

  return (
    <header className="w-screen h-fit bg-skin-fill-secondary p-2">
      <nav>
        <section className="h-20 max-sm:h-14 w-ful flex items-center justify-between">
          {/* brand name and logo */}
          <main className="w-fit h-fit flex justify-center items-center">
            <img src={logo} className="w-28 max-sm:w-16" alt="Logo" />
            <p className="text-4xl max-sm:text-lg font-bold font-pacifico text-skin-accent">
              OnlineNote
            </p>
          </main>
          {/* user info section */}
          <main></main>
        </section>
      </nav>
    </header>
  );
}
