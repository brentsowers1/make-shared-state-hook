/**
 * This is the setter function that gets returned from makeSharedStateHook,
 * bound to the instance of the store containing the data.
 * It's used like the setter function returned from useState - you can either
 * call it with a new value, or a setter function that takes the old value
 * as a parameter and returns the new value.
 * This can't use arrow syntax because .bind is called on this later
 * @param newValueOrSetterFunction new state value, or a setter function that
 *        takes the old value as input and returns the new value.
 */
function setCustomHookState(newValueOrSetterFunction) {
  let newValue = newValueOrSetterFunction;
  if (typeof newValueOrSetterFunction === 'function') {
    newValue = newValueOrSetterFunction(this.state);
  }
  if (newValue !== this.state) {
    this.state = newValue;
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }
}

/**
 * This is what ends up getting called when you call the return value of
 * makeSharedStateHook in a component, bound to the current instance of the
 * store containing the data.
 * This can't use arrow syntax because .bind is called on this later.
 * @param React pass in the instance of React from the application
 * @returns an array - first element is the current state value, second value
 *          is a function to call to set the value (see setCustomHookState
 *          above for what this setter function is)
 */
function useCustomHook(React) {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    // Called just after component mount
    this.listeners.push(newListener);
    return () => {
      // Called just before the component unmount
      this.listeners = this.listeners.filter(listener => listener !== newListener);
    };
  }, []);
  return [this.state, this.setState];
}

/**
 * Creates a new shared state hook that you can use in many different
 * components. Only call this once in your application for each piece
 * of data.
 * Example - put the following in a separate file outside of a component:
 *   const useCounter = useSharedStateHook(0);
 *   export default useCounter;
 *
 *  Then in your component:
 *    import useCounter from './useCounter';
 *    ....
 *    const Counter = () => {
 *      const [counter, setCounter] = useCounter();
 *      return <div>Counter = {counter}</div>;
 *    };
 *
 *  counter and setCounter will work just like state values! You'll get a new
 *  value any time any other component in the application calls setCounter.
 *
 * @param React pass in the instance of React from your application, this is
 *              necessary so this library does not use a different instance
 *              of React.
 * @param initialValue the initial value to initialize to.
 * @returns returns a function that can be called inside of a component's
 *          render method. When this return value is called it will return an
 *          array of the current value of the state, and a function to set the
 *          state value, just like useState.
 */
function makeSharedStateHook(React, initialValue) {
  const store = { state: initialValue, listeners: [] };
  store.setState = setCustomHookState.bind(store);
  return useCustomHook.bind(store, React);
};

module.exports = makeSharedStateHook;
