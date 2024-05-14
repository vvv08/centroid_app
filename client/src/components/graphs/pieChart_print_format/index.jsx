import React from "react";
import OperationRejectionGraph from "../pieChart";
import "./orPrintFormat.scss";

const PieChartPrintFormat = ({ data, date, currentDate,dateFormatter,topic }) => {

  return (
    <>
      <div className="centroid_ORPrintFormatWrapper">
        <div className="centroid_ORPrintFormatWrapperContainer">
          <div className="centroid_ORPrintFormatTop">
            <div className="centroid_ORPrintFormatLogo">
              <img src="/assets/logo.png" alt="logo" />
            </div>

            <div className="centroid_ORPrintFormatAddress">
              <p></p>
            </div>
            <div className="centroid_ORPrintFormatDate">
              <p>
                <b>Date: </b>{dateFormatter(currentDate)}
              </p>
            </div>
          </div>
          <div className="centroid_ORPrintFormatHeader">
            <div className="centroid_ORPrintFormatTopic">
              <h1>{topic}</h1>
            </div>
            <div className="centroid_ORPrintFormatRange">
              <p>
                {dateFormatter(date.fromDate)}  to  {dateFormatter(date.toDate)}
              </p>
            </div>
          </div>
          <div className="centroid_ORPrintFormatContent">
            <OperationRejectionGraph data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChartPrintFormat;
