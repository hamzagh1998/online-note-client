import { ReactElement } from "react";

type InputType = "text" | "email" | "password";
type IconPosition = "left" | "right";
type AutoComplete = "on" | "off";

interface IProps {
  type: InputType;
  value: string;
  setValue: (e: string) => void;
  label?: string;
  autocomplete?: AutoComplete;
  placeholder?: string;
  error?: string;
  icon?: ReactElement;
  iconPosition?: IconPosition;
  isIconClickable?: boolean;
}

export function CustomInput({
  type = "text",
  value = "",
  setValue,
  label = "",
  autocomplete = "off",
  placeholder = "",
  error = "",
  icon,
  iconPosition = "right",
  isIconClickable = true,
}: IProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={label} className="float-left mb-2">
        {label}
      </label>
      <div className="relative w-full flex items-center">
        <input
          id={label}
          className={`w-full ${
            icon
              ? iconPosition === "right"
                ? "p-4 pr-10"
                : "p-4 pl-10"
              : "p-4"
          } h-12 rounded-lg
            border-2 ${error.length ? "border-skin-error" : "border-gray-400"}
            focus:border-skin-accent focus:outline-none
            bg-opacity-50 focus:bg-opacity-30
            bg-skin-fill-primary
          `}
          autoComplete={autocomplete}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {icon && (
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isIconClickable ? "cursor-pointer" : "pointer-events-none"
            } ${iconPosition === "left" ? "left-2" : "right-2"} `}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
