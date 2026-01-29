import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomeUser from "./components/HomeUser";
import HomeAdmin from "./components/HomeAdmin";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home/user" element={<HomeUser />}></Route>
          <Route path="/home/admin" element={<HomeAdmin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
