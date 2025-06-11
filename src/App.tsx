import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import useToggleValue from "./hooks/useToggleValue";
import useIsOffline from "./hooks/useIsOffline";
import useKeyPress from "./hooks/useKeyPress";
import useIdle from "./hooks/useIdle";
import { useFullscreen } from "scryn";
import usePreviousValue from "./hooks/usePreviousValue";
import useResetState from "./hooks/useResetState";
// import useUndoRedo from "./hooks/useUndoRedo";
import useClipboard from "./hooks/useClipboard";
import useLongPress from "./hooks/useLongPress";
import useEffectFirstSkip from "./hooks/useEffectFirstSkip";
import useLongPressToAccelarate from "./hooks/useLongPressToAccelarate";
import useSkipEffect from "./hooks/useSkipEffect";

function App() {
  const { onmousedown: acclearateDown, onmouseup: acclearateUp } =
    useLongPressToAccelarate(
      () => console.log("long press to acclearate"),
      2000
    );
  const { onmousedown, onmouseup } = useLongPress(() =>
    alert("long press event")
  );
  const { copy } = useClipboard();
  const { toggle, value } = useToggleValue(true);
  const {
    value: localStorageVal,
    removeValue,
    setValue,
  } = useLocalStorage("token", "hi");
  // const { redo, state, undo, setState } = useUndoRedo("hi");
  const { isValid } = useKeyPress("Enter");
  const {
    reset,
    setState: setResetState,
    state: resetState,
  } = useResetState("pc");
  const { isOnline } = useIsOffline();
  const { pvsValue, setState, state } = usePreviousValue<Array<number>>([1, 2]);
  const isIdle = useIdle(5000);
  const ref = useFullscreen<HTMLButtonElement>();
  useEffectFirstSkip(() => {
    // console.log("hi");
  }, []);

  useSkipEffect(
    (stop) => {
      console.log("function execution");
      if (state.length === 5) stop();
    },
    [pvsValue]
  );
  return (
    <section>
      <div>
        {value ? "True" : "False"}
        <button onClick={toggle}>Toggle the Value</button>
      </div>
      <div>
        <p>Refresh to view from localstorage: {localStorageVal}</p>
        <button onClick={setValue}>set to localStoarge</button>
        <button onClick={removeValue}>remove from localStoarge</button>
      </div>
      {/* useundoredo */}
      {/* <div>
        {state}
        <button onClick={redo}>redo :{state}</button>
        <button onClick={undo}>undo :{state}</button>
        <button onClick={() => setState("bye")}>bye :{state}</button>
      </div> */}

      {/* useKeyPress */}
      <div>
        <p>{isValid ? "true" : "false"}</p>
        <button ref={ref}>Press Enter key to toggle</button>
      </div>

      {/* useResetState */}
      <div>
        current state: {resetState}
        <button onClick={() => setResetState("mouse")}>
          Click here to change the state value to mouse
        </button>
        <button onClick={reset}>Click here to reset to original state</button>
      </div>

      <div>
        Are you online?
        {isOnline ? "online" : "disconnected"}
      </div>

      {/* pvs value */}

      <div>
        <h2>usePrevious hook</h2>
        Current Value = {state.length}
        <p>
          Previos Value = {pvsValue.current.length ?? pvsValue.current.length}
        </p>
        <button
          onClick={() =>
            setState((prev) => {
              const arr = [...prev, 1];
              return arr;
            })
          }
        >
          Add 1
        </button>
      </div>

      {/* useIdle */}
      <div>
        {" "}
        <h2> useIdle hook</h2> Stay AFK from mouse and keyboard to show
        idle/active: <span>{isIdle ? "idle" : "active"}</span>
      </div>

      <div>
        <h2>useClipboard hook</h2>
        <button onClick={() => copy("copy")}>Copy</button>
        <input type="text" placeholder="paste here" />
      </div>

      <div>
        <h2>Long press hook</h2>
        <button onMouseDown={onmousedown} onMouseUp={onmouseup}>
          long press
        </button>
      </div>
      <div>
        <h2>Long press to acclearate hook</h2>
        <button onMouseDown={acclearateDown} onMouseUp={acclearateUp}>
          long press
        </button>
      </div>
    </section>
  );
}

export default App;
