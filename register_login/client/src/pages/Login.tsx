import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
    }

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log('Login successful:', response.data);
      const userId = response.data.userId;
      console.log(userId)
      navigate(`/dashboard/${userId}`);
      clearForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  const clearForm = () => {
    setEmail("");
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
              Email <sup>*</sup>
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
