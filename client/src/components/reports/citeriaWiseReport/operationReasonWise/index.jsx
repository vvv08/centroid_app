import React, { useEffect } from "react";
import "./operationReasonWiseReport.scss";

const OperationReasonWiseReport = ({ data , sum_data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_operationReasonWiseReportWrapper">
        <div className="centroid_operationReasonWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Reason</th>
                <th>Total mix (Kg)</th>
                <th>Production (Kg)</th>
                <th>Rejection Qty (Kg)</th>
                <th>Material loss (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{obj.operation}</td>
                    <td>{obj.reason}</td>
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
                <th></th>
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

export default OperationReasonWiseReport;
