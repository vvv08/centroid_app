import React, { useEffect } from "react";
import "./shiftsMaster.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const ShiftsMaster = ({ data }) => {
  const navigate = useNavigate()
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_shiftsMasterWrapper">
        <div className="centroid_shiftsMasterContainer">
        <div className="centroid_shiftsMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Shift')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Shift Number</th>
                <th>Description</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.shift_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.shift}</td>
                    <td>{obj.description}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Shift/${obj.shift_id}`)}} /></td>
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

export default ShiftsMaster;

