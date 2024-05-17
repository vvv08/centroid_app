import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reportHeader.scss";
import { getReports } from "../../../repository/reportsRepository";
import OperationReasonWiseReport from "../citeriaWiseReport/operationReasonWise";
import MachineWiseReport from "../citeriaWiseReport/machineWise";
import OperationWiseReport from "../citeriaWiseReport/operationWise";
import OperatorWiseReport from "../citeriaWiseReport/operatorWise";
import DefectWiseReport from "../citeriaWiseReport/defectWise";
import LossReasonWiseReport from "../citeriaWiseReport/lossReason";
import {
  padZero,
  dateFormatter,
} from "../../../../../server/validations/validations";
import DateWiseReport from "../citeriaWiseReport/dateWise";
import MachineDowntimeReport from "../citeriaWiseReport/machineDowntime";
import ShiftMachineWiseReport from "../citeriaWiseReport/shiftMachine";

const ReportHeader = () => {
  const navigate = useNavigate();
  //To get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate() + 1);
  const curr_date = `${year}-${month}-${day}`;

  const [tabState, setTabState] = useState("G");
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
    date_wise: "",
    date_wise_total:"",
    date_downtime : "",
    date_downtime_sum : "",
    part_rejection : "",
    part_operation_rejection : "",
    operation_reason : "",
    machine_wise : "",
    operator_wise : "",
    machine_downtime : "",
    shift_machine : ""
  });
  const tabChange = (tab) => {
    setTabState(tab);
  };

  useEffect(() => {
    setLoading(true);
    getReports(filterDate)
      .then((result) => {
        setReportData({
          date_wise: result.date_wise,
          date_wise_total : result.date_wise_total,
          date_downtime: result.date_downtime,
          date_downtime_sum : result.date_downtime_sum,
          part_rejection: result.part_rejection,
          part_operation_rejection : result.part_operation_rejection,
          operation_reason : result.operation_reason,
          machine_wise : result.machine_wise,
          operator_wise : result.operator_wise,
          machine_downtime : result.machine_downtime,
          shift_machine : result.shift_machine
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
                  tabChange("G");
                }}
                className={
                  tabState === "G"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Rejection Summary
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
                Down time Summary
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
                Part vs Reason
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
                Part vs Operation
              </li> 
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
                Operation vs Reason
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
                Machine Rejection
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
                Operator Rejection
              </li>
              <li
                onClick={() => {
                  tabChange("H");
                }}
                className={
                  tabState === "H"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Machine Downtime
              </li>
              <li
                onClick={() => {
                  tabChange("I");
                }}
                className={
                  tabState === "I"
                    ? "centroid_reportHeaderSelectedTab"
                    : undefined
                }
              >
                Shift Machine summary
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
              <p>{dateFormatter(filterDate.fromDate)}</p>
            </div>
            <div className="centroid_reportHeaderDate">
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
              {tabState === "A" && reportData.operation_reason && (
                <OperationReasonWiseReport data={reportData.operation_reason} sum_data = {reportData.date_wise_total} />
              )}
              {tabState === "B" && reportData.machine_wise && (
                <MachineWiseReport data={reportData.machine_wise} sum_data = {reportData.date_wise_total}  />
              )}
              {tabState === "C" && reportData.operator_wise && (
                <OperatorWiseReport data={reportData.operator_wise} sum_data = {reportData.date_wise_total} />
              )}
              {tabState === "D" && reportData.part_operation_rejection && (
                <OperationWiseReport data={reportData.part_operation_rejection} sum_data = {reportData.date_wise_total}/>
              )}
              {tabState === "E" && reportData.part_rejection && (
                <DefectWiseReport data={reportData.part_rejection} sum_data = {reportData.date_wise_total} />
              )}
              {tabState === "F" && reportData.date_downtime && (
                <LossReasonWiseReport data={reportData.date_downtime} sum_data = {reportData.date_downtime_sum}/>
              )}
              {tabState === "G" && reportData.date_wise && (
                <DateWiseReport data={reportData.date_wise} sum_data = {reportData.date_wise_total}/>
              )}
              {tabState === "H" && reportData.machine_downtime && (
                <MachineDowntimeReport data={reportData.machine_downtime} sum_data = {reportData.date_downtime_sum}/>
              )}
              {tabState === "I" && reportData.shift_machine && (
                <ShiftMachineWiseReport data={reportData.shift_machine} sum_data = {reportData.date_wise_total}/>
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
