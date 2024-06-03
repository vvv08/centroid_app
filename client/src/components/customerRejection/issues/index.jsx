import React, { useEffect } from "react";
import "./custRejectionIssues.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";

const RejectionIssues = ({ data,invoice_id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#issues_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_rejectionIssuesWrapper">
        <div className="centroid_rejectionIssuesContainer">
          <div className="centroid_rejectionIssuesAdd">
            <h2>Issues</h2>
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate(`/customer/addIssue/${invoice_id}`);
              }}
            >
              Add
            </button>
          </div>
          <table
            id="issues_table"
            className="display"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Rejected quantity</th>
                <th>UOM</th>
                <th>Last updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.cust_rej_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.rejected_qty}</td>
                    <td>{obj.uom}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/customer/editIssue/${obj.cust_rej_id}`)}}/></td>
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

export default RejectionIssues;
