import React from 'react';
import CounterDisplay from './components/counterDisplay';
import CounterIncrementer from './components/counterIncrementer';
import LoggedInUserDisplay from './components/loggedInUserDisplay';
import LoggedInUserSetter from './components/loggedInUserSetter';

const MakeSharedStateHookExample = () => {
  return (
    <div>
      <CounterDisplay />
      <CounterDisplay />
      <CounterIncrementer />
      <div>&nbsp;</div>
      <LoggedInUserDisplay />
      <LoggedInUserSetter />
    </div>
  );
};

export default MakeSharedStateHookExample;
