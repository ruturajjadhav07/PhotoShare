import React, { useState } from "react";

const CommentInput = ({ onAdd }) => {
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!content.trim()) {
      return;
    }
    onAdd(content);
    setContent("");
  };

  return (
    <div className="d-flex align-items-center w-100">
      <input
        type="text"
        placeholder="Add a comment"
        className="form-control"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ borderRadius: "5px 0 0 5px", borderRight: "none" }}
      />
      <i
        className="bi bi-arrow-up-square btn border"
        onClick={handleAdd}
        style={{ borderRadius: "0 5px 5px 0" }}
      ></i>
    </div>
  );
};

export default CommentInput;
