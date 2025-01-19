import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComment] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // To track the selected post
  const [addComment, setAddComment] = useState(""); // Comment to be added

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
        toast.error(
          e.response ? e.response.data : "An unexpected error occurred"
        );
      });
  };

  const fetchComment = (postId) => {
    setSelectedPostId(postId); // Set the selected post ID
    Server.get(`/comment/getcomment?postId=${postId}`)
      .then((response) => {
        console.log(comments)
        setComment(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const Addcomment = (postId) => {
    if (!addComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const requestData = {
      content: addComment,
      userId: Number(userId), // Convert to number to match backend type
      postId: Number(postId), // Convert to number to match backend type
    };

    Server.post(`/comment/addcomment`, requestData)
      .then((response) => {
        toast.success("Comment added successfully!");
        setComment([...comments, response.data]); // Update comments with the new one
        setAddComment(""); // Clear input
      })
      .catch((e) => {
        toast.error("Failed to add comment");
        console.error(e.response?.data || e.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center sticky-top mt-1">
            <h2>{username}</h2>
            <a className="btn btn-dark" href="/posts/createpost">
              Post
            </a>
          </div>
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            {post.map((posts) => {
              const postDate = new Date(posts.timestamp).toLocaleDateString();
              const PostTime = new Date(posts.timestamp).toLocaleTimeString();
              return (
                <div key={posts.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{posts.user.username}</h3>
                    <h3>
                      <div className="dropdown">
                        <i
                          className="bi bi-three-dots-vertical"
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
                              onClick={() => handleDelete(posts.id)}
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
                      <p className="card-text-wrapper">
                        <div className="mt-2">
                          <i className="bi bi-heart btn"></i>
                          <i
                            className="bi bi-chat btn"
                            data-bs-toggle="modal"
                            data-bs-target="#commentModal"
                            onClick={() => fetchComment(posts.id)}
                          ></i>
                        </div>
                        <b>{posts.user.username}</b> {posts.content}
                      </p>
                      <p className="text-muted">
                        Posted on: {postDate} at {PostTime}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <div
        className="modal fade"
        id="commentModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable opacity-100"
          style={{ marginTop: "130px", maxHeight:"500px"}}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-muted">Comments</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {comments.length > 0 ? (
                comments.map((comment, id) => (
                  <div key={id}>
                    <p style={{marginBottom:"0px"}}><strong>{comment.user.username}</strong></p>
                    <p><small>{comment.content}</small></p>
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className="modal-footer"
              style={{
                position: "sticky",
                bottom: "0",
                background: "#fff",
                zIndex: "10",
              }}
            >
              <form className="d-flex align-items-center justify-content-center w-100">
                <input
                  type="text"
                  id="comment"
                  placeholder="comment"
                  className="form-control"
                  value={addComment}
                  onChange={(e) => setAddComment(e.target.value)}
                  style={{ borderRadius: "5px 0 0 5px", borderRight: "none" }}
                />
                <i
                  onClick={() => Addcomment(selectedPostId)}
                  className="bi bi-arrow-up-square btn border"
                  style={{ borderRadius: "0 5px 5px 0", borderLeft: "none" }}
                ></i>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPost;
