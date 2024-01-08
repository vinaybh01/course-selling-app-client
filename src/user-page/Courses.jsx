import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/users/courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        })
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "30px 100px",
      }}
    >
      {courses &&
        courses.length > 0 &&
        courses.map((course) => <Course course={course} />)}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  const truncatedDescription = course.description.slice(0, 70);

  return (
    <div onclick={() => navigate("/users/purchasedCourse")}>
      <Card
        style={{
          width: 300,
          margin: 14,
          height: 350,
          color: "black",
          background: "#F0F0F0",
          boxShadow: "-1px 0 5px 0 rgba(0, 0, 0, .5)",
          position: "relative",
        }}
      >
        <img
          src={course.imageLink}
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
          alt="Course-Image"
        />
        <Typography
          textAlign={"left"}
          style={{
            marginLeft: "10px",
            padding: "3px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {course.title}
        </Typography>
        <Typography
          textAlign={"left"}
          style={{
            marginLeft: "10px",
            fontSize: "15px",
            padding: "3px",
            opacity: "0.5",
          }}
        >
          {truncatedDescription}...
        </Typography>

        <Typography
          textAlign={"left"}
          style={{
            marginLeft: "10px",
            position: "absolute",
            top: "12px",
            right: "0px",
            backgroundColor: "#BA0021",
            color: "white",
            padding: "2px 7px",
            borderRadius: "10px 0px 0px 10px",
            fontWeight: "600",
          }}
        >
          ₹{course.price}
        </Typography>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 5 }}
        >
          <Button
            variant={"contained"}
            size="small"
            style={{
              backgroundColor: "#000C66",
              fontWeight: "600",
              padding: "5px 10px",
              marginTop: "3px",
            }}
            onClick={() => {
              navigate("/users/course/" + course._id);
            }}
          >
            Buy Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
