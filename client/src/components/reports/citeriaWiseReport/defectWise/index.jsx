import React, { useEffect } from "react";
import "./defectWiseReport.scss";

const DefectWiseReport = ({ data, sum_data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_defectWiseReportWrapper">
        <div className="centroid_defectWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Part</th>
                <th>Reason for rejection</th>
                <th>Rejection Qty (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.part}</td>
                    <td>{obj.reason}</td>
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

export default DefectWiseReport;
