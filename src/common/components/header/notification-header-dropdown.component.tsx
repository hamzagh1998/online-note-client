import { FaInbox, FaRegEye } from "react-icons/fa6";

import { Notification } from "../../../features/content-management/slices/profile.slice";

import logo from "../../../assets/logo-icon.png";

type NotificationsProps = {
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Array<Notification>;
  updateNotification: (payload: Array<string>) => Promise<void>;
};

export function NotificationHeaderDropdownComponent({
  setDropdownVisible,
  notifications,
  updateNotification,
}: NotificationsProps) {
  return (
    <div
      className="absolute h-screen w-screen top-0 right-0 z-10"
      onClick={(e) => {
        e.stopPropagation();
        setDropdownVisible(false);
      }}
    >
      <div
        className="border rounded-md border-skin-accent bg-skin-fill-secondary p-4 w-1/6 max-md:w-1/3 max-sm:w-[95%] max-sm:m-auto max-sm:right-[2.5%] max-sm:top-16 flex justify-center items-center flex-col absolute right-20 top-20 z-20"
        onMouseLeave={() => setDropdownVisible(false)}
        onClick={(e) => e.stopPropagation()}
      >
        Notifications: {notifications.length}
        <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-gray-500 to-gray-700 my-4 "></div>
        {notifications.map((notification) => (
          <div
            key={notification.content}
            className="bg-emerald-100 p-1 mb-1 rounded-lg"
          >
            <div className="flex justify-start items-center gap-2">
              <img
                className="rounded-full h-10 w-10"
                src={notification.userPhoto ? notification.userPhoto : logo}
                alt="notif"
              />
              <p
                className="text-xl text-pink-500 font-bold cursor-pointer"
                onClick={() =>
                  notification.link
                    ? (window.location.href = notification.link)
                    : null
                }
              >
                {notification.title}
              </p>
            </div>
            <p className="text-black mb-2">{notification.content}</p>
            <p
              className="text-xs underline flex items-center gap-1 cursor-pointer text-pink-500 hover:text-skin-accent"
              onClick={() => updateNotification([notification.id])}
            >
              <FaRegEye /> Mark it as read
            </p>
          </div>
        ))}
        {!notifications.length ? (
          <div className="flex flex-col items-center h-full w-full text-gray-500 opacity-50 text-sm">
            <FaInbox size={86} />
            Empty
          </div>
        ) : null}
      </div>
    </div>
  );
}
