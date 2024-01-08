import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Courses from "./user-page/Courses";
import AppBar from "./Appbar";
import Admin from "./admin-pages/Admin";
import Update from "./admin-pages/Update";
import AdminRegister from "./admin-pages/AdminRegister";
import AdminLogin from "./admin-pages/AdminLogin";
import Signup from "./user-page/Signup";
import Signin from "./user-page/Signin";
import AdminCourses from "./admin-pages/AdminCourses";
import AdminAddcourse from "./admin-pages/AdminAddcourse";
import PurchasedCourse from "./user-page/PurchasedCourse";
import CoursePurchase from "./user-page/CoursePurchase";

function App() {
  return (
    <div className="main">
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ADMIN PART */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/addcourse" element={<AdminAddcourse />} />
          <Route path="/admin/course/:courseId" element={<Update />} />

          {/* USER PART */}
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/signin" element={<Signin />} />
          <Route path="/users/courses" element={<Courses />} />
          <Route path="/users/course/:courseId" element={<CoursePurchase />} />
          <Route path="/users/purchasedCourse" element={<PurchasedCourse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
