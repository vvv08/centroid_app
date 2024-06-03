import React, { useEffect } from "react";
import "./uomComp.scss";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "../../../../validations/validations";

const UOMMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_uomMasterWrapper">
        <div className="centroid_uomMasterContainer">
          <div className="centroid_uomMasterAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addMasterData/UOM");
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Unit of measurement</th>
                <th>Status</th>
                <th>Last updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr
                    key={obj.uom_id}
                    className={
                      obj.status === "inactive" ? "centroid_inactive_row" : ""
                    }
                  >
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.description}</td>
                    <td>{obj.status}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td>
                      <EditIcon
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/editMasterData/UOM/${obj.uom_id}`
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

export default UOMMaster;
