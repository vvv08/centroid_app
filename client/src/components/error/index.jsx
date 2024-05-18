import React from "react";
import './errorPage.scss';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <div className="error-code">Something is not right!</div>
        <div className="error-message">You are requesting a page you dont have access to.</div>
        <div className="error-description">
          Please avoid such practices in the future.
        </div>
        <button className="centroid_AddButton" onClick={() => {navigate('/')}}>Home</button>
      </div>
    </>
  );
};

export default ErrorPage;
