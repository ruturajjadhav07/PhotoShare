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
              const PostTime = new Date(posts.timestamp).toLocaleTimeString(); // Extract time in hours
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

      {/* comment modal  */}

      <div
        className="modal fade"
        id="commentModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable opacity-100"
          style={{ marginTop: "130px" }}
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
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
                  style={{ borderRadius: "5px 0 0 5px", borderRight: "none" }}
                />
                <i
                  className="bi bi-send btn border"
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
