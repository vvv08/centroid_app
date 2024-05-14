import React, { useEffect } from "react";
import "./monthWiseReport.scss";

const MonthWiseReport = ({ data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_monthWiseReportWrapper">
        <div className="centroid_monthWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Month & Year</th>
                <th>Production Qty</th>
                <th>Rejection Qty</th>
                <th>Production loss</th>
                <th>Total down time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.month}</td>
                    <td>{obj.production}</td>
                    <td>{obj.rejection}</td>
                    <td>{obj.production_loss}</td>
                    <td>{obj.total_down_time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MonthWiseReport;
