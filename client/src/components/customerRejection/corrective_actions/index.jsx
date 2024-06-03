import React, { useEffect } from "react";
import "./correctiveActions.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";
import { deleteCorrective } from "../../../repository/customerRejection/capa";

const CorrectiveActions = ({ data, invoice_id,refresh,setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteCorrective(id)
        .then((result) => {
          alert("Deleted successfully");
          setRefresh(!refresh)
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
      $("#corrective_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_correctiveActionsWrapper">
        <div className="centroid_correctiveActionsContainer">
          <div className="centroid_correctiveActionsAdd">
            <h2>Corrective actions</h2>
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate(`/customer/addCorrective/${invoice_id}`);
              }}
            >
              Add
            </button>
          </div>
          <table
            id="corrective_table"
            className="display"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Corrective action</th>
                <th>Inspector</th>
                <th>Remarks</th>
                <th>Last updated</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.corrective_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.corrective_action}</td>
                    <td>{obj.inspector}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td>
                      <EditIcon
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/customer/editCorrective/${obj.corrective_id}`
                          );
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
                          handleDelete(obj.corrective_id);
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

export default CorrectiveActions;
