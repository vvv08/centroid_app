import React, { useEffect, useState } from "react";
import "./downtime.scss";
import { useNavigate } from "react-router-dom";
import DowntimeDashboard from "../../../components/downtime/home";
import Navbar from "../../../components/navbar/navbar";
import { getDowntimeData } from "../../../repository/downtime";
import { dateFormatter } from "../../../../../server/validations/validations";

const DowntimeDashboardHome = () => {
  const [refresh,setRefresh] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    dashboard: "",
    latest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
     getDowntimeData()
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
  }, [refresh]);

  return (
    <>
      <div className="centroid_DowntimeDashboardHomeWrapper">
        <Navbar current_tab={"downtime"}/>
        <div className="centroid_DowntimeDashboardHomeHeader">
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
        </div>
        {dashboardData.dashboard && !loading ? <div className="centroid_DowntimeDashboardHomeDashboard">
          <DowntimeDashboard data={dashboardData} ref_state = {refresh} refresh = {setRefresh}/>
        </div> : <div className="centroid_homeLoading"><p>Loading...</p></div>}
      </div>
    </>
  );
};

export default DowntimeDashboardHome;
