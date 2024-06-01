import React from "react";
import "./rejectionReport.scss";
import CustomerHome from "../../../components/customerRejection/cust_home";
import { useNavigate } from "react-router-dom";

const CustomerRejectionReport = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="centroid_CustomerRejectionWrapper">
        <div className="centroid_CustomerRejection_back">
          <button
            className="centroid_DeleteButton"
            onClick={() => {
              navigate("/customer");
            }}
          >
            Back
          </button>
        </div>
            <CustomerHome/>
      </div>
    </>
  );
};

export default CustomerRejectionReport;
