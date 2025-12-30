import React from 'react';
import { render, screen } from '@testing-library/react';
import MakeSharedStateHookExample from './MakeSharedStateHookExample.jsx';
import userEvent from '@testing-library/user-event';

test('tests counter', async () => {
  const user = userEvent.setup();
  render(React.createElement(MakeSharedStateHookExample));
  expect(screen.getByText(/counter value in incrementer component: 0/i)).toBeInTheDocument();
  expect(screen.getAllByText(/value in counter display component: 0/i)).toHaveLength(2);
  const incrementButton = screen.getByText(/Increment Counter/i);
  await user.click(incrementButton);
  expect(await screen.findByText(/counter value in incrementer component: 1/i)).toBeInTheDocument();
  expect(await screen.findAllByText(/value in counter display component: 1/i)).toHaveLength(2);
  await user.click(incrementButton);
  expect(await screen.findByText(/counter value in incrementer component: 2/i)).toBeInTheDocument();
  expect(await screen.findAllByText(/value in counter display component: 2/i)).toHaveLength(2);  

});

test('tests username', async () => {
  const user = userEvent.setup();
  render(React.createElement(MakeSharedStateHookExample));
  expect(screen.getByTestId('user')).toBeEmptyDOMElement();
  await user.type(screen.getByLabelText('Set logged in user name:'), 'I am a user');
  expect(await screen.findByTestId('user')).toHaveTextContent('I am a user');
  await user.clear(screen.getByLabelText('Set logged in user name:'));
  expect(screen.getByTestId('user')).toBeEmptyDOMElement();
});
