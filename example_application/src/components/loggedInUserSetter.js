import React from 'react';
import { useLoggedInUser } from '../lib/sharedState';

const LoggedInUserSetter = () => {
  const [, setUser] = useLoggedInUser();
  return (
    <div>
      <label htmlFor="usernameInput">Set logged in user name:</label>&nbsp;
      <input
        id="usernameInput"
        type="text"
        onChange={event => setUser(event.target.value)}
      />
    </div>
  );
};

export default LoggedInUserSetter;
