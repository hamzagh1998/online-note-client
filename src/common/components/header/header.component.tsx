import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import { MdError } from "react-icons/md";

import { RootState } from "../../../redux/store";

import { ProfileHeaderDropdownComponent } from "./profile-header-dropdown.component";
import { SpinnerIndicatorsComponent } from "../activities-indicators/spinner-indicators.component";

import { NotificationHeaderDropdownComponent } from "./notification-header-dropdown.component";

import { useNotificationMutation } from "../../../features/notes/slices/api/profile/profile.service";

import { setUserProfile } from "../../../features/notes/slices/profile.slice";

import { Response } from "../../types";

import logo from "../../../assets/logo-icon.png";
import { ToastComponent } from "../toast/toast.component";

export type User = {
  firstName: null | string;
  lastName: null | string;
  email: null | string;
  photoURL: null | string;
  isPremium: null | boolean;
  plan: null | string;
};

export function HeaderComponent({ isLoading = false }) {
  const dispatch = useDispatch();

  const userData = useSelector((store: RootState) => store.auth.userData);
  const userProfile = useSelector((store: RootState) => store.profile);

  const [updateNotification] = useNotificationMutation();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isNotifVisible, setNotifVisible] = useState(false);
  const [error, setError] = useState<null | string>(null);

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

  const onSeeNotif = async (payload: Array<string>) => {
    try {
      const res = (await updateNotification(payload)) as Response;
      if (res.data.error) {
        return setError("Ooops, Something went wrong!");
      }
      dispatch(
        setUserProfile({
          ...userProfile,
          notifications: userProfile.notifications.filter(
            (notif) => !payload.includes(notif.id)
          ),
        })
      );
    } catch (error) {
      setError("Ooops, Something went wrong while!");
    }
  };

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
              <main className="flex justify-between gap-3 items-center max-sm:hidden">
                <div
                  className="relative p-2  border-2 rounded-full cursor-pointer"
                  onMouseOver={() => setNotifVisible(true)}
                >
                  {userProfile.notifications.length ? (
                    <div className="absolute top-1 right-1 p-[2px] bg-pink-500 rounded-full h-[14px] w-[14px] text-[12px] font-extrabold text-white flex justify-center items-center">
                      {userProfile.notifications.length}
                    </div>
                  ) : (
                    <></>
                  )}
                  <IoMdNotifications className="text-gray-400" size={26} />
                </div>
                <img
                  onMouseOver={() => setDropdownVisible(true)}
                  className="rounded-full w-11 cursor-pointer"
                  src={user.photoURL || ""}
                  alt="user img"
                />
              </main>
              {/* burger menu */}
              <main className=" gap-3 items-center w-fit hidden max-sm:flex">
                <div
                  className="relative p-1 border-2 rounded-full cursor-pointer"
                  onClick={() => setNotifVisible(true)}
                >
                  {userProfile.notifications.length ? (
                    <div className="absolute top-1 right-1 p-[2px] bg-pink-500 rounded-full h-[12px] w-[12px] text-[10px] font-extrabold text-white flex justify-center items-center">
                      {userProfile.notifications.length}
                    </div>
                  ) : (
                    <></>
                  )}
                  <IoMdNotifications className="text-gray-400" size={22} />
                </div>
                <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
                  {isDropdownVisible ? (
                    <VscChromeClose size={24} />
                  ) : (
                    <GiHamburgerMenu size={24} />
                  )}
                </div>
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
          {isNotifVisible && (
            <NotificationHeaderDropdownComponent
              setDropdownVisible={setNotifVisible}
              notifications={userProfile.notifications}
              updateNotification={onSeeNotif}
            />
          )}
          {error ? (
            <ToastComponent
              message={error}
              type="error"
              positition="BOTTOM_RIGHT"
              icon={<MdError color="#fff" size={20} />}
              className="bg-red-500 text-white"
            />
          ) : null}
        </header>
      )}
    </>
  );
}
