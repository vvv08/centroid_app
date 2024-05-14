import React from "react";
import "./reports.scss";
import Navbar from "../../components/navbar/navbar";
import ReportHeader from "../../components/reports/reportHeader";

const Reports = () => {
  return (
    <>
      <div className="centroid_reportsWrapper">
        <Navbar />
        <ReportHeader/>
      </div>
    </>
  );
};

export default Reports;
