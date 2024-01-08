import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function PurchasedCourse() {
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/users/purchasedCourses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        })
        .then((res) => {
          console.log(res.data.purchasedCourse);
          setPurchasedCourse(res.data.purchasedCourse);
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
      {purchasedCourse &&
        purchasedCourse.length > 0 &&
        purchasedCourse.map((course) => <Course course={course} />)}
    </div>
  );
}

export default PurchasedCourse;

export function Course({ course }) {
  const truncatedDescription = course.description.slice(0, 120);

  return (
    <div>
      <Card
        style={{
          width: 300,
          margin: 14,
          height: 350,
          color: "black",
          background: "#F0F0F0",
          boxShadow: "-1px 0 5px 0 rgba(0, 0, 0, .5)",
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
            opacity: "0.6",
          }}
        >
          {truncatedDescription}...
        </Typography>
      </Card>
    </div>
  );
}
