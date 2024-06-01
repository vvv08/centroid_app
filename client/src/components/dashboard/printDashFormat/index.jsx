import React from "react";
import "./printDashFormat.scss";
import DashboardPrintTable from "../printTableDash";
import { dateFormatter } from "../../../validations/validations";

const DashboardPrintFormat = ({data,dates,today,topic}) => {

  return (
    <>
      <div className="centroid_DashboardPrintFormatWrapper">
        <div className="centroid_DashboardPrintFormatWrapperContainer">
          <div className="centroid_DashboardPrintFormatTop">
            <div className="centroid_DashboardPrintFormatLogo">
              <img src="/assets/logo.png" alt="logo" />
            </div>

            <div className="centroid_DashboardPrintFormatAddress">
              <p></p>
            </div>
            <div className="centroid_DashboardPrintFormatDate">
              <p>
                <b>Date: </b>{dateFormatter(today)}
              </p>
            </div>
          </div>
          <div className="centroid_DashboardPrintFormatHeader">
            <div className="centroid_DashboardPrintFormatTopic">
              <h1>{topic}</h1>
            </div>
            <div className="centroid_DashboardPrintFormatRange">
              <p>
                {`${dateFormatter(dates.fromDate)} to ${dateFormatter(dates.toDate)}`}
              </p>
            </div>
          </div>
          <div className="centroid_DashboardPrintFormatContent">
            <DashboardPrintTable data = {data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPrintFormat;
