import React, { useEffect } from "react";
import "./customersComp.scss";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../validations/validations";
import EditIcon from "@mui/icons-material/Edit";

const CustomerMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_customerMasterWrapper">
        <div className="centroid_customerMasterContainer">
          <div className="centroid_customerMasterAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addCustomerMaster");
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Customer name</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.customer_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.name}</td>
                    <td>{obj.status}</td>
                    <td>{obj.remarks}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/editCustomer/${obj.customer_id}`)}}/></td>
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

export default CustomerMaster;
