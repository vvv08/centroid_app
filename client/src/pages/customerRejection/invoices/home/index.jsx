import React, { useEffect, useState } from "react";
import "./invoiceHomePage.scss";
import InvoiceMaster from "../../../../components/customerRejection/cust_invoices/home";
import CustomerNavbar from "../../../../components/customerRejection/cust_navbar";
import { getInvoices } from "../../../../repository/customerRejection/invoice";
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
     setLoading(true)
     getInvoices()
       .then((result) => {
         setInvoiceData(result);
       })
       .catch((err) => {
         if (err.response.data.status === "authenticationError") {
           alert(err.response.data.message);
           navigate("/login");
         } else {
           alert("Internal server error");
           navigate("/maintenance");
         }
       }).finally(() => {
         setLoading(false)
       });
  }, []);
  return (
    <>
      <div className="centroid_invoiceWrapper">
        <CustomerNavbar current_tab={"invoice"} />
        <h2>Invoices</h2>
        {invoiceData && !loading ? <div className="invoicePageContent">
        <InvoiceMaster data={invoiceData}/>
        </div> : <div className="centroid_invoiceLoading"><p>Loading...</p></div>}
      </div>
    </>
  );
};

export default InvoicePage;
