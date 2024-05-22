import React from "react";
import "./dashboardPrintTable.scss";
import {
  dateFormatter
} from "../../../../../server/validations/validations";

const DashboardPrintTable = ({ data }) => {
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
                <th>Work Order</th>
                <th>Part No.</th>
                <th>Machines</th>
                <th>Operations</th>
                <th>Total Supplied Qty (Kg)</th>
                <th>Rejection Qty (Kg)</th>
                <th>Reasons for Rejection</th>
                <th>Operators</th>
                <th>Production Qty (Kg)</th>
                <th>Rejection Cost (Rs)</th>
                <th>Inspector</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.dashboard.map((obj) => {
                return (
                  <tr key={obj.Id}>
                    <td>{dateFormatter(obj.date)}</td>
                    <td>{obj.shift}</td>
                    <td>{dateFormatter(obj.production_from)}</td>
                    <td>{dateFormatter(obj.production_to)}</td>
                    <td>{obj.work_order}</td>
                    <td>{obj.part_number}</td>
                    <td>
                      <ul>
                        {obj.machines.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {obj.operations.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </td>
                    <td>{obj.total_mix}</td>
                    <td>
                      <ul>
                        {obj.rejection_qty.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {obj.reasons.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {obj.operators.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </td>
                    <td>{obj.production_qty}</td>
                    <td>{obj.total_cost}</td>
                    <td>{obj.inspector}</td>
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
