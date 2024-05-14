import React, { useEffect } from "react";
import "./operatorsMaster.scss";
import { deleteOperatorMaster } from "../../../repository/master";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const OperatorMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_operatorMasterWrapper">
        <div className="centroid_operatorMasterContainer">
          <div className="centroid_operatorMasterAdd">
            <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Operator')}}>Add</button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Operator name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.operator_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{obj.name}</td>
                    <td>{obj.status}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/editMasterData/Operator/${obj.operator_id}`)}}/></td>
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

export default OperatorMaster;
