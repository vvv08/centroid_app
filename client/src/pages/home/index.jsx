import React, { useEffect, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/navbar";
import Dashboard from "../../components/dashboard";
import { getDashboard } from "../../repository/dashboardRepository";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
  }, []);

  return (
    <>
      <div className="centroid_homeWrapper">
        <Navbar />
          <div className="centroid_homeDashboard">
            <Dashboard data={dashboardData} />
          </div>
      </div>
    </>
  );
};

export default Home;
