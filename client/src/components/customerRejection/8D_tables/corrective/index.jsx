import React from "react";
import "./corrective.scss";
import { dateFormatter } from "../../../../validations/validations";

const Corrective = ({ data }) => {
  return (
    <>
      <div className="centroid_correctiveWrapper">
        <div className="centroid_correctiveContainer">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Action</th>
                <th>Date</th>
                <th>Inspector</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj) => {
                  return(
                    <tr key={obj.corrective_id}>
                      <td>{obj.problem}</td>
                      <td>{obj.corrective_action}</td>
                      <td>{dateFormatter(obj.created_date)}</td>
                      <td>{obj.inspector}</td>
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

export default Corrective;
