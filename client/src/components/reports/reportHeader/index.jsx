import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./reportHeader.scss";
import { getReports } from "../../../repository/reportsRepository";
import MonthWiseReport from "../citeriaWiseReport/monthWise";
import MachineWiseReport from "../citeriaWiseReport/machineWise";
import OperationWiseReport from "../citeriaWiseReport/operationWise";
import OperatorWiseReport from "../citeriaWiseReport/operatorWise";
import DefectWiseReport from "../citeriaWiseReport/defectWise";
import LossReasonWiseReport from "../citeriaWiseReport/lossReason";
import { padZero } from "../../../../../server/validations/validations";

const ReportHeader = () => {

  const navigate = useNavigate();
  //To get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate());
  const curr_date = `${year}-${month}-${day}`;

  const [tabState, setTabState] = useState("A");
  const [loading, setLoading] = useState(true);

  const [filterDate, setFilterDate] = useState({
    fromDate: "2019-01-01",
    toDate: curr_date,
  });

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

  const [reportData, setReportData] = useState({
    month_wise: "",
    operator_wise: "",
    operation_wise: "",
    defect_wise: "",
    machine_wise: "",
    loss_reason: "",
  });
  const tabChange = (tab) => {
    setTabState(tab);
  };

  useEffect(() => {
    setLoading(true);
    getReports(filterDate)
      .then((result) => {
        setReportData({
          month_wise: result.month_wise,
          operator_wise: result.operator_wise,
          operation_wise: result.operation_wise,
          defect_wise: result.defect_wise,
          machine_wise: result.machine_wise,
          loss_reason: result.loss_reason,
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
      <div className="centroid_reportHeaderWrapper">
        <div className="centroid_reportHeaderContainer">
          <div className="centroid_reportHeaderList">
            <ul>
              <li
                onClick={() => {
                  tabChange("A");
                }}
                className={
                  tabState === "A"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Date Wise
              </li>
              <li
                onClick={() => {
                  tabChange("B");
                }}
                className={
                  tabState === "B"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Machine Wise
              </li>
              <li
                onClick={() => {
                  tabChange("C");
                }}
                className={
                  tabState === "C"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Operator Wise
              </li>
              <li
                onClick={() => {
                  tabChange("D");
                }}
                className={
                  tabState === "D"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Operation Wise
              </li>
              <li
                onClick={() => {
                  tabChange("E");
                }}
                className={
                  tabState === "E"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Defect Wise
              </li>
              <li
                onClick={() => {
                  tabChange("F");
                }}
                className={
                  tabState === "F"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Down time
              </li>
            </ul>
          </div>
          <div className="centroid_reportHeaderDateFilter">
            <div className="centroid_reportHeaderDate">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                value={filterDate.fromDate}
                onChange={handleFilterChange}
              />
              <p>{filterDate.fromDate}</p>
            </div>
            <div className="centroid_reportHeaderDate">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                id="toDate"
                value={filterDate.toDate}
                onChange={handleFilterChange}
              />
              <p>{filterDate.toDate}</p>
            </div>
            <button
              className="centroid_DeleteButton"
              onClick={() => {
                setFilterDate({
                  fromDate: "2019-01-01",
                  toDate: curr_date,
                });
              }}
            >
              Clear
            </button>
          </div>
          {!loading && reportData ? (
            <div className="centroid_reportHeaderContent">
              {tabState === "A" && reportData.month_wise && (
                <MonthWiseReport data={reportData.month_wise} />
              )}
              {tabState === "B" && reportData.machine_wise && (
                <MachineWiseReport data={reportData.machine_wise} />
              )}
              {tabState === "C" && reportData.operation_wise && (
                <OperatorWiseReport data={reportData.operator_wise} />
              )}
              {tabState === "D" && reportData.operation_wise && (
                <OperationWiseReport data={reportData.operation_wise} />
              )}
              {tabState === "E" && (
                <DefectWiseReport data={reportData.defect_wise} />
              )}
              {tabState === "F" && (
                <LossReasonWiseReport data={reportData.loss_reason} />
              )}
            </div>
          ) : (
            <div className="centroid_reportHeaderContent">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportHeader;
