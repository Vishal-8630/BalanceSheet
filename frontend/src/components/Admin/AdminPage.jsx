import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [adminLoginDetails, setAdminLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [adminSignupDetails, setAdminSignupDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isSeeAllAdminMode, setIsSeeAllAdminMode] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const getAllAdmins = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/get-all-admins"
      );
      setAllAdmins(result.data);
      setIsLoginMode(result.data.length > 0);
    } catch (error) {
      console.error("Error fetching all admins", error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLoginMode) {
      setAdminLoginDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setAdminSignupDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let axiosUrl = isLoginMode
      ? "http://localhost:5000/api/login-admin"
      : "http://localhost:5000/api/signup-admin";
    let formData = isLoginMode ? adminLoginDetails : adminSignupDetails;
    let response;
    try {
      response = await axios.post(axiosUrl, formData);
      console.log(response.data);
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in admin mode", error);
    }
  };

  const adminLoginForm = (
    <div>
      <h1 className="header">Enter Admin Details</h1>
      <form className="form-group" onSubmit={handleFormSubmit}>
        <div className="form__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={adminLoginDetails.username}
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
            value={adminLoginDetails.password}
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

  const adminSignupForm = (
    <div>
      <h1 className="header">Create New Admin</h1>
      <form className="form-group" onSubmit={handleFormSubmit}>
        <div className="form__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={adminSignupDetails.username}
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
            value={adminSignupDetails.password}
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
            value={adminSignupDetails.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__buttons">
          <button type="submit" className="button">
            Create
          </button>
        </div>
      </form>
    </div>
  );

  const adminList = (
    <div>
      {allAdmins.length === 0 ? (
        <h3>No Admin Found</h3>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAdmins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.username}</td>
                <td>
                    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div>
      <Link to="/">Home</Link>
      <button
        className="btn"
        onClick={() => setIsSeeAllAdminMode((prev) => !prev)}
      >
        {isSeeAllAdminMode ? "Hide Admins" : "All Admins"}
      </button>
      {!isSeeAllAdminMode && (
        <button className="btn" onClick={() => setIsLoginMode((prev) => !prev)}>
          {isLoginMode ? "Create Admin" : "Login Admin"}
        </button>
      )}
      {isSeeAllAdminMode
        ? adminList
        : isLoginMode
        ? adminLoginForm
        : adminSignupForm}
    </div>
  );
};

export default AdminPage;
