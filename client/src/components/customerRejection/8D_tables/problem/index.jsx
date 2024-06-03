import React from "react";
import "./problem.scss";
import { dateFormatter } from "../../../../validations/validations";

const Problem = ({ data }) => {
  return (
    <>
      <div className="centroid_problemWrapper">
        <div className="centroid_problemContainer">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Issue</th>
                <th>Rejeceted Quantity</th>
                <th>Unit of measurement</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj) => {
                  return(
                    <tr key={obj.cust_rej_id}>
                      <td>{dateFormatter(obj.created_date)}</td>
                      <td>{obj.problem}</td>
                      <td>{obj.rejected_qty}</td>
                      <td>{obj.uom}</td>
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

export default Problem;
