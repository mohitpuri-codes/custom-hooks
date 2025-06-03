import { useEffect, useState } from "react";

function useIdle(timer: number) {
  const [isIdle, setIsIdle] = useState(false);
  let timeout: number;
  const resetTimer = () => {
    clearTimeout(timeout);
    setIsIdle(false);
    timeout = setTimeout(() => setIsIdle(true), timer);
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("mouseover", resetTimer);
      window.addEventListener("keypress", resetTimer);
    }, timer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [resetTimer, timer]);

  return isIdle;
}

export default useIdle;
