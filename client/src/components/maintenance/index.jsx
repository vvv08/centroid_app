import React from "react";
import './maintenance.scss';
import { useNavigate } from "react-router-dom";

const Maintenance = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="error-container">
        <div className="error-code">Server Error</div>
        <div className="error-message">Requested page has faced an unexpected error</div>
        <div className="error-description">
          Please raise the issue to ensure smooth functionality.
        </div>
        <button className="centroid_AddButton" onClick={() => {navigate('/')}}>Home</button>
      </div>
    </>
  );
};

export default Maintenance;
