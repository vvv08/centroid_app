import React, { useEffect } from "react";
import "./dateWiseReport.scss";
import { dateFormatter } from "../../../../../../server/validations/validations";

const DateWiseReport = ({ data,sum_data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_dateWiseReportWrapper">
        <div className="centroid_dateWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
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
                    <td>{dateFormatter(obj.date)}</td>
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

export default DateWiseReport;
