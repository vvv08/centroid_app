import React from "react";
import "./rootCause.scss";
import { dateFormatter } from "../../../../validations/validations";

const RootCause = ({data}) => {
  return (
    <>
      <div className="centroid_rootCauseWrapper">
        <div className="centroid_rootCauseContainer">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Date</th>
                <th>Root Cause</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj) => {
                  return(
                    <tr key={obj.root_id}>
                      <td>{obj.problem}</td>
                      <td>{dateFormatter(obj.created_date)}</td>
                      <td>{obj.root_cause}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RootCause;
