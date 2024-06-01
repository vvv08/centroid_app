import React, { useEffect, useState } from "react";
import "./customerNavbar.scss";
import logo from "/assets/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const CustomerNavbar = ({ current_tab }) => {
  const getColor = (tab) => {
    if (current_tab === tab) {
      return "--centroidAddBlue";
    } else {
      return "--centroidMaroon_dark";
    }
  };
  const navigate = useNavigate();
  const [logged_user, setLogged_user] = useState({});

  //To extract payload from token
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      setLogged_user(JSON.parse(atob(token.split(".")[1])));
    }
  }, []);

  return (
    <div className="centroid_customerNavbarWrapper">
      <div className="centroid_customerNavbarContainer">
        <div className="centroid_customerNavbarTop">
          <div className="centroid_customerNavbarLogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="centroid_customerNavbarHeader">
            <h2>Customer Rejection</h2>
          </div>
          <div className="centroid_customerNavbarList">
            <ul>
            <Link
                to="/customer"
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: `var(${getColor("rejection")})`,
                }}
              >
              <li>Rejections</li>
              </Link>
              <Link
                to="/customerMaster"
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: `var(${getColor("customerMaster")})`,
                }}
              >
              <li>Customers</li>
              </Link>
              <Link
                to="/invoice"
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: `var(${getColor("invoice")})`,
                }}
              >
              <li>Invoices</li>
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: `var(${getColor("dashboard")})`,
                }}
              >
                <li>Rejection Tracker</li>
              </Link>
            </ul>
          </div>
          <div className="centroid_customerNavbarUser">
            <div className="centroid_customerNavbarUserContent">
              <span>
                <PersonIcon />
              </span>
              <p>{logged_user.user}</p>
            </div>
            <div
              className="centroid_customerNavbarUserContent"
              onClick={handleLogout}
            >
              <span>
                <LogoutIcon />
              </span>
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="centroid_customerNavbarBottomLine"></div>
      </div>
    </div>
  );
};

export default CustomerNavbar;
