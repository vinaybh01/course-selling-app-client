import React from "react";
import "./SmaSpinner.css";

function SmallSpinner() {
  return (
    <div>
      <div>
        <div style={{ padding: "2px 18px" }} className="spinner-container">
          <div className="loading-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default SmallSpinner;
