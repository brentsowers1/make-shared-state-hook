import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MakeSharedStateHookExample from './MakeSharedStateHookExample';
import userEvent from '@testing-library/user-event';

test('tests counter', async () => {
  render(<MakeSharedStateHookExample />);
  expect(screen.getByText(/counter value in incrementer component: 0/i)).toBeInTheDocument();
  expect(screen.getAllByText(/value in counter display component: 0/i)).toHaveLength(2);
  const incrementButton = screen.getByText(/Increment Counter/i);
  userEvent.click(incrementButton);
  expect(screen.getByText(/counter value in incrementer component: 1/i)).toBeInTheDocument();
  expect(screen.getAllByText(/value in counter display component: 1/i)).toHaveLength(2);
  userEvent.click(incrementButton);
  expect(screen.getByText(/counter value in incrementer component: 2/i)).toBeInTheDocument();
  expect(screen.getAllByText(/value in counter display component: 2/i)).toHaveLength(2);  

});

test('tests username', async () => {
  render(<MakeSharedStateHookExample />);
  expect(screen.getByTestId('user')).toBeEmptyDOMElement();
  userEvent.type(screen.getByLabelText('Set logged in user name:'), 'I am a user');
  expect(screen.getByTestId('user')).toHaveTextContent('I am a user');
  userEvent.clear(screen.getByLabelText('Set logged in user name:'));
  expect(screen.getByTestId('user')).toBeEmptyDOMElement();
});
