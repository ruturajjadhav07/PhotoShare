import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Component/User/UserLogin";
import UserSignup from "./Component/User/UserSignup";
import UserPost from "./Component/UserPost/UserPost";
import UserCreatePost from "./Component/UserPost/UserCreatePost";
import UserEdit from "./Component/UserDetails/UserEdit";
import UserDetails from "./Component/UserDetails/UserDetails";
import UserDelete from "./Component/UserActions/UserDelete";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/posts" element={<UserPost />} />
          <Route path="/posts/createpost" element={<UserCreatePost />} />
          <Route path="/posts/userdetails" element={<UserDetails />} />
          <Route path="/posts/userdetails/useredit" element={<UserEdit />} />
          <Route path="/posts/userdetails/userdelete" element={<UserDelete />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
