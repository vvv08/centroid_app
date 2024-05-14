import React, { useEffect } from "react";
import "./machineLoss.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const MachineLossMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_machineLossMasterWrapper">
        <div className="centroid_machineLossMasterContainer">
        <div className="centroid_machineLossMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Reason')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Machine loss reason</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.machine_loss_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.description}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Reason/${obj.machine_loss_id}`)}} /></td>
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

export default MachineLossMaster;

