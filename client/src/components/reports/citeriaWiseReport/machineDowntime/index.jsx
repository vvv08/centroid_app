import React, { useEffect } from "react";
import "./machineDowntime.scss";

const MachineDowntimeReport = ({ data,sum_data }) => {
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
                <th>Reason for downtime</th>
                <th>Down time (Hours)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.machine}</td>
                    <td>{obj.reason}</td>
                    <td>{obj.time_loss}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th></th>
                <th>{sum_data.time_loss}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default MachineDowntimeReport;
