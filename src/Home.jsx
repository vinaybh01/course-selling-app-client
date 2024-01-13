import React from "react";
import Photo from "./assets/20944356.jpg";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div
        className="adminDash"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <p>
            Knowledge awaits! Explore our courses and transform your learning
            experience.
          </p>
          <button onClick={() => navigate("/users/signup")}>
            View Courses
          </button>
        </div>
        <img className="homeimage" src={Photo} alt="" />
      </div>
    </div>
  );
}

export default Home;
