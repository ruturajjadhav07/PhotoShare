import React, { useState } from "react";
import CommentModal from "./CommentModal";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const PostItem = ({ post, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const postDate = new Date(post.timestamp).toLocaleDateString();
  const postTime = new Date(post.timestamp).toLocaleTimeString();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <h3>{post.user.username}</h3>
        <div className="dropdown">
          <i
            className="bi bi-three-dots-vertical"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item btn text-danger" onClick={() => onDelete(post.id)}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img
        alt="post"
        className="card-img-top img-fluid border"
        src={post.imageUrl}
        style={{ maxHeight: "660px", objectFit: "cover", width: "100%" }}
      />
      <div className="card-body">
        <p>
          <b>{post.user.username}</b> {post.content}
        </p>
        <p className="text-muted">
          Posted on: {postDate} at {postTime}
        </p>
        <div>
          <i
            className="bi bi-heart btn"
            style={{ cursor: "pointer", border: "none" }}
          ></i>
          <i
            className="bi bi-chat btn"
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer", border: "none"}}
          ></i>
        </div>
      </div>
      <hr />
      {showModal && <CommentModal postId={post.id} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PostItem;
