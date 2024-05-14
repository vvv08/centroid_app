import React, { useEffect } from "react";
import "./operationWise.scss";

const OperationWiseReport = ({ data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_operationWiseReportWrapper">
        <div className="centroid_operationWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Production Qty</th>
                <th>Rejection Qty</th>
                <th>Production loss</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.operation}</td>
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

export default OperationWiseReport;

