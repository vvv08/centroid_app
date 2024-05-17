import React, { useEffect, useState } from "react";
import "./editUser.scss";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../../repository/users";

const EditUserForm = ({ id,name,type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    id : id || "",
    name: name || "",
    type: type || ""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "type": {
        setInputs((state) => ({ ...state, type: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     editUser(inputs)
       .then((result) => {
         alert("User edited");
         navigate("/userList");
       })
       .catch((err) => {
         if (err.response.data.status === "authenticationError") {
           alert(err.response.data.message);
           navigate("/login");
         } else {
           alert("Internal server error");
           navigate("/maintenance");
         }
       })
       .finally(() => {
         setLoading(false);
       });
  };

  return (
    <>
      <div className="centroid_editUserWrapper">
        <div className="centroid_editUserContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editUser_name">
                <p>Name : </p>
              <p>{inputs.name}</p>
            </div>
            <div className="centroid_editUser_list">
              <label htmlFor="type">Choose Type</label>
              <select
                id="type"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.type}
              >
                <option value={""}>Select</option>
                <option value={"emp"}>Employee</option>
                <option value={"admin"}>Admin</option>
              </select>
              {inputs.type && <p>{inputs.type}</p>}
            </div>
            <div className="centroid_formSubmitContainer">
              <button
                type="submit"
                className="centroid_AddButton"
                disabled={loading}
              >
                {loading ? "editing" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserForm;
