import React, { useEffect } from "react";
import "./downtimeDash.scss";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteDowntime } from "../../../repository/downtime";
import { dateFormatter,timeFormatter } from "../../../validations/validations";

const DowntimeDashboard = ({data,ref_state,refresh }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
      if (confirm("Are you sure?")) {
        deleteDowntime(id)
          .then((result) => {
            alert("Deleted successfully");
            refresh(!ref_state);
            navigate("/downtimeDashboard");
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
      <div className="centroid_DowntimeDashboardWrapper">
        <div className="centroid_DowntimeDashboardContainer">
          <div className="centroid_DowntimeDashboardContent">
            <div className="centroid_DowntimeDashboardTable">
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Entry date</th>
                    <th>Machine</th>
                    <th>Machine idle from</th>
                    <th>Machine idle till</th>
                    <th>Idle time reason</th>
                    <th>Inspector</th>
                    <th>Remarks</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.dashboard.map((obj) => {
                    return (
                      <tr key={obj.id}>
                        <td>{`${dateFormatter(obj.date.substr(0 , 10))}, ${timeFormatter(obj.date.substr(11,5))}`}</td>
                        <td>{obj.machine}</td>
                        <td>{`${dateFormatter(obj.idle_from.substr(0 , 10))}, ${timeFormatter(obj.idle_from.substr(11,5))}`}</td>
                        <td>{`${dateFormatter(obj.idle_to.substr(0 , 10))}, ${timeFormatter(obj.idle_to.substr(11,5))}`}</td>
                        <td>{obj.machine_loss}</td>
                        <td>{obj.inspector}</td>
                        <td>{obj.remarks}</td>
                        <td>
                          <EditIcon
                            style={{ fontSize: "22px", cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/editDowntime/${obj.id}`);
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
                              handleDelete(obj.id);
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
        </div>
      </div>
    </>
  );
};

export default DowntimeDashboard;
