import React from "react";
import './maintenance.scss';

const Maintenance = () => {
  return (
    <>
      <div className="error-container">
        <div className="error-code">Server Error</div>
        <div className="error-message">Requested page has faced an unexpected error</div>
        <div className="error-description">
          The page you are looking for might have been removed, had its name
          Please raise the issue to ensure smooth functionality.
        </div>
      </div>
    </>
  );
};

export default Maintenance;
