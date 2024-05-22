import React, { useEffect } from "react";
import "./shiftMachine.scss";

const ShiftMachineWiseReport = ({ data,sum_data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_shiftMachineWiseReportWrapper">
        <div className="centroid_shiftMachineWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Shift</th>
                <th>Machine</th>
                <th>Rejection Qty (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.shift}</td>
                    <td>{obj.machine}</td>
                    <td>{obj.rejection}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
            <tr>
                <th>Total</th>
                <th></th>
                <th>{sum_data.rejection}</th>
            </tr>
        </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShiftMachineWiseReport;

