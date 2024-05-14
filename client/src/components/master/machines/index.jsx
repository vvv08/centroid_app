import React, { useEffect } from "react";
import "./machinesMaster.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const MachinesMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_machinesMasterWrapper">
        <div className="centroid_machinesMasterContainer">
        <div className="centroid_machinesMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Machine')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Machine name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.machine_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.name}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Machine/${obj.machine_id}`)}} /></td>
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

export default MachinesMaster;

