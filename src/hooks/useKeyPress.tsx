// hooks that returns true or false if given key is pressed.
// it can be any key from keybord.
// const isEscPressed = useKeyPress('Escape');

import { useEffect, useState } from "react";

function useKeyPress(defaultValue: string) {
  const [isValid, setIsValid] = useState<boolean>(false);

  function checkValidKeyPress(e: KeyboardEvent) {
    if (e.key === defaultValue) {
      setIsValid(true);
    } else setIsValid(false);
  }

  useEffect(() => {
    window.addEventListener("keypress", checkValidKeyPress);
  }, [defaultValue]);

  return { isValid };
}

export default useKeyPress;
