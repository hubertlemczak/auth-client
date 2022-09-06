import { useEffect, useState } from 'react';

export const useLocalStorage = (str, initialValue) => {
  const [value, setValue] = useState(() => {
    if (localStorage.getItem(str)) {
      return JSON.parse(localStorage.getItem(str));
    }

    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(str, JSON.stringify(value));
  }, [str, value]);
  return [value, setValue];
};
