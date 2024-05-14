import React, { useEffect } from "react";
import "./machineWiseReport.scss";

const MachineWiseReport = ({ data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_machineWiseReportWrapper">
        <div className="centroid_machineWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Machine</th>
                <th>Production Qty</th>
                <th>Rejection Qty</th>
                <th>Production loss</th>
                <th>Total production time</th>
                <th>Total down time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.machine}</td>
                    <td>{obj.production}</td>
                    <td>{obj.rejection}</td>
                    <td>{obj.production_loss}</td>
                    <td>{obj.total_production_time}</td>
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

export default MachineWiseReport;

