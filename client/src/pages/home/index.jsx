import React, { useEffect, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/navbar";
import Dashboard from "../../components/dashboard";
import { getDashboard } from "../../repository/dashboardRepository";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [refresh,setRefresh] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    dashboard: "",
    latest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getDashboard()
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
      <div className="centroid_homeWrapper">
        <Navbar current_tab={"dashboard"}/>
        <div className="centroid_DashboardHeader">
          <h2>Dashboard</h2>
          <div className="centroid_DashboardUpdates">
            <p>Last Updated: </p>
            <p>{dashboardData.latest.latest_update}</p>
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
        </div>
        {dashboardData.dashboard && <div className="centroid_homeDashboard">
          <Dashboard data={dashboardData} refresh = {setRefresh} ref_state = {refresh}/>
        </div>}
      </div>
    </>
  );
};

export default Home;
