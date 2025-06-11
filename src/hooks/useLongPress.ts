import { useRef } from "react";

function useLongPress(fn: () => void) {
  const id = useRef<number | null>(null);
  function handleMouseDown() {
    id.current = window.setTimeout(() => {
      fn();
    }, 5000);
  }
  function handleMouseUp() {
    if (id.current) clearTimeout(id.current);
  }
  return {
    onmousedown: handleMouseDown,
    onmouseup: handleMouseUp,
  };
}

export default useLongPress;
