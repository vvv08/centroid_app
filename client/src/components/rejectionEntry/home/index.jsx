import React, { useEffect } from "react";
import "./rejectionEntryComp.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteRejectionEntry } from "../../../repository/rejectionEntry";
import { dateFormatter } from '../../../../../server/validations/validations'

const RejectionEntryComp = ({ data, id }) => {
  const navigate = useNavigate();

  const handleDelete = (rejection_id) => {
    if (confirm("Are you sure?")) {
      deleteRejectionEntry(rejection_id)
        .then((result) => {
          alert("Deleted successfully");
          navigate("/");
        })
        .catch((err) => {
          if (err.response.data.status === "authenticationError") {
            alert(err.response.data.message);
            navigate("/login");
          } else {
            alert("Internal server error");
            navigate("/maintenance");
          }
        });
    }
  };

  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);

  return (
    <>
      <div className="centroid_rejectionEntryCompWrapper">
        <div className="centroid_rejectionEntryCompContainer">
          <div className="centroid_rejectionEntryCompAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate(`/addRejectionEntry/${id}`);
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created on</th>
                <th>Work order</th>
                <th>Machine</th>
                <th>Operation</th>
                <th>Operator</th>
                <th>Reason for rejection</th>
                <th>Rejection Qty (Kg)</th>
                <th>Remarks</th>
                <th>Last updated on</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.rejection_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.work_order}</td>
                    <td>{obj.machine}</td>
                    <td>{obj.operation}</td>
                    <td>{obj.operator}</td>
                    <td>{obj.reason}</td>
                    <td>{obj.rejection_qty}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td>
                      <EditIcon
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/editRejectionEntry/${obj.rejection_id}`);
                        }}
                      />
                    </td>
                    <td>
                      <DeleteIcon
                        style={{
                          color: "var(--centroidDeleteRed)",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(obj.rejection_id);
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

export default RejectionEntryComp;
