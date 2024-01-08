import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#000C66",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        zIndex: 1,
        height: "60px",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Typography variant={"h5"} style={{ color: "white" }}>
          EduCare
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10, display: "flex" }}>
          <div style={{ marginRight: 10 }}></div>
          {tokenUser ? (
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"text"}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
                onClick={() => {
                  navigate("/users/courses");
                }}
              >
                All Course
              </Button>
              <Button
                variant={"text"}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
                onClick={() => {
                  navigate("/users/purchasedCourse");
                }}
              >
                Purchased Course
              </Button>
              <Button
                variant={"text"}
                style={{ color: "white", fontWeight: "bold" }}
                onClick={() => {
                  localStorage.removeItem("tokenUser");
                  navigate("/users/signin");
                }}
              >
                Logout
              </Button>
            </div>
          ) : tokenAdmin ? (
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"text"}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
                onClick={() => {
                  navigate("/admin/courses");
                }}
              >
                All Course
              </Button>
              <Button
                variant={"text"}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
                onClick={() => {
                  navigate("/admin/addcourse");
                }}
              >
                Create course
              </Button>
              <Button
                variant={"text"}
                style={{ color: "white", fontWeight: "bold" }}
                onClick={() => {
                  localStorage.removeItem("tokenAdmin");
                  navigate("/admin/login");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"text"}
                style={{ color: "white", fontWeight: "bold" }}
                onClick={() => {
                  navigate("/users/signup");
                }}
              >
                Register
              </Button>
              <Button
                variant={"text"}
                style={{ color: "white", fontWeight: "bold" }}
                onClick={() => {
                  navigate("/users/signin");
                }}
              >
                Login
              </Button>
              <Button
                variant={"text"}
                style={{ color: "white", fontWeight: "bold" }}
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
    </div>
  );
}

export default AppBar;
