import React, { useEffect } from "react";
import "./preventiveActions.scss";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";
import { deletePreventiveAction } from "../../../repository/customerRejection/capa";

const PreventiveActions = ({ data ,invoice_id,refresh,setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deletePreventiveAction(id)
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
      $("#preventive_table").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_preventiveActionsWrapper">
        <div className="centroid_preventiveActionsContainer">
        <div className="centroid_preventiveActionsAdd">
        <h2>Preventive actions</h2>
          <button className="centroid_AddButton" onClick={() => {navigate(`/customer/addPreventiveAction/${invoice_id}`)}}>Add</button>
        </div>
          <table id="preventive_table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Issue</th>
                <th>Preventive action</th>
                <th>Inspector</th>
                <th>Remarks</th>
                <th>Last updated</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((obj) => {
                return(
                  <tr key={obj.preventive_id}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.problem}</td>
                    <td>{obj.preventive_action}</td>
                    <td>{obj.inspector}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/customer/editPreventiveAction/${obj.preventive_id}`)}}/></td>
                    <td>
                          <DeleteIcon
                            style={{
                              color: "var(--centroidDeleteRed)",
                              fontSize: "22px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleDelete(obj.preventive_id);
                            }}
                          />
                        </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PreventiveActions;

