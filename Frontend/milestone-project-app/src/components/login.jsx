import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Invalid email or password');
      } else {
        // setCurrentUser(data.user)
        localStorage.setItem('token', data.token)
        console.log('Login successful');
      }
      console.log('Login successful');
      //insert reroute to the homepage here
      navigate('/');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 id='login-header'>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form id='form-container' onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='login-label'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='login-label'>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
