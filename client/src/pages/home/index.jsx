import React, { useEffect, useState , useRef } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/navbar";
import Dashboard from "../../components/dashboard";
import { getDashboard } from "../../repository/dashboardRepository";
import { useNavigate } from "react-router-dom";
import { padZero,dateFormatter } from "../../validations/validations";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import DashboardPrintFormat from "../../components/dashboard/printDashFormat";

const Home = () => {
    //To get current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = padZero(currentDate.getMonth()+ 1); // Months are zero-based (0 = January)
    const day = padZero(currentDate.getDate());
    const curr_date = `${year}-${month}-${day}`;

  const [refresh,setRefresh] = useState(false)
  const [printState, setPrintState] = useState(false);
  const [closeHead,setCloseHead] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    dashboard: "",
    latest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const componentRef = useRef();

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
     getDashboard(filterDate)
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
      <div className="centroid_homeWrapper">
        {!closeHead && <Navbar current_tab={"dashboard"}/>}
        {!closeHead && <div className="centroid_DashboardHeader">
          <h2>Dashboard</h2>
          <div className="centroid_DashboardUpdates">
            <p>Last Updated: </p>
            <p>{dateFormatter(dashboardData.latest.latest_update)}</p>
          </div>
          <div className="centroid_DasboardAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addEntry");
              }}
            >
              Add entry
            </button>
          </div>
        </div>}
        <div className="centroid_dashboardDateFilter">
            <div className="centroid_dashboardDate">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                value={filterDate.fromDate}
                onChange={handleFilterChange}
              />
              <p>{dateFormatter(filterDate.fromDate)}</p>
            </div>
            <div className="centroid_dashboardDate">
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
                  setCloseHead(false);
                }}
              >
                Back
              </button>
            )}
          </div>
        {dashboardData.dashboard && !loading ? <div className="centroid_homeDashboard" ref={componentRef}>
        {
          !printState && <Dashboard data={dashboardData} refresh = {setRefresh} ref_state = {refresh}/>
        }
        {
          printState && <DashboardPrintFormat data = {dashboardData} dates = {filterDate} today = {curr_date} topic={"Rejection Summary"}/>
        }
          
        </div> : <div className="centroid_homeLoading">
          <p>Loading...</p>
        </div>}
      </div>
    </>
  );
};

export default Home;
