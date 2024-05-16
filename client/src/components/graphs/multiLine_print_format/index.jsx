import React from "react";
import "./multiLinePrintFormat.scss";
import MultiLineFormat from "../multiLine";

const MultiLinePrintFormat = ({ data, date, currentDate,dateFormatter,topic }) => {

  return (
    <>
      <div className="centroid_MultiLinePrintFormatWrapper">
        <div className="centroid_MultiLinePrintFormatWrapperContainer">
          <div className="centroid_MultiLinePrintFormatTop">
            <div className="centroid_MultiLinePrintFormatLogo">
              <img src="/assets/logo.png" alt="logo" />
            </div>

            <div className="centroid_MultiLinePrintFormatAddress">
              <p></p>
            </div>
            <div className="centroid_MultiLinePrintFormatDate">
              <p>
                <b>Date: </b>{dateFormatter(currentDate)}
              </p>
            </div>
          </div>
          <div className="centroid_MultiLinePrintFormatHeader">
            <div className="centroid_MultiLinePrintFormatTopic">
              <h1>{topic}</h1>
            </div>
            <div className="centroid_MultiLinePrintFormatRange">
              <p>
                {dateFormatter(date.fromDate)}  to  {dateFormatter(date.toDate)}
              </p>
            </div>
          </div>
          <div className="centroid_MultiLinePrintFormatContent">
            <MultiLineFormat data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiLinePrintFormat;
