import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    const loginData = { username, password };

    try {
      const response = await axios.post('your-backend-endpoint.com', loginData);
      console.log('Login successful:', response.data);
      clearForm();
    } catch (err) {
      console.error('Login error:', err);
      setError("An error occurred during login. Please try again.");
    }
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Login</h2>
          {error && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseError}></button>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">
              Username <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mt-3">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
