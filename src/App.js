import React from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/User/UserProfile/UserProfile";
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Home from "./components/Admin/Home/Home";
import AddUser from "./components/Admin/AddUser/AddUser";
import EditUser from "./components/Admin/EditUser/EditUser";
import UpdateUser from "./components/User/UpdateUser/UpdateUser";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<SignupPage />} path="/userSignup" />
        <Route element={<UserProfile />} path="/userProfile" />
        <Route element={<UpdateUser />} path='/userUpdate/:id'/>

        <Route element={<AdminLogin />} path="/admin" />
        <Route element={<Home />} path="/dashboard" />
        <Route element={<AddUser />} path="/addUser" />
        <Route element={<EditUser />} path="/editUser/:id" />
      </Routes>
    </>
  );
}

export default App;
