// src/pages/Register.tsx
import React, { useState } from 'react';
import { signUp } from "aws-amplify/auth"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../auth/auth';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true 
});

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteSport,setFavoriteSport] = useState("")
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !favoriteSport) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {

    await signUp({
        username: email,
        password,
      });

      //setSuccess("Sign up successful! Please check your email for verification instructions.");
     //  <Navigate to="/confirm" replace={true} />
     navigate('/confirm', {replace: true})
     
     async function main() {
      const image = await openai.images.generate({ model: "dall-e-3", prompt: `${favoriteSport} flagg`, n:1});
      
      const url:string = image.data[0].url || ''

      const registerData = { firstName, lastName, email, password, favoriteSport:url};

      const response: AxiosResponse = await axios.post('http://localhost:3000/register', registerData);
      console.log(response.data);
    }

    main();

    } catch (error) {
        clearForm();
        if (error instanceof Error) setError(error.message);
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
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
            <h2 className="text-center">Sign Up</h2>
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
                First name <sup>*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last name <sup>*</sup></label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
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
            <div className="mb-3">
              <label className="form-label">
                favorite Sport <sup>*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                value={favoriteSport}
                onChange={(e) => setFavoriteSport(e.target.value)}
                placeholder="favorite Sport"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Create account
            </button>
            <div className="mt-3 text-center">
              <p>Already Registered? <a href="/login">Login</a></p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
