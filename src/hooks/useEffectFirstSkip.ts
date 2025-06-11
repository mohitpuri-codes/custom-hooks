import { useEffect, useRef } from "react";

function useEffectFirstSkip(fn: () => void, arr: Array<any>) {
  const ref = useRef(0);

  useEffect(() => {
    ref.current += 1;
    // console.log(ref.current);
    //
    if (ref.current >= 2) {
      fn();
    }
  }, [fn, arr]);
}

export default useEffectFirstSkip;
