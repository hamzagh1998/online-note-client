import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";

import { RootState } from "../../../redux/store";

import { ProfileHeaderDropdownComponent } from "./profile-header-dropdown.component";
import { SpinnerIndicatorsComponent } from "../activities-indicators/spinner-indicators.component";

import logo from "../../../assets/logo-icon.png";
import { VscChromeClose } from "react-icons/vsc";

export type User = {
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

  const [isDropdownVisible, setDropdownVisible] = useState(false);

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

  return (
    <>
      {isLoading ? (
        <SpinnerIndicatorsComponent />
      ) : (
        <header className="w-screen h-fit bg-skin-fill-secondary px-6 max-sm:px-2">
          <nav>
            <section className="h-20 max-sm:h-14 w-ful flex items-center justify-between">
              {/* brand name and logo */}
              <main className="w-fit h-fit flex justify-center items-center cursor-pointer">
                <img src={logo} className="w-16 max-sm:w-12" alt="Logo" />
                <p className="text-4xl max-sm:text-2xl font-bold font-pacifico text-skin-accent">
                  OnlineNote
                </p>
              </main>
              {/* user info section */}
              <main className="flex justify-between gap-3 items-center max-sm:hidden rounded-full">
                <div className="p-2  border-2 rounded-full cursor-pointer">
                  <IoMdNotifications size={26} />
                </div>
                <img
                  onMouseOver={() => setDropdownVisible(true)}
                  className="rounded-full w-11 cursor-pointer"
                  src={user.photoURL || ""}
                  alt="user img"
                />
              </main>
              {/* burger menu */}
              <main
                className="hidden max-sm:block"
                onClick={() => setDropdownVisible(!isDropdownVisible)}
              >
                {isDropdownVisible ? (
                  <VscChromeClose size={24} />
                ) : (
                  <GiHamburgerMenu size={24} />
                )}
              </main>
            </section>
          </nav>
          {isDropdownVisible && (
            <ProfileHeaderDropdownComponent
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              isPremium={user.isPremium}
              photoURL={user.photoURL}
              plan={user.plan}
              setDropdownVisible={setDropdownVisible}
            />
          )}
        </header>
      )}
    </>
  );
}
