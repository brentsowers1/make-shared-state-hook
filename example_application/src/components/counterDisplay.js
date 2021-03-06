import React from 'react';
import { useCounter } from '../lib/sharedState';

const CounterDisplay = () => {
  const [counter] = useCounter();
  return (
    <div>
      Value in counter display component:&nbsp;{counter}
    </div>
  );
};

export default CounterDisplay;
