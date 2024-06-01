import React, { useEffect } from "react";
import "./invoiceHomeComp.scss";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../../validations/validations";
import EditIcon from "@mui/icons-material/Edit";

const InvoiceMaster = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_invoiceMasterWrapper">
        <div className="centroid_invoiceMasterContainer">
          <div className="centroid_invoiceMasterAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addInvoice");
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Created date</th>
                <th>Invoice Number</th>
                <th>Work Order</th>
                <th>Customer</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                return (
                  <tr key={obj.invoice_id} className={obj.status === "inactive" ? "centroid_inactive_row" : ""}>
                    <td>{dateFormatter(obj.created_date)}</td>
                    <td>{obj.invoice_number}</td>
                    <td>{obj.work_order}</td>
                    <td>{obj.customer}</td>
                    <td>{obj.remarks}</td>
                    <td>{obj.status}</td>
                    <td>{dateFormatter(obj.last_updated)}</td>
                    <td><EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick = {() => {navigate(`/editInvoice/${obj.invoice_id}`)}}/></td>
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

export default InvoiceMaster;
