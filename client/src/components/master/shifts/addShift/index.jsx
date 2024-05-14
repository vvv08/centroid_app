import React, { useState } from "react";
import "./addShift.scss";
import { useNavigate } from "react-router-dom";
import { addOperatorMaster, addShiftMaster } from "../../../../repository/master";

const AddShiftMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    description: "",
    shift:"",
    status: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "description": {
        setInputs((state) => ({ ...state, description: e.target.value }));
        break;
      }
      case "shift": {
        setInputs((state) => ({ ...state, shift: e.target.value.replace(/[^\d]/g, '') }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addShiftMaster(inputs)
      .then((result) => {
        alert("Shift added");
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
      <div className="centroid_addShiftWrapper">
        <div className="centroid_addShiftContainer">
          <form onSubmit={handleSubmit}>
          <div className="centroid_addShift_input">
              <label htmlFor="shift">Shift Number</label>
              <input id="shift" type="number" onChange={handleInputChange} value={inputs.shift}/>
            </div>
            <div className="centroid_addShift_input">
              <label htmlFor="description">Description</label>
              <input id="description" type="text" required onChange={handleInputChange} value={inputs.description}/>
            </div>
            <div className="centroid_addShift_list">
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

export default AddShiftMaster;
