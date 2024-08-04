// src/pages/Register.tsx
import React, { useState } from 'react';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../auth/auth';
import { useNavigate } from 'react-router-dom';


const Confirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setconfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !confirmationCode) {
      setError("All fields are required.");
      return;
    }

    try {
      // Confirm user Information
     await confirmSignUp({
        username: email,
        confirmationCode
      });
          
      navigate('/login', {replace: true})
    } catch (error) {
        if (error instanceof Error) setError(error.message);
        clearForm();
    }
  };

  const passwordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email field is required.");
      return;
    }

    // get the confirmation code again
    try {
      await resendSignUpCode({
        username: email
      });   
      setSuccess("The code has been sent to your email");
    } catch (error) {
        if (error instanceof Error) setError(error.message);
    }
    
    clearForm();

  };

  const clearForm = () => {
    setEmail("");
    setconfirmationCode("");
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h2 className="text-center">Confirm Your Sign Up</h2>
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
              Code <sup>*</sup>
              </label>
              <input
                type="number"
                className="form-control"
                value={confirmationCode}
                onChange={(e) => setconfirmationCode(e.target.value)}
                placeholder="confirmationCode"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Confirm account
            </button>
          </fieldset>
        </form>
        <form onSubmit={passwordRecovery}>
            <p>
              you did not got an Email or you wirte it wrong <button type="submit" className="btn btn-link"> click hier</button>
            </p>
            </form>
      </div>
    </div>
  );
};

export default Confirm;
