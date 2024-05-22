import React, { useEffect } from "react";
import "./workOrder.scss";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { dateFormatter,timeFormatter } from "../../../../../server/validations/validations";

const WorkOrderMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_workOrderMasterWrapper">
        <div className="centroid_workOrderMasterContainer">
          <div className="centroid_workOrderMasterAdd">
            <button className="centroid_AddButton" onClick={() => {navigate('/addMasterData/Work Order')}}>Add</button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created on</th>
                <th>Work Order</th>
                <th>Part Number</th>
                <th>Total mix (Kg)</th>
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
                    key={obj.work_order_id}
                    className={
                      obj.status === "inactive" ? "centroid_inactive_row" : ""
                    }
                  >
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.work_order}</td>
                    <td>{obj.part_number}</td>
                    <td>{obj.total_mix}</td>
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
                            `/editMasterData/Work Order/${obj.work_order_id}`
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

export default WorkOrderMaster;
