import React, { useState } from "react";
import "./addMachineLoss.scss";
import { useNavigate } from "react-router-dom";
import { addMachineLossMaster } from "../../../../repository/master";

const AddMachineLossMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    description: "",
    status: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "description": {
        setInputs((state) => ({ ...state, description: e.target.value }));
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
    addMachineLossMaster(inputs)
      .then((result) => {
        alert("Reason added");
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
      <div className="centroid_addMachineLossWrapper">
        <div className="centroid_addMachineLossContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addMachineLoss_input">
              <label htmlFor="description">Reason</label>
              <input id="description" type="text" required onChange={handleInputChange} value={inputs.description}/>
            </div>
            <div className="centroid_addMachineLoss_list">
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

export default AddMachineLossMaster;
