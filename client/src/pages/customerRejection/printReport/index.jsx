import React, { useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import "./printReportPage.scss";
import CustPrintReportComp from "../../../components/customerRejection/printReport";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const CustReportPage = () => {
  const componentRef = useRef();
  const { invoice_id } = useParams();
  return (
    <>
      <div className="centroid_CustReportPageWrapper">
        <div className="centroid_CustReportPage_back">
          <button
            className="centroid_DeleteButton"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button>
          <ReactToPrint
            trigger={() => (
              <PrintIcon style={{ fontSize: "36px", cursor: "pointer" }}/>
            )}
            content={() => componentRef.current}
          />
        </div>

        <div className="centroid_printDiv" ref={componentRef}>
          <CustPrintReportComp invoice_id = {invoice_id}/>
        </div>
      </div>
    </>
  );
};

export default CustReportPage;
