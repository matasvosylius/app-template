import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders email input and submit button', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter your email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  expect(inputElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(inputElement.value).toBe(''); // Initial state
});

test('does not show error or success message initially', () => {
  render(<App />);

  const errorMessage = screen.queryByText(/Invalid email address/i);
  const successMessage = screen.queryByText(/Email submitted successfully!/i);

  expect(errorMessage).toBeNull();
  expect(successMessage).toBeNull();
});

test('shows error message for invalid email on change', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter your email/i);
  fireEvent.change(inputElement, { target: { value: 'invalid-email' } });

  const errorMessage = screen.getByText(/Invalid email address/i);
  expect(errorMessage).toBeInTheDocument();
});

test('does not show error message for valid email on change', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter your email/i);
  fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

  const errorMessage = screen.queryByText(/Invalid email address/i);
  expect(errorMessage).toBeNull();
});

test('shows error message for invalid email on submit', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter your email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/Please enter a valid email address/i);
  expect(errorMessage).toBeInTheDocument();
});