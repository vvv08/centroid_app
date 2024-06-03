import React from "react";
import "./closure.scss";

const Closure = () => {
  return (
    <>
      <div className="centroid_closureWrapper">
        <div className="centroid_closureContainer">
          <table>
            <thead>
              <tr>
                <th className="centroid_closureTable_header"></th>
                <th>Name</th>
                <th>Sign</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Team Leader</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Dept. Manager</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Quality & EMR manager</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Closure;
