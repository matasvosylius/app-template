import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail === '' || validateEmail(inputEmail)) {
      setError('');
    } else {
      setError('Invalid email address');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (validateEmail(email)) {
      setSubmitted(true);
      setError('');
    } else {
      setError('Please enter a valid email address');
      setSubmitted(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Email Validation</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            style={{ padding: '8px', fontSize: '16px' }}
          />
          <button
            type="submit"
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {submitted && !error && (
          <p style={{ color: 'green' }}>Email submitted successfully!</p>
        )}
      </header>
    </div>
  );
}

export default App;