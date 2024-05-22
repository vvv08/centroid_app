import React, { useEffect } from "react";
import "./operationWise.scss";

const OperationWiseReport = ({ data, sum_data }) => {
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
                <th>Part</th>
                <th>Operation</th>
                <th>Rejection Qty (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.part}</td>
                    <td>{obj.operation}</td>
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

export default OperationWiseReport;
