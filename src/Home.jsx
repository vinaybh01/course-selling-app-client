import React from "react";
import Photo from "./assets/20944356.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="adminDash"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "30px",
              padding: "70px",
            }}
          >
            Knowledge awaits! Explore our courses and transform your learning
            experience.{" "}
          </p>
          <button
            style={{
              marginLeft: "70px",
              padding: "10px",
              background: "#000C66",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/users/signup")}
          >
            View Courses
          </button>
        </div>
        <img src={Photo} alt="" style={{ width: "600px", height: "600px" }} />
      </div>
    </div>
  );
}

export default Home;
