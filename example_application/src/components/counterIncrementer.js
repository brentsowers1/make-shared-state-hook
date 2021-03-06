import React from 'react';
import { useCounter } from '../lib/sharedState';

const CounterIncrementer = () => {
  // This looks like useState, but it's shared. So whenever any other component
  // calls setCounter, the counter value here will update. And calling
  // setCounter here will update any other component using it.
  const [counter, setCounter] = useCounter();
  return (
    <div>
      <div>
        Counter value in incrementer component:&nbsp;{counter}
      </div>
      <div>
        <input
          type="submit"
          value="Increment Counter"
          onClick={() => setCounter(old => old + 1)}
         />
      </div>
    </div>
  );
};

export default CounterIncrementer;
