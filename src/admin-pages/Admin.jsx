import React from "react";
import Photo from "../assets/20944356.jpg";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div>
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
                fontSize: "50px",
                padding: "70px",
              }}
            >
              Admin Dashboard
            </p>
            <button onClick={() => navigate("/admin/register")}>
              Click here to Admin account
            </button>
          </div>
          <img src={Photo} alt="" style={{ width: "600px", height: "600px" }} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
