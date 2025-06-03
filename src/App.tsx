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

function App() {
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
      <p>
        {" "}
        Stay AFK from mouse and keyboard to show idle/active:{" "}
        <p>{isIdle ? "idle" : "active"}</p>
      </p>

      <div>
        <button onClick={() => copy("copy")}>Copy</button>
        <input type="text" placeholder="paste here" />
      </div>
    </section>
  );
}

export default App;
