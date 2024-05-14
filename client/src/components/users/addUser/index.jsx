import React, { useState } from "react";
import "./addDefect.scss";
import { useNavigate } from "react-router-dom";
import { addDefectMaster } from "../../../../repository/master";

const AddDefectMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    status: "",
    type:"",
    password_one:"",
    password_confirmed:""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "name": {
        setInputs((state) => ({ ...state, name: e.target.value }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
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
        setInputs((state) => ({ ...state, password_confirmed: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addDefectMaster(inputs)
      .then((result) => {
        alert("Defect added");
        navigate("/masterData");
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
      <div className="centroid_addDefectWrapper">
        <div className="centroid_addDefectContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addDefect_input">
              <label htmlFor="description">Description</label>
              <input id="description" type="text" required onChange={handleInputChange} value={inputs.description}/>
            </div>
            <div className="centroid_addDefect_list">
              <label htmlFor="status">Choose Status</label>
              <select id="status" type="text" required onChange={handleInputChange} value={inputs.status}>
                <option value={""}>Select</option>
                <option value={"active"}>Active</option>
                <option value={"inactive"}>Inactive</option>
              </select>
              {inputs.status && <p>{inputs.status}</p>}
            </div>
            <div className="centroid_formSubmitContainer">
              <button
                type="submit"
                className="centroid_AddButton"
                disabled={loading}
              >
                {loading ? "adding" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDefectMaster;
