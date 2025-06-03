import { useState } from "react";

function useUndoRedo(value: any) {
  const [pvsValue, setPvsValue] = useState(null);
  const [newValue, setNewValue] = useState(value);

  function undo() {
    const finalNewValue = newValue;
    const finalPvsValue = pvsValue;
    setNewValue(finalPvsValue);
    setPvsValue(finalNewValue);
  }

  // ref maintain index
  // no state
  function redo() {
    const finalNewValue = pvsValue;
    const finalPvsValue = newValue;
    setNewValue(finalNewValue);
    setPvsValue(finalPvsValue);
  }
  return {
    undo,
    redo,
    state: newValue,
    setState: setNewValue,
  };
}

export default useUndoRedo;
