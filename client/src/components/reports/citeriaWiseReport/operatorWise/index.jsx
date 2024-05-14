import React, { useEffect } from "react";
import "./operatorWiseReport.scss";

const OperatorWiseReport = ({ data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_operatorWiseReportWrapper">
        <div className="centroid_operatorWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Part Number/Name</th>
                <th>Production Qty</th>
                <th>Rejection Qty</th>
                <th>Production loss</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.operator}</td>
                    <td>{obj.part_number}</td>
                    <td>{obj.production}</td>
                    <td>{obj.rejection}</td>
                    <td>{obj.production_loss}</td>
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

export default OperatorWiseReport;

