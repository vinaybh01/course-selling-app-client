import React from "react";
import "./spinner.css";

function LoadingSpinner() {
  return (
    <div>
      <div
        className="spinner-container"
        style={{ display: "flex", justifyContent: "center",padding:"30px" }}
      >
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
