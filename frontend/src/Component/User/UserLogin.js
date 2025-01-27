import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

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
        const loggedUserId = response.data;
        localStorage.setItem("userId", loggedUserId.id);
        const loggedUserusername = response.data;
        localStorage.setItem("username", loggedUserusername.username);
        toast.success("Login successful!");
        setInterval(() => {
          navigate("/posts"); // Redirect to main page after 1 second
        }, 1000);
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
    <div>
      <div
        className="container-fluid"
        style={{ backgroundColor: "aliceblue", minHeight: "88vh", paddingTop: "50px" }}
      >
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <div
            className="col-md-5 d-flex flex-column justify-content-center text-center text-md-left"
            style={{ height: "100%" }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#0d6efd",
                textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              Welcome to <b>PhotoShare</b>
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.5" }}>
              🌟 Discover. Share. Connect. 🌟
            </p>
            <p style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.5" }}>
              Unleash your creativity and showcase your world through stunning photography.
              ✨ Join a vibrant community of creators and photography enthusiasts.
            </p>
            <h3 style={{ fontSize: "1.5rem", color: "#0d6efd", fontWeight: "bold" }}>
              📸 Post your moments  
              💬 Engage with comments  
              ❤️ Spread love with likes
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.5" }}>
              Let your photos tell a story. Start sharing today!
            </p>
          </div>

          <div
            className="col-md-5 d-flex align-items-center justify-content-center"
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
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      {<Footer />}
    </div>
  );
};

export default UserLogin;
