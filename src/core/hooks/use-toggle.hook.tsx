import { useState } from "react";

export function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
}
