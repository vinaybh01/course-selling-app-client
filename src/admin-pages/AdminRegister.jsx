import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { z } from "zod";

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userInputSchema = z.object({
        username: z.string().email(),
        password: z.string().min(6),
      });

      const validatedData = userInputSchema.parse({
        username: email,
        password,
      });
      console.log(validatedData);

      const response = await axios.post("http://localhost:3000/admin/signup", {
        username: validatedData.username,
        password: validatedData.password,
      });
      let data = response.data;
      console.log(data);
      // localStorage.setItem("tokenAdmin", data.token);
      navigate("/admin/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path.includes("username")) {
            setEmailError("Invalid email format");
          }
          if (error.path.includes("password")) {
            setPasswordError("Password must be at least 6 characters");
          }
        });
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }

      setTimeout(() => {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
      }, 2500);
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Register to Admin account</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          {emailError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {emailError}
            </div>
          )}
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          {passwordError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {passwordError}
            </div>
          )}
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          {generalError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {generalError}
            </div>
          )}
          <Button
            size={"medium"}
            variant="contained"
            style={{ backgroundColor: "#000C66" }}
            onClick={handleSubmit}
          >
            Signup
          </Button>
          <div className="div" style={{ marginTop: "12px" }}>
            Have an account?{" "}
            <span
              className="hover"
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/admin/login")}
            >
              LOGIN
            </span>{" "}
            here
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminRegister;
