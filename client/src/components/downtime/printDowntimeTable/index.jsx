import React from "react";
import "./printDowntimeTable.scss";
import { dateFormatter,timeFormatter } from "../../../validations/validations";

const DowntimePrintTable = ({data}) => {
  return (
    <>
      <div className="centroid_downtimePrintTableWrapper">
        <div className="centroid_downtimePrintTableContainer">
          <table>
            <thead>
              <tr>
                <th>Entry date</th>
                <th>Machine</th>
                <th>Machine idle from</th>
                <th>Machine idle till</th>
                <th>Idle time reason</th>
                <th>Inspector</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.dashboard.map((obj) => {
                return (
                  <tr key={obj.id}>
                    <td>{`${dateFormatter(
                      obj.date.substr(0, 10)
                    )}, ${timeFormatter(obj.date.substr(11, 5))}`}</td>
                    <td>{obj.machine}</td>
                    <td>{`${dateFormatter(
                      obj.idle_from.substr(0, 10)
                    )}, ${timeFormatter(obj.idle_from.substr(11, 5))}`}</td>
                    <td>{`${dateFormatter(
                      obj.idle_to.substr(0, 10)
                    )}, ${timeFormatter(obj.idle_to.substr(11, 5))}`}</td>
                    <td>{obj.machine_loss}</td>
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

export default DowntimePrintTable;
