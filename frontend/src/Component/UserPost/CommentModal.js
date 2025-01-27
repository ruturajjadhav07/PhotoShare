import React, { useState, useEffect } from "react";
import Server from "../../Server/Server";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { toast } from "react-toastify";

const CommentModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Server.get(`/comment/getcomment?postId=${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
  }, [postId]);

  const addComment = (content) => {
    if (!content.trim()) {
      toast.error("Empty comment cannot be post");
      return;
    }
    const requestData = {
      content,
      userId: Number(userId),
      postId: Number(postId),
    };
    Server.post(`/comment/addcomment`, requestData)
      .then((response) => {
        setComments([...comments, response.data]);
        toast.success("Comment added successfully!");
      })
      .catch(() => toast.error("Failed to add comment"));
  };

  const deleteComment = (commentId) => {
    Server.delete(
      `/comment/deletecomment?commentId=${commentId}&userId=${userId}&postId=${postId}`
    )
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
        toast.success("Comment Deleted Successfully");
      })
      .catch((e) => toast.error(e.response.data));
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Comments</h4>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <CommentList comments={comments} onDelete={deleteComment} />
          </div>
          <div className="modal-footer">
            <CommentInput onAdd={addComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
