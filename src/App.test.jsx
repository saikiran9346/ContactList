import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function addContact(name, phone, email) {
  fireEvent.click(screen.getByText(/add contact/i));
  const nameInput = screen.getByPlaceholderText(/full name|john doe/i);
  const phoneInput = screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i);
  const emailInput = screen.getByPlaceholderText(/john@example.com/i);
  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(phoneInput, { target: { value: phone } });
  fireEvent.change(emailInput, { target: { value: email } });
  const addButtons = screen.getAllByText(/add contact/i);
  fireEvent.click(addButtons[addButtons.length - 1]);
}

describe('App core flows', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('search filters by name, phone, and email', () => {
    render(<App />);
    const search = screen.getByPlaceholderText(/search by name, phone, or email/i);

    fireEvent.change(search, { target: { value: 'alice' } });
    expect(screen.getByText(/alice johnson/i)).toBeInTheDocument();

    fireEvent.change(search, { target: { value: '345-6789' } });
    expect(screen.getByText(/carol williams/i)).toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'bob.smith@' } });
    expect(screen.getByText(/bob smith/i)).toBeInTheDocument();
  });

  test('can add, edit, sort, and delete contacts', () => {
    render(<App />);

    // Add
    addContact('Zed Z', '+1 (555) 999-1111', 'zed@example.com');
    expect(screen.getByText(/zed z/i)).toBeInTheDocument();

    // Sort by name desc
    fireEvent.change(screen.getByLabelText(/sort by/i), { target: { value: 'name' } });
    fireEvent.click(screen.getByLabelText(/sort descending/i));

    // Edit: click first Zed card's edit, change phone
    const editButtons = screen.getAllByLabelText(/edit contact/i);
    fireEvent.click(editButtons[0]);
    const phoneInputs = screen.getAllByPlaceholderText(/^phone$/i);
    fireEvent.change(phoneInputs[0], { target: { value: '+1 (555) 000-2222' } });
    fireEvent.click(screen.getAllByLabelText(/save/i)[0]);
    expect(screen.getByText(/\+1 \(555\) 000-2222/)).toBeInTheDocument();

    // Delete
    const deleteButtons = screen.getAllByLabelText(/delete contact/i);
    fireEvent.click(deleteButtons[0]);
  });
});