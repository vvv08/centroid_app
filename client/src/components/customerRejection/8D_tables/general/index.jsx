import React from "react";
import "./general.scss";

const General = ({ data }) => {
  return (
    <>
      <div className="centroid_generalWrapper">
        <div className="centroid_generalContainer">
          <table>
            <tbody>
              <tr>
                <td>Customer : {data[0].customer}</td>
                <td>Invoice Number : {data[0].invoice_number}</td>
              </tr>
              <tr>
                <td>
                  Work Order :
                  <ul>
                    {data[0].work_order.map((obj, index) => {
                      return <li key={index}>{obj}</li>;
                    })}
                  </ul>
                </td>
                <td>Part Number : <ul>
                    {data[0].part_number.map((obj, index) => {
                      return <li key={index}>{obj}</li>;
                    })}
                  </ul></td>
              </tr>
              <tr>
                <td colSpan={2}>Part Name : <ul>
                    {data[0].part_name.map((obj, index) => {
                      return <li key={index}>{obj}</li>;
                    })}
                  </ul></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default General;
