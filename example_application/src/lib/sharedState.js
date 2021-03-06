import React from 'react';
import { makeSharedStateHook } from 'make-shared-state-hook';

// Pass in an initial value and you'll get back a function that can be called
// from a component's render method to return the current value and a setter
// function, just like useState!
// You have to pass React as a parameter to avoid React version conflicts
export const useCounter = makeSharedStateHook(React, 0);

export const useLoggedInUser = makeSharedStateHook(React, '');
