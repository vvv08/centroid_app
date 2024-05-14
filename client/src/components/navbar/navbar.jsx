import React, { useEffect, useState } from "react";
import "./navbar.scss";
import logo from '/assets/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
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
                <Link to="/" style={{"textDecoration":"none", "color":"black"}}><li>Dashboard</li></Link>
                <Link to="/reports" style={{"textDecoration":"none", "color":"black"}}><li>Reports</li></Link>
                <Link to="/graphs" style={{"textDecoration":"none", "color":"black"}}><li>Graphs</li></Link>
                <Link to="/masterData" style={{"textDecoration":"none", "color":"black"}}><li>Master Data</li></Link>
                {logged_user.type === "admin" && <Link to="/userList" style={{"textDecoration":"none", "color":"black"}}><li>User list</li></Link>}
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
