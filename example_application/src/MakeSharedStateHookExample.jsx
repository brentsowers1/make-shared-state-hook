import React from 'react';
import CounterDisplay from './components/counterDisplay.jsx';
import CounterIncrementer from './components/counterIncrementer.jsx';
import LoggedInUserDisplay from './components/loggedInUserDisplay.jsx';
import LoggedInUserSetter from './components/loggedInUserSetter.jsx';

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
