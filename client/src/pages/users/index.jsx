import React, { useEffect, useState } from "react";
import "./userList.scss";
import Navbar from "../../components/navbar/navbar";
import UserListMain from "../../components/users/main";
import { getUsers } from "../../repository/users";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading,setLoading] = useState(true)
    const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    setLoading(true)
    getUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert("Internal server error");
          navigate("/maintenance");
        }
      }).finally(() => {
        setLoading(false)
      });
  }, [refresh]);
  return (
    <>
      <div className="centroid_userListWrapper">
        <Navbar current_tab={"users"}/>
        {!loading && users[0] ? <UserListMain data = {users} ref_state = {refresh} refresh = {setRefresh}/> : <div className="centroid_userListLoading"><p>Loading...</p></div>}
      </div>
    </>
  );
};

export default UserList;
