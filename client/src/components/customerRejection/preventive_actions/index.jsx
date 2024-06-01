import React, { useEffect } from "react";
import "./preventiveActions.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../../../server/validations/validations";

const PreventiveActions = ({ data ,invoice_id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#preventive_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_preventiveActionsWrapper">
        <div className="centroid_preventiveActionsContainer">
        <div className="centroid_preventiveActionsAdd">
        <h2>Preventive actions</h2>
          <button className="centroid_AddButton" onClick={() => {navigate(`/customer/addPreventiveAction/${invoice_id}`)}}>Add</button>
        </div>
          <table id="preventive_table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Preventive action</th>
                <th>Inspector</th>
                <th>Remarks</th>
                <th>Last updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((obj) => {
                return(
                  <tr key={obj.preventive_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.preventive_action}</td>
                    <td>{obj.inspector}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/customer/editPreventiveAction/${obj.preventive_id}`)}}/></td>
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

export default PreventiveActions;

