import React, { useEffect } from "react";
import "./operationsMaster.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const OperationsMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_operationsMasterWrapper">
        <div className="centroid_operationsMasterContainer">
        <div className="centroid_operationsMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Operation')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.operation_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.operation_description}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Operation/${obj.operation_id}`)}} /></td>
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

export default OperationsMaster;

