import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "../User/UserLogin";
import { useNavigate } from "react-router-dom";

const UserCreatePost = () => {
  const [post, setPost] = useState({ image: null, content: "" });
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
//   console.log(userId);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [id]: files ? files[0] : value,
    }));
  };

  let navigate = useNavigate();

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("content", post.content);

    Server.post(`/posts/create?userId=${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("success")
        toast.success("Posted Successfully");
        setPost({ image: null, content: "" }); // Reset form
        setInterval(() => {
          navigate("/posts");
        }, 200);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.response ? e.response.data : "An error occurred");
        toast.error(e.response ? e.response.data : "An error occurred");
      });
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <form
        className="border rounded shadow-lg p-4 bg-light w-100"
        style={{
          maxWidth: "370px",
        }}
      >
        <h2 className="text-center mb-4">Create a Post</h2>
        <div className="form-group my-2">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="text"
            id="content"
            className="form-control"
            placeholder="Write your content here"
            onChange={handleChange}
            value={post.content}
          />
        </div>
        <button onClick={handlePost} className="btn btn-info w-100 mt-2">
          Post
        </button>
        <a className="btn btn-dark mt-2 w-100" href="/posts">Back</a>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserCreatePost;
