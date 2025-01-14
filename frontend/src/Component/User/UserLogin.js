import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLogin = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((u) => ({ ...u, [id]: value }));
  };

  let navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    Server.post("/login", user)
      .then((response) => {
        // setUser({ username: "", password: "" });
        const loggedUserId = response.data;
        localStorage.setItem("userId", loggedUserId.id);
        const loggedUserusername = response.data;
        localStorage.setItem("username", loggedUserusername.username);
        toast.success("Login successful!");
        setInterval(() => {
          navigate("/posts"); // Redirect to main page after 1 seconds
        }, 2000);
      })
      .catch((e) => {
        const errorMessage =
          e.response && e.response.data
            ? e.response.data
            : "An unexpected error occurred.";
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div
      className="container mt-5 d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="row">
        <form className="border rounded shadow-lg p-4">
          <h2 className="text-center text-muted">Login</h2>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              id="username"
              onChange={handleChange}
              value={user.username}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              id="password"
              onChange={handleChange}
              value={user.password}
              required
            />
          </div>
          <button className="btn btn-primary mt-3 w-100" onClick={Submit}>
            Login
          </button>
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
