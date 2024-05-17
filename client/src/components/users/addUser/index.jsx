import React, { useEffect, useState } from "react";
import "./addUserForm.scss";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../repository/users";

const AddUserForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pass_Match, setPass_Match] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    type: "",
    password_one: "",
    password_confirmed: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "name": {
        setInputs((state) => ({ ...state, name: e.target.value }));
        break;
      }
      case "type": {
        setInputs((state) => ({ ...state, type: e.target.value }));
        break;
      }
      case "password_one": {
        setInputs((state) => ({ ...state, password_one: e.target.value }));
        break;
      }
      case "password_confirmed": {
        setInputs((state) => ({
          ...state,
          password_confirmed: e.target.value,
        }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addUser(inputs)
      .then((result) => {
        alert("User added");
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

  useEffect(() => {
    if (inputs.password_one) {
      if (inputs.password_one === inputs.password_confirmed) {
        setPass_Match(true);
      } else {
        setPass_Match(false);
      }
    }
  }, [inputs.password_confirmed]);

  return (
    <>
      <div className="centroid_addUserWrapper">
        <div className="centroid_addUserContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addUser_input">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.name}
              />
            </div>
            <div className="centroid_addUser_list">
              <label htmlFor="type">Choose Type</label>
              <select
                id="type"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.type}
              >
                <option value={""}>Select</option>
                <option value={"emp"}>emp</option>
                <option value={"admin"}>Admin</option>
              </select>
              {inputs.type && <p>{inputs.type}</p>}
            </div>
            <div className="centroid_addUser_input">
              <label htmlFor="password_one">Password</label>
              <input
                id="password_one"
                type="password"
                required
                onChange={handleInputChange}
                value={inputs.password_one}
              />
            </div>
            <div className="centroid_addUser_input">
              <label htmlFor="password_confirmed">Confirm password</label>
              <input
                id="password_confirmed"
                type="password"
                required
                onChange={handleInputChange}
                value={inputs.password_confirmed}
              />
            </div>
            {!pass_Match && inputs.password_confirmed && (
              <p style={{"color" : "var(--centroidMaroon"}}>Passwords not matching</p>
            )}
            {pass_Match && (
              <div className="centroid_formSubmitContainer">
                <button
                  type="submit"
                  className="centroid_AddButton"
                  disabled={loading}
                >
                  {loading ? "adding" : "Add"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
