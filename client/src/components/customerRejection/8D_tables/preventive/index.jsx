import React from "react";
import "./preventive.scss";
import { dateFormatter } from "../../../../validations/validations";

const Preventive = ({ data }) => {
  return (
    <>
      <div className="centroid_preventiveWrapper">
        <div className="centroid_preventiveContainer">
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
                  <tr key={obj.preventive_id}>
                    <td>{obj.problem}</td>
                    <td>{obj.preventive_action}</td>
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

export default Preventive;
