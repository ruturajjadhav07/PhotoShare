import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const UserEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state; // Get user data from state

  const [data, setData] = useState({
    id: user.id || "",
    username: user.username || "",
    password: user.password || "",
    email: user.email || "",
    contact: user.contact || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const back = (e) => {
    e.preventDefault();
    navigate("/posts");
  };

  const Submit = (e) => {
    e.preventDefault();

    const userData = {
      id: data.id,
      username: data.username,
      password: data.password,
      email: data.email,
      contact: data.contact,
    };

    Server.post("/edituser", userData)
      .then((response) => {
        toast.success("Saved Successfully");

        setTimeout(() => {
          alert("Logging out");
          navigate("/"); // Redirect to login page
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.response?.data || "Unexpected Error");
      });
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <form className="border p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center">Edit Details</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="form-control my-2"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="password"
            id="password"
            className="form-control my-2"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="email"
            id="email"
            className="form-control my-2"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="contact no"
            id="contact"
            className="form-control my-2"
            value={data.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100 my-2" onClick={Submit}>
          Submit
        </button>
        <button className="btn btn-secondary w-100" onClick={back}>
          Back
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserEdit;
