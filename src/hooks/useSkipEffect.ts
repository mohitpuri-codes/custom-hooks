import { useCallback, useEffect, useMemo, useRef } from "react";

function useSkipEffect(fn: (stop: () => void) => void, arr: Array<any>) {
  const str = arr.join(",");
  const strRef = useRef(str);
  const controller = useMemo(() => new AbortController(), []);
  const signal = controller.signal;
  const stop = useCallback(() => {
    controller.abort();
  }, [controller]);
  useEffect(() => {
    if (!signal.aborted) {
      fn(stop);
    }
  }, [strRef, fn, signal.aborted, stop]);
}

export default useSkipEffect;

// useSkipEffect hook
// use case
// useSkipEffect((stop)=>{
// here there will be my logic
// whenever I call stop logic here, it will stop the execution of hook. that means further change in dependencies will not execute my function logic
//   },[...dependencies])

//   // ex.
//   useSkipEffect((stop)=>{
//   if(a){
//   setState(...)
//   stop();
//   }
//   },[a,b,c])
