import { useState } from "react";

function useToggleValue(value: boolean) {
  const [toggleValue, setToggleValue] = useState(value);
  const toggle = () => setToggleValue((prev) => !prev);
  return {
    value: toggleValue,
    toggle,
    setToggleValue,
  };
}

export default useToggleValue;

// const [value, toggle, setValue] = useToggle()
// value will be boolean
// toggle is a function that can toggle the value
// setValue is a function that will set value given by you
