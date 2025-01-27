import React from "react";

const CommentList = ({ comments, onDelete }) => {
  return comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment.id} className="d-flex justify-content-between align-items-center">
        <p>
          <strong>{comment.user.username}</strong>: {comment.content}
        </p>
        <i className="bi bi-trash text-danger" onClick={() => onDelete(comment.id)}></i>
      </div>
    ))
  ) : (
    <p>No comments available</p>
  );
};

export default CommentList;
