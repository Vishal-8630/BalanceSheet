import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Authentication = () => {
  const [formMode, setFormMode] = useState({
    isLoginMode: false,
    isVerificationMode: false,
    isRegisterMode: true,
  });
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [verificationDetails, setVerificationDetails] = useState({
    otp: "",
  });
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber;

  useEffect(() => {
    if (location.pathname === "/auth/login") {
      setFormMode({
        isLoginMode: true,
        isVerificationMode: false,
        isRegisterMode: false,
      });
    } else if (location.pathname === "/auth/register") {
      setFormMode({
        isLoginMode: false,
        isVerificationMode: false,
        isRegisterMode: true,
      });
    } else {
      setFormMode({
        isLoginMode: false,
        isVerificationMode: true,
        isRegisterMode: false,
      });
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
        navigate("/");
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (formMode.isLoginMode) {
      setLoginDetails((prev) => ({ ...prev, [name]: value }));
    } else if (formMode.isRegisterMode) {
      setRegisterDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setVerificationDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let axiosUrl = formMode.isLoginMode
      ? "http://localhost:5000/api/auth/login"
      : formMode.isVerificationMode
      ? "http://localhost:5000/api/auth/verify-otp"
      : "http://localhost:5000/api/auth/register";
    let formData = formMode.isLoginMode
      ? loginDetails
      : formMode.isVerificationMode
      ? verificationDetails
      : registerDetails;
    let response;

    try {
      if (formMode.isVerificationMode) {
        formData["phoneNumber"] = phoneNumber;
      }
      response = await axios.post(axiosUrl, formData);
      if (formMode.isRegisterMode) {
        navigate("/auth/verify-otp", {
          state: { phoneNumber: registerDetails.phoneNumber },
        });
      } else {
        login(response.data.user, response.data.token);
        navigate("/");
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error: ", error);
    }
  };

  const loginForm = (
    <div className="form__container">
      <h1 className="header">Login</h1>
      <form className="form-group" onSubmit={handleFormSubmit}>
        <div className="form__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={loginDetails.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__buttons">
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );

  const registerForm = (
    <div className="form__container">
      <h1 className="header">Register</h1>
      <form className="form-group" onSubmit={handleFormSubmit}>
        <div className="form__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={registerDetails.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__input">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={registerDetails.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={registerDetails.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerDetails.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__buttons">
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );

  let verificationForm = (
    <div>
      <div className="form__container">
        <h1 className="header">Enter OTP</h1>
        <form className="form-group" onSubmit={handleFormSubmit}>
          <div className="form__input">
            <label htmlFor="otp">OTP</label>
            <input
              type="number"
              id="otp"
              name="otp"
              placeholder="OTP"
              onChange={handleInputChange}
            />
          </div>
          <div className="form__butons">
            <button type="submit" className="button">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {formMode.isLoginMode
        ? loginForm
        : formMode.isRegisterMode
        ? registerForm
        : verificationForm}
    </div>
  );
};

export default Authentication;
