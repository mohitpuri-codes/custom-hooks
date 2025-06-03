// hook that provide reset function, using which we can reset state to initial state.
// const [state, setState, reset] = useResetState(initialValue);

import { useState } from "react";

function useResetState(initialValue: string) {
  const [state, setState] = useState(initialValue);
  const init = initialValue;

  function reset() {
    setState(init);
  }
  return {
    state,
    setState,
    reset,
  };
}

export default useResetState;
