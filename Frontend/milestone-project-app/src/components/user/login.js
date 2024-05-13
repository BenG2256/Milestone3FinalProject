import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../../contexts/CurrentUser';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if admin login
  const navigation = useNavigate();
  const { setCurrentUser } = useContext(CurrentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdmin ? 'login/admin' : 'login'; // Choose endpoint based on isAdmin state
      const response = await fetch(`http://localhost:3001/authentication/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Invalid email or password');
      } else {
        setCurrentUser(data.admin || data.user); // Set user or admin data based on response
        localStorage.setItem('token', data.token);
        navigation(`../`);
        console.log('Login successful', data.admin || data.user);
        console.log('Token:', data.token);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form id="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Admin login
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;