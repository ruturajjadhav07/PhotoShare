import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInterface = () => {
  const userId = localStorage.getItem("userId") || "Id";
  const user = localStorage.getItem("username") || "Guest";

  const [userPost, setUserPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Server.get("/posts/all")
      .then((response) => {
        console.log(response.data);
        setUserPost(response.data);
      })
      .catch((e) => {
        setError(e.message);
        toast.error(e.message);
      });
  }, []);

  return (
    <div className="container mt-3">
      <div className="position-sticky top-0 bg-light shadow-sm">
        <h2>{user}</h2>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col">
            {userPost.map((post, id) => {
              return (
                <div key={id} className="card mb-3 border border-0 shadow">
                  <h2 className="card-title mx-4 mt-2">{post.user.username}</h2>
                  <img
                    src={post.imageUrl} // Assuming 'imageUrl' contains the image URL
                    className="card-img-top img-fluid"
                    alt="Post"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <b>{post.user.username} </b>
                      {post.content}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* Footer with Icons */}
            <div className="row position-fixed bottom-0 start-0 w-100 fs-1 text-center bg-dark">
              <div className="col-6 d-flex justify-content-center align-items-center border">
                <i className="bi bi-house text-white"></i>
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center border">
                <i className="bi bi-person text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserInterface;