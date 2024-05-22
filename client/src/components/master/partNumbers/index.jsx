import React, { useEffect } from "react";
import "./partNumbers.scss";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {
  dateFormatter,
  timeFormatter,
} from "../../../../../server/validations/validations";

const PartNumbersMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_partNumbersMasterWrapper">
        <div className="centroid_partNumbersMasterContainer">
          <div className="centroid_partNumbersMasterAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addMasterData/Part Number");
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created on</th>
                <th>Part Number</th>
                <th>Part Name</th>
                <th>Conversion cost</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Last updated on</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr
                    key={obj.part_number_id}
                    className={
                      obj.status === "inactive" ? "centroid_inactive_row" : ""
                    }
                  >
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.part_number}</td>
                    <td>{obj.part_name}</td>
                    <td>{obj.part_cost}</td>
                    <td>{obj.remarks}</td>
                    <td>{obj.status}</td>
                    <td>{dateFormatter(
                      obj.last_updated
                    )}</td>
                    <td>
                      <EditIcon
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/editMasterData/Part Number/${obj.part_number_id}`
                          );
                        }}
                      />
                    </td>
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

export default PartNumbersMaster;
