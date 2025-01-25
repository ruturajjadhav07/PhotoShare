import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserDelete = () => {
  const [password, setPassword] = useState("");
  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();

  const userDelete = (e) => {
    e.preventDefault();

    // Basic validation: check if password is entered
    if (!password) {
      toast.error("Please enter the password!");
      return;
    }

    // Send the delete request to the server
    Server.delete(`/delete/${userId}?password=${password}`)
      .then((response) => {
        toast.success("Account successfully deleted!");
        navigate("/"); // Redirect to the homepage or login page
      })
      .catch((e) => {
        toast.error(e.response?.data || "An error occurred while deleting the account.");
      });
  };

  const back = (e) => {
    e.preventDefault();
    navigate("/posts");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="text-center text-danger mb-4">
            Please think again 🥹
            <br />
            We are gonna miss you
          </h2>
          <form onSubmit={userDelete}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter password to delete Account"
                // required
                className="form-control my-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="btn btn-danger w-100 my-2" type="submit">
              Delete Account
            </button>
            <button className="btn btn-secondary w-100 my-2" onClick={back}>
              Back
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDelete;
