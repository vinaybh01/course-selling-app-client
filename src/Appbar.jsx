import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Appbar.css";

function AppBar() {
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
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
        <Button
          variant={"text"}
          onClick={handleMobileMenuToggle}
          onMouseEnter={() => setMobileMenuOpen(true)}
          className="hamburger-menu"
        >
          {mobileMenuOpen ? "✖" : "☰"}
        </Button>

        {mobileMenuOpen && (
          <div className="full-menu">
            {tokenUser ? (
              <div className="appBar">
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/users/courses");
                    setMobileMenuOpen(false);
                  }}
                >
                  All Course
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/users/purchasedCourse");
                    setMobileMenuOpen(false);
                  }}
                >
                  Purchased Course
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    localStorage.removeItem("tokenUser");
                    navigate("/users/signin");
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : tokenAdmin ? (
              <div className="appBar">
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/admin/courses");
                    setMobileMenuOpen(false);
                  }}
                >
                  All Course
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/admin/addcourse");
                    setMobileMenuOpen(false);
                  }}
                >
                  Create course
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    localStorage.removeItem("tokenAdmin");
                    navigate("/admin/login");
                    setMobileMenuOpen(false);
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
                    setMobileMenuOpen(false);
                  }}
                >
                  Home
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/users/signup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/users/signin");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant={"text"}
                  onClick={() => {
                    navigate("/admin/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Admin-Login
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
