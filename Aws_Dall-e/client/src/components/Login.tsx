// src/pages/Register.tsx
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../auth/auth';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if ( !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {

      await signIn({
            username: email,
            password
          })

      // setSuccess("Login successful!");
     //  <Navigate to="/dashboard" replace={true} />
     
     const loginData = {email,password}
     const response: AxiosResponse = await axios.post('http://localhost:3000/login', loginData);
     const userId = response.data.userId
     navigate(`/dashboard/${userId}`, {replace: true})
    } catch (error) {
        clearForm();
        if (error instanceof Error) setError(error.message);
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h2 className="text-center">Login</h2>
            {error && (
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseError}></button>
              </div>
            )}
            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSuccess("")}></button>
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">
                Email address <sup>*</sup>
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="mt-3 text-center">
              <p>did not Registerd <a href="/">Sign up</a></p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
