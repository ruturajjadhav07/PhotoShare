import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";

const UserSignup = () => {
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    email: "",
    contact: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserRegister((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const reset = () => {
    setUserRegister({ username: "", password: "", email: "", contact: "" });
  };

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    Server.post("/register", userRegister)
      .then((response) => {
        setUserRegister({ username: "", password: "", email: "", contact: "" });
        toast.success("User registered successfully!");
        // console.log(response.data);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setError(e.response.data);
          toast.error(e.response.data);
        } else {
          const unexpectedError = "An unexpected error occurred";
          setError(unexpectedError);
          toast.error(unexpectedError);
        }
        // console.log(e.message);
      });
  };

  return (
    <div>
      <div
        className=" container d-flex justify-content-center align-items-center"
        style={{ minHeight: "88vh" }}
      >
        <div className="row">
          <form className="border rounded shadow-lg p-4">
            <h2 className="text-center text-muted mb-2">User Registration</h2>
            <div className="form-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                id="username"
                onChange={handleChange}
                value={userRegister.username}
                required
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                id="password"
                onChange={handleChange}
                value={userRegister.password}
                required
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="email"
                className="form-control"
                placeholder="abc@gmail.com"
                id="email"
                onChange={handleChange}
                value={userRegister.email}
                required
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="contact"
                className="form-control"
                placeholder="99999xxxxx"
                id="contact"
                onChange={handleChange}
                value={userRegister.contact}
                required
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleClick}>
              Submit
            </button>
            <button className="btn btn-secondary mt-2 mx-2" onClick={reset}>
              Reset
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
      {<Footer />}
    </div>
  );
};

export default UserSignup;
