import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    Server.get(`/user/${userId}`)
      .then((response) => {
        setUserDetails([response.data]); // assuming the response contains the user object directly
      })
      .catch((e) => {
        toast.error(e.response.data);
        setError(e.response.data);
      });
  }, [userId]);

  const back = (e) => {
    e.preventDefault();
    navigate("/posts");
  };

  const editDetails = (e, user) => {
    e.preventDefault();
    navigate("/posts/userdetails/useredit", { state: { user } }); // Pass user data as state
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      {error && <div className="alert alert-danger">{error}</div>}
      {userDetails.map((user, id) => (
        <form
          className="border p-4"
          style={{ maxWidth: "400px", width: "100%" }}
          key={id}
        >
          <h1 className="text-center">User Details</h1>

          <label htmlFor="username">Username</label>
          <div className="form-group">
            <input
              className="form-control my-2"
              readOnly
              value={user.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control my-2"
              readOnly
              value={user.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control my-2" readOnly value={user.email} />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Phone no</label>
            <input
              className="form-control my-2"
              readOnly
              value={user.contact}
            />
          </div>
          <button
            className="btn btn-primary w-100 my-2"
            onClick={(e) => editDetails(e, user)}
          >
            Edit Details
          </button>
          <button className="btn btn-secondary w-100" onClick={back}>
            Back
          </button>
        </form>
      ))}
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
