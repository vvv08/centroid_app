import React from "react";
import "./downtimePrintFormat.scss";
import { dateFormatter } from "../../../validations/validations";
import DowntimePrintTable from "../printDowntimeTable";

const DowntimePrintFormat = ({data,dates,today,topic}) => {

  return (
    <>
      <div className="centroid_DowntimePrintFormatWrapper">
        <div className="centroid_DowntimePrintFormatWrapperContainer">
          <div className="centroid_DowntimePrintFormatTop">
            <div className="centroid_DowntimePrintFormatLogo">
              <img src="/assets/logo.png" alt="logo" />
            </div>

            <div className="centroid_DowntimePrintFormatAddress">
              <p></p>
            </div>
            <div className="centroid_DowntimePrintFormatDate">
              <p>
                <b>Date: </b>{dateFormatter(today)}
              </p>
            </div>
          </div>
          <div className="centroid_DowntimePrintFormatHeader">
            <div className="centroid_DowntimePrintFormatTopic">
              <h1>{topic}</h1>
            </div>
            <div className="centroid_DowntimePrintFormatRange">
              <p>
                {`${dateFormatter(dates.fromDate)} to ${dateFormatter(dates.toDate)}`}
              </p>
            </div>
          </div>
          <div className="centroid_DowntimePrintFormatContent">
            <DowntimePrintTable data = {data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DowntimePrintFormat;
