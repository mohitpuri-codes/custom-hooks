function useLocalStorage(key: string, initialValue: string) {
  // useffect window

  function setValue() {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  function removeValue() {
    return localStorage.removeItem(key);
  }

  const value = localStorage.getItem(key);
  let computedvalue;
  if (value) {
    computedvalue = JSON.parse(value);
  } else {
    computedvalue = null;
  }

  return {
    value: computedvalue,
    setValue,
    removeValue,
  };
}

export default useLocalStorage;

// const [value, setValue, removeValue] = useLocalStorage('test-key', 0)
/*
arguments
1st key
2nd initialValue
*/
/*
what is returns
 value => actual value in local storage
 setValue => function to setValue in local storage
 removeValue => function to remove value from local storage 
*/
