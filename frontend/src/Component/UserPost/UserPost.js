import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "../User/UserLogin";

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    Server.get("/posts/all")
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((e) => {
        // console.log(e.message);
        setError(e.message);
        toast.error(e.message);
      });
  }, []);

  return (
    <div className="container mt-1">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center sticky-top mt-1">
            <h2 className="">{username}</h2>
            <a className="btn btn-dark" href="/posts/createpost">Post</a>
          </div>
          <hr />

          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            {post.map((posts, id) => {
              const postDate = new Date(posts.timestamp).toLocaleDateString(); // Extract and format the date
              return (
                <div key={id}>
                  <h3>{posts.user.username}</h3>
                  <div className="">
                    <img
                      alt="post"
                      className="card-img-top"
                      src={posts.imageUrl}
                    />
                    <div className="card-body">
                      <p className="card-text">
                        <div className="mt-2">
                          <i className="bi bi-heart mx-2"></i>{" "}
                          <i className="bi bi-chat mx-2"></i>
                        </div>
                        <b>{posts.user.username}</b> {posts.content}
                      </p>
                      <p className="text-muted">Posted on: {postDate}</p>{" "}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserPost;
