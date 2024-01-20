import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  message: string;
  type: "success" | "error" | "warn" | "info";
  positition?:
    | "TOP_CENTER"
    | "TOP_LEFT"
    | "TOP_RIGHT"
    | "BOTTOM_LEFT"
    | "BOTTOM_CENTER"
    | "BOTTOM_RIGHT";
  className?: string;
  icon?: React.ReactNode;
};

export function ToastComponent({
  message,
  type,
  positition = "BOTTOM_RIGHT",
  className,
  icon,
}: Props) {
  const notify = () => {
    toast[type](message, {
      position: toast.POSITION[positition],
      className: className ?? "",
      icon: icon ?? null,
      closeButton: <IoMdClose color="#fff" size={20} />,
    });
  };

  useEffect(() => {
    notify();
  }, [message]);

  return <ToastContainer />;
}
