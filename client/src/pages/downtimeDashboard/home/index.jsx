import React, { useEffect, useState, useRef } from "react";
import "./downtime.scss";
import { useNavigate } from "react-router-dom";
import DowntimeDashboard from "../../../components/downtime/home";
import Navbar from "../../../components/navbar/navbar";
import { getDowntimeData } from "../../../repository/downtime";
import { dateFormatter,padZero } from "../../../../../server/validations/validations";
import DowntimePrintTable from "../../../components/downtime/printDowntimeTable";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import DowntimePrintFormat from "../../../components/downtime/downtimePrintFormat";

const DowntimeDashboardHome = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth()+ 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate());
  const curr_date = `${year}-${month}-${day}`;

  const [printState,setPrintState] = useState(false);
  const [closeHead,setCloseHead] = useState(false);
  const componentRef = useRef();


  const [refresh,setRefresh] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    dashboard: "",
    latest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filterDate, setFilterDate] = useState({
    fromDate: "2024-05-15",
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


  useEffect(() => {
    setLoading(true);
     getDowntimeData(filterDate)
       .then((result) => {
         setDashboardData({
           dashboard: result.dashboard,
           latest: result.latest[0],
         });
       })
       .catch((err) => {
         if (err.response.data.status === "authenticationError") {
           alert(err.response.data.message);
           navigate("/login");
         } else {
           alert(err.response.data.Message);
           navigate("/maintenance");
         }
       })
       .finally(() => {
         setLoading(false);
       });
  }, [filterDate,refresh]);

  return (
    <>
      <div className="centroid_DowntimeDashboardHomeWrapper">
        {!closeHead && <Navbar current_tab={"downtime"}/>}
        {!closeHead && <div className="centroid_DowntimeDashboardHomeHeader">
          <h2>Downtime Dashboard</h2>
          <div className="centroid_DowntimeDashboardHomeUpdates">
            <p>Last Updated: </p>
            <p>{dateFormatter(dashboardData.latest.latest_update)}</p>
          </div>
          <div className="centroid_DowntimeDashboardHomeAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addDowntime");
              }}
            >
              Add entry
            </button>
          </div>
        </div>}
        <div className="centroid_downtimeDateFilter">
            <div className="centroid_downtimeDate">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                value={filterDate.fromDate}
                onChange={handleFilterChange}
              />
              <p>{dateFormatter(filterDate.fromDate)}</p>
            </div>
            <div className="centroid_downtimeDate">
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
                  setCloseHead(true)
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
                  setCloseHead(false)
                }}
              >
                Back
              </button>
            )}
          </div>
        {dashboardData.dashboard && !loading ? <div className="centroid_DowntimeDashboardHomeDashboard" ref={componentRef}>
          {!printState && <DowntimeDashboard data={dashboardData} ref_state = {refresh} refresh = {setRefresh}/>}
          {printState && <DowntimePrintFormat data={dashboardData} dates={filterDate} today={curr_date} topic = {"Downtime Summary"}/>}
        </div> : <div className="centroid_homeLoading"><p>Loading...</p></div>}
      </div>
    </>
  );
};

export default DowntimeDashboardHome;
