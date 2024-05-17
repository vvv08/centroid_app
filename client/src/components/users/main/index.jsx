import React, { useEffect, useState } from "react";
import "./userListMain.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deletUser } from "../../../repository/users";

const UserListMain = ({ data, ref_state, refresh }) => {
  const navigate = useNavigate();
  const [logged_user, setLogged_user] = useState({});

  const handleDelete = (id) => {
    if (confirm("Are you sure")) {
      deletUser(id)
        .then((result) => {
          alert("User deleted");
          refresh(!ref_state);
        })
        .catch((err) => {
          if (err.response.data.status === "authenticationError") {
            alert(err.response.data.message);
            navigate("/login");
          } else {
            alert("Internal server error");
            navigate("/maintenance");
          }
        });
    }
  };
  //To extract payload from token
  const token = localStorage.getItem("token");

  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
    if (token) {
      setLogged_user(JSON.parse(atob(token.split(".")[1])));
    }
  }, []);
  return (
    <>
      <div className="centroid_userListMainWrapper">
        <div className="centroid_userListMainContainer">
          <div className="centroid_userListMainAdd">
            <button
              className="centroid_AddButton"
              onClick={() => {
                navigate("/addUser");
              }}
            >
              Add
            </button>
          </div>
          <table id="example" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => {
                if (obj.user_id != logged_user.Id) {
                  return (
                    <tr key={obj.user_id}>
                      <td>{obj.name}</td>
                      <td>{obj.type}</td>
                      <td>
                        <EditIcon
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          onClick={() => {
                            navigate(
                              `/editUser/${obj.user_id}/${obj.type}/${obj.name}`
                            );
                          }}
                        />
                      </td>
                      <td>
                        <DeleteIcon
                          style={{
                            fontSize: "22px",
                            color: "var(--centroidDeleteRed)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleDelete(obj.user_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserListMain;
