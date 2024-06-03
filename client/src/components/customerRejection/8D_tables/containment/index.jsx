import React from "react";
import "./containment.scss";
import { dateFormatter } from "../../../../validations/validations";

const Containment = ({data}) => {
  return (
    <>
      <div className="centroid_containmentWrapper">
        <div className="centroid_containmentContainer">
          <table>
            <thead>
              <tr>
                <th>
                  Issue
                </th>
                <th>Stock checked at centroid</th>
                <th>Date</th>
                <th>Stock checked at customer</th>
                <th>Date</th>
                <th>Stock checked in production</th>
                <th>Date</th>
                <th>Stock check in transit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj) => {
                  return(
                    <tr key={obj.containment_id}>
                    <td>{obj.problem}</td>
                      <td>{obj.stock_check_supplier}</td>
                      <td>{dateFormatter(obj.supplier_date)}</td>
                      <td>{obj.stock_check_customer}</td>
                      <td>{dateFormatter(obj.customer_date)}</td>
                      <td>{obj.stock_check_production}</td>
                      <td>{dateFormatter(obj.production_date)}</td>
                      <td>{obj.stock_check_transit}</td>
                      <td>{dateFormatter(obj.transit_date)}</td>
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

export default Containment;
