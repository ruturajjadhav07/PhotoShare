import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import PostList from "./PostList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
        toast.error(e.response ? e.response.data : "An unexpected error occurred");
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center sticky-top">
        <h2>{username}</h2>
        <a className="btn btn-dark" href="/posts/createpost">
          Post
        </a>
        <a className="btn btn-warning" href="/posts/userdetails">
          Profile
        </a>
      </div>
      <hr style={{margin:"0"}}/>
      {error && <div className="alert alert-danger">{error}</div>}
      <PostList posts={post} onDelete={handleDelete} />
      <ToastContainer />
    </div>
  );
};

export default UserPost;
