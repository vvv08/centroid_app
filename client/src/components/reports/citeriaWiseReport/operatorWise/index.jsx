import React, { useEffect } from "react";
import "./operatorWiseReport.scss";

const OperatorWiseReport = ({ data,sum_data }) => {
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
                <th>Operation</th>
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
                    <td>{obj.operator}</td>
                    <td>{obj.operation}</td>
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

export default OperatorWiseReport;

