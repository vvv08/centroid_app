import React, { useEffect } from "react";
import "./containmentActions.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";
import { deleteContainment } from "../../../repository/customerRejection/capa";

const ContainmentActions = ({ data, invoice_id,refresh,setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteContainment(id)
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
      $("#containment_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_containmentActionsWrapper">
        <div className="centroid_containmentActionsContainer">
          <div className="centroid_containmentActionsAdd">
            <h2>Containment actions</h2>
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate(`/customer/addContainment/${invoice_id}`);
              }}
            >
              Add
            </button>
          </div>
          <table
            id="containment_table"
            className="display"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Stock Check at Centroid</th>
                <th>Date</th>
                <th>Stock Check at Customer</th>
                <th>Date</th>
                <th>Stock Check at Production</th>
                <th>Date</th>
                <th>Stock Check at Transit</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Last updated</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.containment_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.stock_check_supplier}</td>
                    <td>{dateFormatter(obj.supplier_date)}</td>
                    <td>{obj.stock_check_customer}</td>
                    <td>{dateFormatter(obj.customer_date)}</td>
                    <td>{obj.stock_check_production}</td>
                    <td>{dateFormatter(obj.production_date)}</td>
                    <td>{obj.stock_check_transit}</td>
                    <td>{dateFormatter(obj.transit_date)}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td>
                      <EditIcon
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/customer/editContainment/${obj.containment_id}`
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
                          handleDelete(obj.containment_id);
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

export default ContainmentActions;
