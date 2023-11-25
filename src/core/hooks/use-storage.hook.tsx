import {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T)
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T | (() => T)
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage
): [T, SetValue<T>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = storageObject.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }

    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      storageObject.removeItem(key);
    } else {
      storageObject.setItem(key, JSON.stringify(value));
    }
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
}
