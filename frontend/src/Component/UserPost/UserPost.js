import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is loaded

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Initialize any Bootstrap dropdown manually if needed
    const dropdowns = document.querySelectorAll(".dropdown-toggle");
    dropdowns.forEach((dropdown) => new window.bootstrap.Dropdown(dropdown));

    Server.get("/posts/all")
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        setError(e.message);
        toast.error(e.message);
      });
  }, []);

  const handleDelete = (postId) => {
    Server.delete(`/posts/delete/${postId}?userId=${userId}`)
      .then((response) => {
        toast.success(response.data);
        setPost(post.filter((post) => post.id !== postId));
      })
      .catch((e) => {
        // const message = e.response && e.response.data
        toast.error(
          e.response ? e.response.data : "An unexpected error occurred"
        );
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center sticky-top mt-1">
            <h2 className="">{username}</h2>
            <a className="btn btn-dark" href="/posts/createpost">
              Post
            </a>
          </div>
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            {post.map((posts) => {
              const postDate = new Date(posts.timestamp).toLocaleDateString(); // Extract date amd convert to string
              return (
                <div key={posts.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{posts.user.username}</h3>
                    <h3>
                      <div className="dropdown">
                        <i
                          className="bi bi-three-dots-vertical "
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></i>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <a
                              className="dropdown-item btn text-danger"
                              onClick={() => handleDelete(posts.id)} // Pass the postId here
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </h3>
                  </div>
                  <div className="">
                    <img
                      alt="post"
                      className="card-img-top"
                      src={posts.imageUrl}
                    />
                    <div className="card-body">
                      <p className="card-text">
                        <div className="mt-2">
                          <i className="bi bi-heart mx-2"></i>
                          <i className="bi bi-chat mx-2"></i>
                        </div>
                        <b>{posts.user.username}</b> {posts.content}
                      </p>
                      <p className="text-muted">Posted on: {postDate}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPost;
