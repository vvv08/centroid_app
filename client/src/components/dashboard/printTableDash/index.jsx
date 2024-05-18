import React from "react";
import "./dashboardPrintTable.scss";
import { dateFormatter,timeFormatter } from "../../../../../server/validations/validations";

const DashboardPrintTable = ({data}) => {
  return (
    <>
      <div className="centroid_dashboardPrintTableWrapper">
        <div className="centroid_dashboardPrintTableContainer">
          <table>
            <thead>
              <tr>
                <th>Entry date</th>
                <th>Shift</th>
                <th>Production start</th>
                <th>Production end</th>
                <th>Machine</th>
                <th>Operation</th>
                <th>Part No. / Name</th>
                <th>Operator</th>
                <th>Inspector</th>
                <th>Batch No.</th>
                <th>Reason for Rejection</th>
                <th>Total Supplied Qty</th>
                <th>Production Qty</th>
                <th>Rejection Qty</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
            {data.dashboard.map((obj) => {
                    return (
                      <tr key={obj.Id}>
                        <td>{`${dateFormatter(obj.date.substr(0 , 10))}, ${timeFormatter(obj.date.substr(11,5))}`}</td>
                        <td>{obj.description}</td>
                        <td>{`${dateFormatter(obj.production_from.substr(0 , 10))}, ${timeFormatter(obj.production_from.substr(11,5))}`}</td>
                        <td>{`${dateFormatter(obj.production_to.substr(0 , 10))}, ${timeFormatter(obj.production_to.substr(11,5))}`}</td>
                        <td>{obj.machine}</td>
                        <td>{obj.operation}</td>
                        <td>{obj.part_number}</td>
                        <td>{obj.operator}</td>
                        <td>{obj.inspector}</td>
                        <td>{obj.batch_number}</td>
                        <td>{obj.defect}</td>
                        <td>{obj.total_mix}</td>
                        <td>{obj.production_qty}</td>
                        <td>{obj.rejection_qty}</td>
                        <td>{obj.remarks}</td>
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

export default DashboardPrintTable;
