import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Update() {
  let { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
        },
      })
      .then((res) => {
        const { title, description, imageLink, price } = res.data.course;
        console.log(title);
        setTitle(title);
        setDes(description);
        setImage(imageLink);
        setPrice(price);
      })
      .catch((error) => console.error("Error fetching course:", error));
  }, [courseId]);

  const handleUpdate = async () => {
    try {
      await axios
        .put(
          `http://localhost:3000/admin/course/${courseId}`,
          {
            title,
            description: des,
            imageLink: image,
            published: true,
            price,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
            },
          }
        )
        .then((res) => {
          alert("Updated Course Successfully");
          navigate("/admin/courses");
        });
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  return (
    <div>
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
          Update Course
        </Typography>
        <div className="div" style={{ width: "550px", border: "" }}>
          <form action="">
            <TextField
              label="Title"
              value={title}
              style={{ margin: "5px 0px" }}
              fullWidth
              size="small"
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Description"
              value={des}
              style={{ margin: "5px 0px" }}
              fullWidth
              size="small"
              onChange={(e) => setDes(e.target.value)}
            />

            <TextField
              label="ImageUrl"
              style={{ margin: "5px 0px" }}
              value={image}
              fullWidth
              size="small"
              onChange={(e) => setImage(e.target.value)}
            />

            <TextField
              label="Price"
              style={{ margin: "5px 0px" }}
              value={price}
              fullWidth
              size="small"
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button
              variant={"contained"}
              style={{ backgroundColor: "#000C66", marginTop: "25px" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
