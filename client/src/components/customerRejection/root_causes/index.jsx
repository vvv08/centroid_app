import React, { useEffect } from "react";
import "./rootCauses.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../../../server/validations/validations";

const RootCauses = ({ data,invoice_id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#root_causes_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_rootCausesWrapper">
        <div className="centroid_rootCausesContainer">
        <div className="centroid_rootCausesAdd">
        <h2>Root causes</h2>
          <button className="centroid_AddButton" onClick={() => {navigate(`/customer/addRootCause/${invoice_id}`)}}>Add</button>
        </div>
          <table id="root_causes_table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Root cause</th>
                <th>Remarks</th>
                <th>Last updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((obj) => {
                return(
                  <tr key={obj.root_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.root_cause}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/customer/editRootCause/${obj.root_id}`)}}/></td>
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

export default RootCauses;

