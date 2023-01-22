import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../App/features/search/searchSlice";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
      dispatch(setSearch(value));
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay, dispatch]);

  return debouncedValue;
}
