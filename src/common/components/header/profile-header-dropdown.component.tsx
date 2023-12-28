import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { WiStars } from "react-icons/wi";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { CgDarkMode } from "react-icons/cg";
import { MdDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import { setUserProfile } from "../../../features/notes/slices/profile.slice";

import { RootState } from "../../../redux/store";

import { auth } from "../../../libs/firebase";

import { User } from "./header.component";

import { capitalizer } from "../../../utils/capitalizer";

type ProfileProps = {
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
} & User;

export function ProfileHeaderDropdownComponent({
  firstName,
  lastName,
  email,
  isPremium,
  photoURL,
  plan,
  setDropdownVisible,
}: ProfileProps) {
  const dispatch = useDispatch();
  const userProfile = useSelector((store: RootState) => store.profile);

  const { preferdTheme } = userProfile;

  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const onChangeTheme = (theme: "default" | "dark" | "light") => {
    dispatch(setUserProfile({ ...userProfile, preferdTheme: theme }));
  };

  const onSignOut = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
      alert("Ooops, Unexpected error!");
    }
  };
  return (
    <div
      className="absolute h-screen w-screen top-0 right-0 z-10"
      onClick={(e) => {
        e.stopPropagation();
        setDropdownVisible(false);
      }}
    >
      <div
        className="border rounded-md border-skin-accent bg-skin-fill-secondary p-4 w-1/6 max-md:w-1/3 max-sm:w-screen max-sm:m-0 max-sm:right-0 max-sm:top-16 flex justify-center items-center flex-col absolute right-5 top-20 z-20"
        onMouseLeave={() => setDropdownVisible(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="rounded-full w-20 h-20"
          src={photoURL || ""}
          alt="img"
        />
        <div className="flex justify-between gap-2 items-center mt-2">
          <p className="font-bold text-xl">{`${firstName} ${lastName}`}</p>
          <p
            className={`text-xs px-2 rounded-full flex justify-center items-center bg-gray-200 ${
              isPremium ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {capitalizer(plan || "")}
          </p>
        </div>
        <p className="text-xs text-skin-muted mb-4">{email}</p>
        {!isPremium ? (
          <div className="w-full px-2 py-1 rounded-full mb-4 flex justify-center items-center bg-gradient-to-r from-pink-500 to-purple-700 animate-pulse hover:from-pink-600 hover:to-purple-800 hover:animate-none cursor-pointer">
            <WiStars className="text-orange-300" size={26} />
            <p className="text-md text-white">Go premium</p>
            <WiStars className="text-orange-300" size={26} />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`flex justify-between items-center gap-2 w-full ${
            isThemeOpen ? "text-skin-accent" : null
          } hover:text-skin-accent cursor-pointer mb-2`}
          onClick={() => setIsThemeOpen(!isThemeOpen)}
        >
          <div className="flex items-center gap-2">
            {preferdTheme === "default" ? (
              <CgDarkMode size={20} />
            ) : preferdTheme === "dark" ? (
              <MdDarkMode size={20} />
            ) : (
              <IoSunny size={20} />
            )}
            <p>
              {capitalizer(
                preferdTheme === "default" ? "device" : preferdTheme
              )}
              &ensp;Theme
            </p>
          </div>
          {isThemeOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isThemeOpen ? (
          <>
            <div className="ml-12 w-full">
              <div
                className="flex justify-between items-center gap-2 w-full hover:text-skin-accent cursor-pointer mb-2"
                onClick={() => onChangeTheme("default")}
              >
                <div className="flex items-center gap-2">
                  <CgDarkMode size={20} />
                  <p>Device Theme</p>
                </div>
              </div>
              <div
                className="flex justify-between items-center gap-2 w-full hover:text-skin-accent cursor-pointer mb-2"
                onClick={() => onChangeTheme("dark")}
              >
                <div className="flex items-center gap-2">
                  <MdDarkMode size={20} />
                  <p>Dark Theme</p>
                </div>
              </div>
              <div
                className="flex justify-between items-center gap-2 w-full hover:text-skin-accent cursor-pointer mb-2"
                onClick={() => onChangeTheme("light")}
              >
                <div className="flex items-center gap-2">
                  <IoSunny size={20} />
                  <p>Light Theme</p>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-gray-500 to-gray-700 my-4 "></div>
          </>
        ) : (
          <></>
        )}
        <div className="flex justify-start items-center gap-2 w-full hover:text-skin-accent cursor-pointer ">
          <IoMdSettings size={20} />
          <p>Account Settings</p>
        </div>
        <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-gray-500 to-gray-700 my-4 "></div>
        <div
          className="flex justify-start items-center gap-2 w-full hover:text-skin-error cursor-pointer"
          onClick={onSignOut}
        >
          <BiLogOut size={20} />
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
}
