import { useEffect, useRef, useState } from "react";

function usePreviousValue<T>(defaultValue: T) {
  const [state, setState] = useState(defaultValue);

  const pvsValue = useRef(state);
  useEffect(() => {
    pvsValue.current = state;
  }, [state]);
  return { pvsValue, state, setState };
}

export default usePreviousValue;
