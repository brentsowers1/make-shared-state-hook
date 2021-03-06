# make-shared-state-hook
Simple library for React 16.8+ to share state between components with useState like syntax

Simply add this as a dependency to your project, and you can create a piece of shared state with one line, and use it in a component with one line just like useState! 

# Why should I use this library?

This library is ideal for when you need to share some state data between components at different levels of the application. I wrote up https://www.brentsowers.com/2021/01/best-options-for-sharing-state-between.html to explain my analysis and journey of why I decided to write this library, and why I feel the other options out there (context, prop drilling, redux) aren't the best options. This library is simple enough to use as well that it can easily be mixed in with other approaches for sharing state like context and redux. You can easily start using this for new use cases without needing to refactor your previous approaches for sharing state. The syntax is easy enough to read that it won't be confusing to see this used along side other approaches.

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
  const [, setUser] = useLoggedInUser();
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

## Full application example
For a complete example in a full application, see [example_application](https://github.com/brentsowers1/make-shared-state-hook//tree/main/example_application/) - that is a full React application that you can run with:
```bash
cd example_application
npm install
npm start
```
This doesn't get packaged the `make-shared-state-hook` npm package, so if you want to see this you'll need to clone the github repo (https://github.com/brentsowers1/make-shared-state-hook).

# Best practices

* Only use this to store simple data and don't use it for large objects. Like useState it's not real smart - if you are storing a complex object with this, then a call to set the state, even if just one part of this complex object changed, will trigger all users of the state to update regardless of whether they need the specific part of the object you updated. There's no logic to only subscribe for updates to specific parts of the data you're storing.
* If you want to share a large complex object, decompose it in to smaller objects, or better yet, decompose in to many different pieces of simple non-object data. Just like useState - don't be tempted to make a big state object. Performance will be better breaking down in to smaller pieces, and your application will be less fragile because you'll only be using the specific pieces of data you need in each section, and the code won't be able to overwrite data that it never needs to use. Example:
```javascript
  // Bad approach:
  const formFiltersDefaults = {
    daysAgo: 30,
    searchTerm: '',
    status: 'NEW',
  };
  export const useFormFilters = makeSharedStateHook(React, formFiltersDefaults);

  // Good approach:
  export const useDaysAgoFilter = makeSharedStateHook(React, 30);
  export const useSearchTermFilter = makeSharedStateHook(React, '');
  export const useStatusFilter = makeSharedStateHook(React, 'NEW');
```
* Stick to local state with useState if you only need to share data between components that are 1 or 2 levels apart. Only use this on data that you really need to share at different component levels. Even though it's simple to make shared state with this, your application will get more complex once you start having different components using the same data. Use local state and pass the values down as props just one level if you can get away with it!
* If your component wants to do something other than render differently when the state changes somewhere else, like make an API call if the state value changes, call useEffect and specify the state value as a dependency. Your useEffect function will then get called immediately when the state value changes somewhere else. Example snippet using the example code from above:
```javascript
   const [user] = useLoggedInUser();
   // Remember that any useEffect will run the first time the component
   // renders - not just when the dependency value changes
   useEffect(() => console.log('user changed!'), [user]);
```
* If updating the data is complex, and you want some wrapper functions around updating the data, this library might not make sense for that use case. [use-global-hook](https://www.npmjs.com/package/use-global-hook), or using context and providing your custom function in the context object (described as option 2 in https://www.brentsowers.com/2021/01/best-options-for-sharing-state-between.html) might be a better fit for that use case.
* You don't need to go all in and use this library for all shared state. The usage of this is simple enough and easy enough to understand when looking at the code that you can definitely use this approach for your simple state sharing cases and use something more complex for the really complicated state sharing cases.

# Inspiration/credit

The library [use-global-hook](https://www.npmjs.com/package/use-global-hook) and the blog post describing the building of this (https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8) opened my eyes to the power of custom hooks. Check that library out - that may suit your needs better than this library.

Also while I was about to publish this library, I found [react-shared-state-maker](https://github.com/fixiabis/react-shared-state-maker). This library is very similar to what I wrote, so great minds must think alike! The reason I decided to still write my own library is that react-shared-state-maker has some dependencies, but I wanted a library that had no dependencies at all other than a peer dependency on React, I don't want anyone to have to deal with a different version of React in their application than what this library has.
