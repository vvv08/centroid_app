import React , { useEffect,useState } from "react";
import "./cust_printReportComp.scss";
import Closure from "../8D_tables/closure";
import General from "../8D_tables/general";
import Problem from "../8D_tables/problem";
import RootCause from "../8D_tables/rootCause";
import Corrective from "../8D_tables/corrective";
import Preventive from "../8D_tables/preventive";
import Containment from "../8D_tables/containment";
import { padZero, dateFormatter } from "../../../validations/validations";
import { getCAPADetails } from "../../../repository/customerRejection/capa";

const CustPrintReportComp = ({ invoice_id }) => {
  //To get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate());
  const curr_date = `${year}-${month}-${day}`;

  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState({
    general: [],
    issues: [],
    containment_actions: [],
    root_causes: [],
    corrective_actions: [],
    preventive_actions: [],
  });
  useEffect(() => {
    setLoading(true);
    getCAPADetails(invoice_id)
      .then((result) => {
        setEntries({
          general: result.general,
          issues: result.issues,
          containment_actions: result.containment_actions,
          root_causes: result.root_causes,
          corrective_actions: result.corrective_actions,
          preventive_actions: result.preventive_actions,
        });
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert("Internal server error");
          navigate("/maintenance");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && entries && <div className="centroid_custPrintReportCompWrapper">
        <div className="centroid_custPrintReportCompContainer">
          <div className="centroid_custPrintReportHeader">
            <div className="centroid_custPrintReportHeader1_logo">
              <img src="/assets/logo.png" alt="" />
            </div>
            <div className="centroid_custPrintReportHeader1_name">
              <h1>Centroid Polymers</h1>
            </div>
            <div className="centroid_custPrintReportHeader1_date">
              Date: {dateFormatter(curr_date)}
            </div>
          </div>
          <div className="centroid_custPrintReportName">
            <h2>Customer Rejection Report</h2>
          </div>
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>1D General Information</h4>
          </div>
          <General data = {entries.general}/>
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>2D Problem</h4>
          </div>
          <Problem data = {entries.issues} />
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>3D Containment actions</h4>
          </div>
          <Containment data = {entries.containment_actions}/>
          <div
            className="centroid_custPrintReportComp_8D_headers"
          >
            <h4>4D Root Cause analysis</h4>
          </div>
          <RootCause data={entries.root_causes}/>
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>5D Corrective action</h4>
          </div>
          <Corrective data={entries.corrective_actions}/>
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>6D Permanent Preventive action</h4>
          </div>
          <Preventive data = {entries.preventive_actions}/>
          <div
            className="centroid_custPrintReportComp_8D_headers"
            style={{ "marginTop": "800px" }}
          >
            <h4>7D Verification of permanent action</h4>
          </div>
          <div className="centroid_custPrintReportComp_7D">
            <p>Approved : </p>
            <hr />
            <p>Date : </p>
          </div>
          <div className="centroid_custPrintReportComp_8D_headers">
            <h4>8D Closure</h4>
          </div>
          <Closure />
        </div>
      </div>}
    </>
  );
};

export default CustPrintReportComp;
