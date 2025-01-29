import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLike = ({ postId }) => {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    Server.get(`/like/userlike?userId=${userId}`)
      .then((response) => {
        const userLikes = response.data;
        setLiked(userLikes.some((like) => like.post.id === postId));
      })
      .catch((e) => toast.error(e.response.data));
  }, [postId]);

  const toggleLike = () => {
    Server.post(`/like/addlike?userId=${userId}&postId=${postId}`)
      .then((response) => {
        const isLiked = response.data === "Liked";
        setLiked(isLiked);
        // toast.success(isLiked ? "Liked" : "Disliked", {
        //   position: "bottom-center",
        //   autoClose: 400,
        //   hideProgressBar: true,    
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Zoom,
        // });
      })
      .catch(() => toast.error("Failed to update like status"));
  };

  return (
    <>
      <button
        onClick={toggleLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: liked ? "crimson" : "grey",
        }}
      >
        <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
      </button>
      <ToastContainer />
    </>
  );
};

export default UserLike;
