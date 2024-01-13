// AppBar.js

import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AppBar.css"; // Import the CSS file

function AppBar() {
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  // State to manage mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="mainbar">
      <div>
        <Typography variant={"h5"}>EduCare</Typography>
      </div>
      <div className={`appBar ${mobileMenuOpen ? "open" : ""}`}>
        {/* Hamburger menu button */}
        <Button
          variant={"text"}
          onClick={handleMobileMenuToggle}
          className="hamburger-menu"
        >
          ☰
        </Button>

        {tokenUser ? (
          <div>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/users/courses");
              }}
            >
              All Course
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/users/purchasedCourse");
              }}
            >
              Purchased Course
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                localStorage.removeItem("tokenUser");
                navigate("/users/signin");
              }}
            >
              Logout
            </Button>
          </div>
        ) : tokenAdmin ? (
          <div>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/admin/courses");
              }}
            >
              All Course
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/admin/addcourse");
              }}
            >
              Create course
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                localStorage.removeItem("tokenAdmin");
                navigate("/admin/login");
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="appBar">
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/users/signup");
              }}
            >
              Register
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/users/signin");
              }}
            >
              Login
            </Button>
            <Button
              variant={"text"}
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              Admin-Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
