import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import Photo from "../assets/pic2.png";
import LoadingSpinner from "../LoadingSpinner";
import "../css/CoursePurchased.css";

function CoursePurchase() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState();
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`https://course-app-api.onrender.com/users/course/${courseId}`, {
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
        `https://course-app-api.onrender.com/users/courses/${courses._id}`,
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
          <div className="header">{courses.title}</div>
          <div className="description">{courses.description}</div>
          <div className="image">
            <img src={courses.imageLink} alt="CoursePic" />
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
            <img className="details" src={Photo} alt="" />
          </div>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default CoursePurchase;
