# make-shared-state-hook
Simple library for React 16.8+ to share state between components with useState like syntax

Simply add this as a dependency to your project, and you can create a piece of shared state with one line, and use it in a component with one line just like useState! 

# Example Usage

Make a file with your different instances of shared state. I'm calling this `sharedState.js`
```javascript
import React from 'react';
import { makeSharedStateHook } from 'make-shared-state-hook';

// Will keep track of a counter value across components
export const useCounter = makeSharedStateHook(React, 0);

// Will be used for the logged in username across components
export const useLoggedInUser = makeSharedStateHook(React, '');
```

Here's an example using both, `MakeSharedStateHookExample.js`:
```jsx
import React from 'react';
import { useCounter, useLoggedInUser } from './sharedState';

const CounterIncrementer = () => {
  // This looks like useState, but it's shared. So whenever any other component
  // calls setCounter, the counter value here will update. And calling
  // setCounter here will update any other component using it.
  const [counter, setCounter] = useCounter();
  return (
    <div>
      <div>Counter value in incrementer component: {counter}</div>
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

const CounterDisplay = () => {
  const [counter] = useCounter();
  return <div>Value in counter display component: {counter}</div>;
};

const LoggedInUserSetter = () => {
  const setUser = useLoggedInUser()[1];
  return (
    <div>
      Set logged in user name -&nbsp;
      <input type="text" onChange={event => setUser(event.target.value)} />
    </div>
  );
};

const LoggedInUserDisplay = () => {
  const [user] = useLoggedInUser();
  return <div>Logged in user value in display component: {user}</div>;
};

const MakeSharedStateHookExample = () => {
  return (
    <div>
      <CounterDisplay />
      <CounterIncrementer />
      <LoggedInUserDisplay />
      <LoggedInUserSetter />
    </div>
  );
};

export default MakeSharedStateHookExample;
```

That's it! No dealing with actions, dispatches, reducers, etc. Make as much data as you want with different calls to makeSharedStateHook - how you structure and use the data is up to you and each piece of data has no effect on any other data.

For a complete example in a full application, see https://github.com/brentsowers1/make-shared-state-hook-example.

# Why make this library?

I wrote up https://www.brentsowers.com/2021/01/best-options-for-sharing-state-between.html to explain my analysis and journey of why I decided to write this library, and why I feel the other options out there (context, prop drilling, redux) aren't the best options. 

# Inspiration/credit

The library [use-global-hook](https://www.npmjs.com/package/use-global-hook) and the blog post describing the building of this (https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8) opened my eyes to the power of custom hooks. Check that library out - that may suit your needs better than this library.

Also while I was about to publish this library, I found [react-shared-state-maker](https://github.com/fixiabis/react-shared-state-maker). This library is nearly identical to what I wrote, so great minds must think alike? The reason I decided to still write my own library is that react-shared-state-maker has some dependencies, but I wanted a library that had no dependencies at all other than a peer dependency on React, I don't want anyone to have to deal with a different version of React in their application than what this library has.
