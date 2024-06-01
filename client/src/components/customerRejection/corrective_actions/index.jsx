import React, { useEffect } from "react";
import "./correctiveActions.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";

const CorrectiveActions = ({ data,invoice_id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#corrective_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_correctiveActionsWrapper">
        <div className="centroid_correctiveActionsContainer">
        <div className="centroid_correctiveActionsAdd">
        <h2>Corrective actions</h2>
          <button className="centroid_AddButton" onClick={() => {navigate(`/customer/addCorrective/${invoice_id}`)}}>Add</button>
        </div>
          <table id="corrective_table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Corrective action</th>
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
                  <tr key={obj.corrective_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.corrective_action}</td>
                    <td>{obj.inspector}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/customer/editCorrective/${obj.corrective_id}`)}}/></td>
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

export default CorrectiveActions;

