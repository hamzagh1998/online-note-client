type Props = {
  isChecked: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SwitchComponent({ isChecked, onChange }: Props) {
  const toggleSwitch = () => {
    onChange(!isChecked);
  };

  return (
    <label className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <div
          className={`toggle__line relative h-6 w-10 rounded-full ${
            isChecked ? "bg-emerald-200" : "bg-gray-200"
          }  shadow-inner`}
        >
          <div
            className={`toggle__dot absolute h-6 w-6 transform rounded-full ${
              isChecked ? "bg-emerald-500" : "bg-gray-500"
            } shadow-md ${
              isChecked ? "translate-x-full" : "translate-x-0"
            } transition-transform duration-300 ease-in-out`}
          ></div>
        </div>
      </div>
    </label>
  );
}
