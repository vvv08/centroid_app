import React, { useEffect } from "react";
import "./lossReasonReport.scss";
import { dateFormatter } from "../../../../../../server/validations/validations";

const LossReasonWiseReport = ({ data,sum_data }) => {
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_lossReasonWiseReportWrapper">
        <div className="centroid_lossReasonWiseReportContainer">
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reason for downtime</th>
                <th>Down time (Hours, minutes)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td>{dateFormatter(obj.date)}</td>
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

export default LossReasonWiseReport;

