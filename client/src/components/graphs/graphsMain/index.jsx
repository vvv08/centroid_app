import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./graphsMain.scss";
import { padZero } from "../../../validations/validations.js";
import { getGraphData } from "../../../repository/graphs";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { dateFormatter } from "../../../validations/validations.js";
import PieChartPrintFormat from "../pieChart_print_format/index.jsx";
import PieChartGraph from "../pieChart/index.jsx";
import MultiLineFormat from "../multiLine/index.jsx";
import MultiLinePrintFormat from "../multiLine_print_format/index.jsx";

const GraphMain = ({ closeNav }) => {
  const navigate = useNavigate();
  //To get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate());
  const curr_date = `${year}-${month}-${day}`;

  const [tabState, setTabState] = useState("D");
  const [loading, setLoading] = useState(true);
  const [printState, setPrintState] = useState(false);

  const [filterDate, setFilterDate] = useState({
    fromDate: "2024-05-15",
    toDate: curr_date,
  });

  const componentRef = useRef();

  const handleFilterChange = (e) => {
    switch (e.target.id) {
      case "fromDate": {
        setFilterDate((state) => ({ ...state, fromDate: e.target.value }));
        break;
      }
      case "toDate": {
        setFilterDate((state) => ({ ...state, toDate: e.target.value }));
        break;
      }
    }
  };

  const [graphData, setGraphData] = useState({
    total_prod_summary: "",
    operation_reason : "",
    machine_reason : "",
    operator_reason : "",
    machine_time_loss_reason : ""
  });
  const tabChange = (tab) => {
    setTabState(tab);
  };

  useEffect(() => {
    setLoading(true);
    getGraphData(filterDate)
      .then((result) => {
        setGraphData({
          total_prod_summary: result.total_prod_summary,
          operation_reason : result.operation_reason,
          machine_reason : result.machine_reason,
          operator_reason : result.operator_reason,
          machine_time_loss_reason : result.machine_time_loss_reason
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
  }, [filterDate]);

  return (
    <>
      <div className="centroid_graphMainWrapper">
        <div className="centroid_graphMainContainer">
          {!printState && (
            <div className="centroid_graphMainList">
              <ul>
                <li
                  onClick={() => {
                    tabChange("D");
                  }}
                  className={
                    tabState === "D"
                      ? "centroid_graphMainSelectedTab"
                      : undefined
                  }
                >
                  Rejection Summary
                </li>
                {/* <li
                  onClick={() => {
                    tabChange("A");
                  }}
                  className={
                    tabState === "A"
                      ? "centroid_graphMainSelectedTab"
                      : undefined
                  }
                >
                  Operation rejection reason
                </li>
                <li
                  onClick={() => {
                    tabChange("B");
                  }}
                  className={
                    tabState === "B"
                      ? "centroid_graphMainSelectedTab"
                      : undefined
                  }
                >
                  Machine rejection reason
                </li>
                <li
                  onClick={() => {
                    tabChange("C");
                  }}
                  className={
                    tabState === "C"
                      ? "centroid_graphMainSelectedTab"
                      : undefined
                  }
                >
                  Operator rejection reason
                </li>
                <li
                  onClick={() => {
                    tabChange("E");
                  }}
                  className={
                    tabState === "E"
                      ? "centroid_graphMainSelectedTab"
                      : undefined
                  }
                >
                  Machine Downtime reason
                </li> */}
              </ul>
            </div>
          )}
          <div className="centroid_graphMainDateFilter">
            <div className="centroid_graphMainDate">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                value={filterDate.fromDate}
                onChange={handleFilterChange}
              />
              <p>{dateFormatter(filterDate.fromDate)}</p>
            </div>
            <div className="centroid_graphMainDate">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                id="toDate"
                value={filterDate.toDate}
                onChange={handleFilterChange}
              />
              <p>{dateFormatter(filterDate.toDate)}</p>
            </div>
            <button
              className="centroid_DeleteButton"
              onClick={() => {
                setFilterDate({
                  fromDate: "2024-05-15",
                  toDate: curr_date,
                });
              }}
            >
              Clear
            </button>
            {!printState && (
              <PrintIcon
                style={{ fontSize: "36px", cursor: "pointer" }}
                onClick={() => {
                  setPrintState(true);
                  closeNav(true);
                }}
              />
            )}
            {printState && (
              <ReactToPrint
                trigger={() => (
                  <PrintIcon style={{ fontSize: "36px", cursor: "pointer" }} />
                )}
                content={() => componentRef.current}
              />
            )}
            {printState && (
              <button
                className="centroid_DeleteButton"
                onClick={() => {
                  setPrintState(false);
                  closeNav(false);
                }}
              >
                Back
              </button>
            )}
          </div>
          {!loading && graphData ? (
            <div className="centroid_graphMainContent" ref={componentRef}>
              {tabState === "A" && !printState && (
                <PieChartGraph data={graphData.operation_reason} />
              )}
              {tabState === "A" && printState && (
                <PieChartPrintFormat
                  data={graphData.operation_reason}
                  date={filterDate}
                  currentDate={curr_date}
                  dateFormatter={dateFormatter}
                  topic={"Operation & Reason Rejection"}
                />
              )}
              {tabState === "B" && !printState && (
                <PieChartGraph data={graphData.machine_reason} />
              )}
              {tabState === "B" && printState && (
                <PieChartPrintFormat
                  data={graphData.machine_reason}
                  date={filterDate}
                  currentDate={curr_date}
                  dateFormatter={dateFormatter}
                  topic={"Machine & Reason Rejection"}
                />
              )}
              {tabState === "C" && !printState && (
                <PieChartGraph data={graphData.operator_reason} />
              )}
              {tabState === "C" && printState && (
                <PieChartPrintFormat
                  data={graphData.operator_reason}
                  date={filterDate}
                  currentDate={curr_date}
                  dateFormatter={dateFormatter}
                  topic={"Operator & Reason Rejection"}
                />
              )}
              {tabState === "D" && !printState && (
                <MultiLineFormat data={graphData.total_prod_summary} />
              )}
              {tabState === "D" && printState && (
                <MultiLinePrintFormat
                  data={graphData.total_prod_summary}
                  date={filterDate}
                  currentDate={curr_date}
                  dateFormatter={dateFormatter}
                  topic={"Date wise total summary"}
                />
              )}
              {tabState === "E" && !printState && (
                <PieChartGraph data={graphData.machine_time_loss_reason} />
              )}
              {tabState === "E" && printState && (
                <PieChartPrintFormat
                  data={graphData.machine_time_loss_reason}
                  date={filterDate}
                  currentDate={curr_date}
                  dateFormatter={dateFormatter}
                  topic={"Machine & Downtime reason"}
                />
              )}
            </div>
          ) : (
            <div className="centroid_graphMainContent">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphMain;
