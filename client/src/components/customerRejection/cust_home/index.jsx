import React, { useEffect, useState } from "react";
import RejectionIssues from "../issues";
import ContainmentActions from "../containment_actions";
import RootCauses from "../root_causes";
import "./customerHomeComp.scss";
import CorrectiveActions from "../corrective_actions";
import PreventiveActions from "../preventive_actions";
import { useNavigate, useParams } from "react-router-dom";
import { getCAPADetails } from "../../../repository/customerRejection/capa";

const CustomerHome = () => {
  const { invoice_id, number } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [entries, setEntries] = useState({
    issues : [],
    containment_actions : [],
    root_causes : [],
    corrective_actions : [],
    preventive_actions : []
  })
  useEffect(() => {
    setLoading(true)
    getCAPADetails(invoice_id)
      .then((result) => {
        setEntries({
          issues: result.issues,
          containment_actions:result.containment_actions,
          root_causes:result.root_causes,
          corrective_actions:result.corrective_actions,
          preventive_actions:result.preventive_actions
        })
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
  },[]);

  return (
    <>
      <div className="customerHomeWrapper">
        <h1>Invoice Number : {number}</h1>
        <div className="customerHomeContent">
          {!loading && entries.issues && <RejectionIssues data={entries.issues} invoice_id={invoice_id}/>}
          {!loading && entries.containment_actions && <ContainmentActions data={entries.containment_actions} invoice_id={invoice_id}/>}
          {!loading && entries.root_causes && <RootCauses data={entries.root_causes} invoice_id={invoice_id}/>}
          {!loading && entries.corrective_actions && <CorrectiveActions data={entries.corrective_actions} invoice_id={invoice_id}/>}
          {!loading && entries.preventive_actions && <PreventiveActions data={entries.preventive_actions} invoice_id={invoice_id}/>}
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
