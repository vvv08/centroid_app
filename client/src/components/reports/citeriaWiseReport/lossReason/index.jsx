import React, { useEffect } from "react";
import "./lossReasonReport.scss";

const LossReasonWiseReport = ({ data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_lossReasonWiseReportWrapper">
        <div className="centroid_lossReasonWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Reason</th>
                <th>Total down time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.reason}</td>
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

export default LossReasonWiseReport;

