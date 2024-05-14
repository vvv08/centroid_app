import React, { useEffect } from "react";
import "./inspectorsMaster.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const InspectorsMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_inspectorsMasterWrapper">
        <div className="centroid_inspectorsMasterContainer">
        <div className="centroid_inspectorsMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Inspector')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Inspector name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.inspector_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.name}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Inspector/${obj.inspector_id}`)}} /></td>
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

export default InspectorsMaster;

