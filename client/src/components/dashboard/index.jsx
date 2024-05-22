import React, { useEffect } from "react";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
import { deletedEntry } from "../../repository/dashboardRepository";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  dateFormatter
} from "../../../../server/validations/validations";

const Dashboard = ({ data, refresh, ref_state }) => {
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
              <table id="example" className="display" style={{ width: "80%" }}>
                <thead>
                  <tr>
                    <th>Entry date</th>
                    <th>Shift</th>
                    <th>Production start</th>
                    <th>Production end</th>
                    <th>Work Order</th>
                    <th>Part No.</th>
                    <th>Machines</th>
                    <th>Operations</th>
                    <th>Total Supplied Qty (Kg)</th>
                    <th>Rejection Qty (Kg)</th> 
                    <th>Reasons for Rejection</th>
                    <th>Operators</th>     
                    <th>Production Qty (Kg)</th>
                    <th>Rejection Cost (Rs)</th>
                    <th>Inspector</th>
                    <th>Remarks</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.dashboard.map((obj) => {
                    return (
                      <tr key={obj.Id}>
                        <td>{dateFormatter(
                          obj.date
                        )}</td>
                        <td>{obj.shift}</td>
                        <td>{dateFormatter(
                          obj.production_from
                        )}</td>
                        <td>{dateFormatter(
                          obj.production_to
                        )}</td>
                        <td>{obj.work_order}</td>
                        <td>{obj.part_number}</td>
                        <td>
                          <ul>
                            {obj.machines.map((e,index) => {
                              return <li key={index}>{e}</li>;
                            })}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {obj.operations.map((e,index) => {
                              return <li key={index}>{e}</li>;
                            })}
                          </ul>
                        </td>
                        <td>{obj.total_mix}</td>
                        <td>
                          <ul>
                            {obj.rejection_qty.map((e,index) => {
                              return <li key={index}>{e}</li>;
                            })}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {obj.reasons.map((e,index) => {
                              return <li key={index}>{e}</li>;
                            })}
                          </ul>
                        </td>                   
                        <td>
                          <ul>
                            {obj.operators.map((e,index) => {
                              return <li key={index}>{e}</li>;
                            })}
                          </ul>
                        </td>                                              
                        <td>{obj.production_qty}</td>
                        <td>{obj.total_cost}</td>                       
                        <td>{obj.inspector}</td>
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
