import { useRef } from "react";

function useLongPressToAccelarate(fn: () => void, timer: number) {
  const idRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(timer);
  const count = useRef(0);

  function handleInterval(timer: number) {
    idRef.current = setInterval(() => {
      count.current = count.current + 1;
      console.log("calling interval after", timer);
      fn();
      if (count.current % 5 === 0) {
        clearInterval(idRef.current!);
        timeRef.current = timeRef.current / 2;

        handleInterval(timeRef.current);
      }
    }, timer);
  }
  function handleMouseDown() {
    handleInterval(timeRef.current);
  }
  function handleMouseUp() {
    // cleanup
    if (idRef.current) {
      clearInterval(idRef.current);
      idRef.current = null;
      count.current = 0;
      timeRef.current = timer;
    }
  }
  return {
    onmousedown: handleMouseDown,
    onmouseup: handleMouseUp,
  };
}

export default useLongPressToAccelarate;
