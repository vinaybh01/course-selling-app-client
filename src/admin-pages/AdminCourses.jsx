import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    }).then(callback1);
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
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  const truncatedDescription = course.description.slice(0, 70);

  return (
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
        style={{ marginLeft: "10px", padding: "3px", fontSize:"18px" , fontWeight:"500" }}
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Button
          variant={"contained"}
          size="small"
          style={{
            backgroundColor: "#018749",
            marginRight: "10px",
          }}
          onClick={() => {
            navigate("/admin/course/" + course._id);
          }}
        >
          update
        </Button>
        <Button
          variant={"contained"}
          size="small"
          style={{ backgroundColor: "#BA0021" }}
          onClick={async () => {
            try {
              const response = await axios.delete(
                `http://localhost:3000/admin/course/${course._id}`,
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("tokenAdmin"),
                  },
                }
              );

              console.log(response);
              alert("Course deleted successfully");
              window.location.reload();
            } catch (error) {
              console.error("Error deleting course:", error);
              alert("Failed to delete course. Please try again.");
              window.location.reload();
            }
          }}
        >
          delete
        </Button>
      </div>
    </Card>
  );
}

export default AdminCourses;
