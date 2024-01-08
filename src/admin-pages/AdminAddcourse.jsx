import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function AdminAddcourse() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [desError, setDesError] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const postInputSchema = z.object({
        title: z.string().min(5).max(40),
        description: z.string().min(5),
        imageLink: z.string().url(),
        price: z.number().min(1),
      });

      const validateData = postInputSchema.parse({
        title,
        description: des,
        imageLink: image,
        price: parseFloat(price),
      });

      await axios.post(
        "http://localhost:3000/admin/courses",
        {
          title: validateData.title,
          description: validateData.description,
          imageLink: validateData.imageLink,
          published: true,
          price: validateData.price,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        }
      );
      alert("Created Course Successfully");
      navigate("/admin/courses");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          switch (error.path[0]) {
            case "title":
              setTitleError("Must be between 5 and 40 characters");
              break;
            case "description":
              setDesError("Description should be between 5 and 200 characters");
              break;
            case "imageLink":
              setImageError("Invalid URL format");
              break;
            case "price":
              setPriceError("Invalid price");
              break;
            default:
              break;
          }
        });
      } else {
        setGeneralError("Something went wrong, please try again.");
      }

      setTimeout(() => {
        setTitleError("");
        setDesError("");
        setImageError("");
        setPriceError("");
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
        flexDirection: "column",
        marginTop: "60px",
      }}
    >
      <Typography
        variant="h6"
        style={{ fontSize: "25px", fontWeight: "600", paddingBottom: "20px" }}
      >
        Create New Course
      </Typography>
      <div className="div" style={{ width: "550px", border: "" }}>
        <form action="">
          {generalError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {generalError}
            </div>
          )}
          {titleError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {titleError}
            </div>
          )}
          <TextField
            label="Title"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setTitle(e.target.value)}
          />
          {desError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>{desError}</div>
          )}
          <TextField
            label="Description"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setDes(e.target.value)}
          />
          {imageError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {imageError}
            </div>
          )}
          <TextField
            label="ImageUrl"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setImage(e.target.value)}
          />
          {priceError && (
            <div style={{ color: "red", paddingBottom: "3px" }}>
              {priceError}
            </div>
          )}
          <TextField
            label="Price"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            variant={"contained"}
            style={{ backgroundColor: "#000C66", marginTop: "25px" }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddcourse;
