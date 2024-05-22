import React, { useEffect, useState } from "react";
import "./navbar.scss";
import logo from '/assets/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link , useNavigate } from "react-router-dom";

const Navbar = ({current_tab}) => {
  const getColor = (tab) => {
    if(current_tab === tab){
      return "--centroidAddBlue"
    }else{
      return "--centroidMaroon_dark"
    }
  }
  const navigate = useNavigate();
  const [logged_user , setLogged_user] = useState({})

  //To extract payload from token
  const token = localStorage.getItem("token")


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }

  useEffect(() => {
    if(token){
      setLogged_user(JSON.parse(atob(token.split('.')[1])))
    }
  },[])

  return (
    <div className="centroid_navBarWrapper">
      <div className="centroid_navBarContainer">
        <div className="centroid_navBarTop">
          <div className="centroid_navBarLogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="centroid_navBarHeader">
          <h2>Rejection Analysis</h2>
          </div>
          <div className="centroid_navBarList">
            <ul>
                <Link to="/" style={{"textDecoration":"none", "fontWeight":"500",color:`var(${getColor("dashboard")})`}}><li>Dashboard</li></Link>
                <Link to="/rejectionEntry" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("rejectionEntry")})`}}><li>Rejection Entry</li></Link>
                <Link to="/downtimeDashboard" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("downtime")})`}}><li>Downtime</li></Link>
                <Link to="/reports" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("reports")})`}}><li>Reports</li></Link>
                <Link to="/graphs" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("graphs")})`}}><li>Graphs</li></Link>
                <Link to="/masterData" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("master")})`}}><li>Master Data</li></Link>
                {logged_user.type === "admin" && <Link to="/userList" style={{"textDecoration":"none", "fontWeight":"500", color:`var(${getColor("users")})`}}><li>User list</li></Link>}
            </ul>
          </div>
          <div className="centroid_navBarUser">
            <div className="centroid_navBarUserContent">
              <span>
                <PersonIcon />
              </span>
              <p>{logged_user.user}</p>
            </div>
            <div className="centroid_navBarUserContent" onClick={handleLogout}>
              <span>
                <LogoutIcon />
              </span>
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="centroid_navBarBottomLine"></div>
      </div>
    </div>
  );
};

export default Navbar;
