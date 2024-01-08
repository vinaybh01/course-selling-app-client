import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import Photo from "../assets/pic2.png";

function CoursePurchase() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState();
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/users/course/${courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        })
        .then((res) => {
          setCourses(res.data.course);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleBuyClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/courses/${courses._id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        }
      );
      console.log(response);
      alert("Course Purchased successfully");
      setPurchased(true);
    } catch (error) {
      console.error("Error purchasing course:", error);
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
      alert("Failed to purchase course. Please try again.");
    }
  };

  return (
    <div>
      {courses ? (
        <div>
          <div
            style={{
              background: "black",
              color: "white",
              height: "200px",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              fontSize: "40px",
              paddingLeft: "200px",
            }}
          >
            {courses.title}
          </div>
          <div
            style={{
              fontSize: "22px",
              padding: "80px 100px",
              marginRight: "400px",
              opacity: "0.8",
            }}
          >
            {courses.description}
          </div>
          <div
            style={{
              position: "absolute",
              top: "150px",
              right: "100px",
              width: "380px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "350px",
                height: "250px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              src={courses.imageLink}
              alt="CoursePic"
            />
            {purchased ? (
              <Button
                variant={"contained"}
                size="small"
                style={{
                  backgroundColor: "#018749",
                  margin: "10px 0px",
                  padding: "6px 20px",
                }}
              >
                View Content
              </Button>
            ) : (
              <Button
                variant={"contained"}
                size="small"
                style={{
                  backgroundColor: "#BA0021",
                  margin: "10px 0px",
                  padding: "6px 20px",
                }}
                onClick={handleBuyClick}
              >
                Buy @{courses.price}
              </Button>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={Photo} alt="" />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CoursePurchase;
