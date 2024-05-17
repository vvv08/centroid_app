import React, { useEffect } from "react";
import "./machineWiseReport.scss";

const MachineWiseReport = ({ data,sum_data }) => {
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
                <th>Total supplied Qty (Kg)</th>
                <th>Production Qty (Kg)</th>
                <th>Rejection Qty (Kg)</th>
                <th>Material loss (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.machine}</td>
                    <td>{obj.total_mix}</td>
                    <td>{obj.production}</td>
                    <td>{obj.rejection}</td>
                    <td>{obj.material_loss}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
            <tr>
                <th>Total</th>
                <th>{sum_data.total_mix}</th>
                <th>{sum_data.production}</th>
                <th>{sum_data.rejection}</th>
                <th>{sum_data.material_loss}</th>
            </tr>
        </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default MachineWiseReport;

