import React, { useEffect } from "react";
import "./defectsMaster.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const DefectsMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_defectsMasterWrapper">
        <div className="centroid_defectsMasterContainer">
        <div className="centroid_defectsMasterAdd">
          <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Defect')}}>Add</button>
        </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Defect name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((obj) => {
                return (
                  <tr key={obj.defect_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.description}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editMasterData/Defect/${obj.defect_id}`)}} /></td>
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

export default DefectsMaster;

