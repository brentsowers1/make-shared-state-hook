import React from 'react';
import { useLoggedInUser } from '../lib/sharedState';

const LoggedInUserDisplay = () => {
  const [user] = useLoggedInUser();
  return (
    <div>
      Logged in user value in display component:&nbsp;
      <span data-testid="user">{user}</span>
    </div>
  );
};

export default LoggedInUserDisplay;
