import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Component/User/UserLogin";
import UserSignup from "./Component/User/UserSignup";
import UserInterface from "./Component/UserList/UserInterface";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={< UserLogin/>} />
          <Route path="/signup" element={<UserSignup />} /> 
          <Route path = "/posts" element={<UserInterface />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
