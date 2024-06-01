import React, { useEffect, useState } from "react";
import "./customers.scss";
import CustomerNavbar from "../../../components/customerRejection/cust_navbar";
import CustomerMaster from "../../../components/customerRejection/cust_customers";
import { getCustomers } from "../../../repository/customerRejection/customer";
import { useNavigate } from "react-router-dom";

const CustomerMasterPage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getCustomers()
      .then((result) => {
        setCustomerData(result);
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
      <div className="centroid_customerWrapper">
        <CustomerNavbar current_tab={"customerMaster"} />
        <h2>Customers</h2>
        {customerData && !loading ? <div className="customerPageContent">
        <CustomerMaster data = {customerData}/>
        </div> : <div className="centroid_customerLoading"><p>Loading...</p></div>}
      </div>
    </>
  );
};

export default CustomerMasterPage;
