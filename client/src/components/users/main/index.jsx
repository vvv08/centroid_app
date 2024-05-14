import React, { useEffect, useState } from "react";
import "./userListMain.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const UserListMain = ({ data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_userListMainWrapper">
        <div className="centroid_userListMainContainer">
          <div className="centroid_userListMainAdd">
            <button className="centroid_AddButton" onClick={() => {navigate('/addUser')}}>Add</button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { 
                data.map((obj) => {
                  return (
                    <tr key={obj.user_id}>
                      <td>{obj.name}</td>
                      <td>{obj.type}</td>
                      <td>{obj.status}</td>
                      <td>
                        <EditIcon
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserListMain;
