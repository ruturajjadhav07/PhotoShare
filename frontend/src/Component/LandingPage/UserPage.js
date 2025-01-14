import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  return <div className="container"></div>;
};

export default UserPage;
