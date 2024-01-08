import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { z } from "zod";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

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

      const response = await axios.post(
        "http://localhost:3000/admin/login",

        {
          username: validatedData.username,
          password: validatedData.password,
        }
      );
      let data = response.data;
      localStorage.setItem("tokenAdmin", data.token);
      navigate("/admin/courses");
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
        setGeneralError("Email and Password are not matching.");
      }
      setTimeout(() => {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
      }, 2500);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          height: "400px",
          marginTop: "90px",
        }}
      >
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <Typography variant={"h6"} style={{ textAlign: "center" }}>
            Login to Admin account
          </Typography>
          <br />
          {generalError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {generalError}
            </div>
          )}
          {emailError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {emailError}
            </div>
          )}
          <TextField
            onChange={(e) => {
              let elemt = e.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
            // type={"email"}
          />
          <br />
          <br />
          {passwordError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {passwordError}
            </div>
          )}
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"medium"}
            variant="contained"
            style={{ backgroundColor: "#000C66" }}
            onClick={handleSubmit}
          >
            {" "}
            Signin
          </Button>

          <div className="new" style={{ marginTop: "12px" }}>
            Dont have an account?
            <span
              className="hover"
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/admin/register")}
            >
              REGISTER
            </span>{" "}
            here
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminLogin;
