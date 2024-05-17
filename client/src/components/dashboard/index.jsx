import React, { useEffect } from "react";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
import { deletedEntry } from "../../repository/dashboardRepository";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter,timeFormatter } from "../../../../server/validations/validations";

const Dashboard = ({ data,refresh,ref_state }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deletedEntry(id)
        .then((result) => {
          alert("Deleted successfully");
          refresh(!ref_state);
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
      <div className="centroid_DashboardWrapper">
        <div className="centroid_DashboardContainer">
          <div className="centroid_DashboardContent">
            <div className="centroid_DashboardTable">
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Entry date</th>
                    <th>Shift</th>
                    <th>Production start</th>
                    <th>Production end</th>
                    <th>Machine</th>
                    <th>Operation</th>
                    <th>Part No. / Name</th>
                    <th>Operator</th>
                    <th>Inspector</th>
                    <th>Batch No.</th>
                    <th>Reason for Rejection</th>
                    <th>Total Supplied Qty</th>
                    <th>Production Qty</th>
                    <th>Rejection Qty</th>
                    <th>Remarks</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.dashboard.map((obj) => {
                    return (
                      <tr key={obj.Id}>
                        <td>{`${dateFormatter(obj.date.substr(0 , 10))}, ${timeFormatter(obj.date.substr(11,5))}`}</td>
                        <td>{obj.description}</td>
                        <td>{`${dateFormatter(obj.production_from.substr(0 , 10))}, ${timeFormatter(obj.production_from.substr(11,5))}`}</td>
                        <td>{`${dateFormatter(obj.production_to.substr(0 , 10))}, ${timeFormatter(obj.production_to.substr(11,5))}`}</td>
                        <td>{obj.machine}</td>
                        <td>{obj.operation}</td>
                        <td>{obj.part_number}</td>
                        <td>{obj.operator}</td>
                        <td>{obj.inspector}</td>
                        <td>{obj.batch_number}</td>
                        <td>{obj.defect}</td>
                        <td>{obj.total_mix}</td>
                        <td>{obj.production_qty}</td>
                        <td>{obj.rejection_qty}</td>
                        <td>{obj.remarks}</td>
                        <td>
                          <EditIcon
                            style={{ fontSize: "22px", cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/editEntry/${obj.Id}`);
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
                              handleDelete(obj.Id);
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

export default Dashboard;
