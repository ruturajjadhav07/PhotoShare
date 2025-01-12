import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from "./Component/User/UserSignup";
import UserLogin from "./Component/User/UserLogin";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
