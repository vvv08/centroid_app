import React, { useEffect, useState } from "react";
import "./editShift.scss";
import { useNavigate } from "react-router-dom";
import {
  editShiftMaster,
  getShiftDetails
} from "../../../../repository/master";

const EditShiftMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    shift_id: "",
    shift:"",
    description: "",
    status: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "shift": {
        setInputs((state) => ({ ...state, shift: e.target.value.replace(/[^\d]/g, '') }));
        break;
      }
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
    editShiftMaster(inputs)
      .then((result) => {
        alert("Shift edited");
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

  useEffect(() => {
    getShiftDetails(id)
      .then((result) => {
        setInputs({
          shift_id: result.shift_id || "",
          shift:result.shift || "",
          description: result.description || "",
          status: result.status || "",
        });
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
  }, []);

  return (
    <>
      <div className="centroid_editShiftWrapper">
        <div className="centroid_editShiftContainer">
          <form onSubmit={handleSubmit}>
          <div className="centroid_editShift_input">
              <label htmlFor="shift">Shift Number</label>
              <input id="shift" type="number" onChange={handleInputChange} value={inputs.shift}/>
            </div>
            <div className="centroid_editShift_input">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                required
                value={inputs.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editShift_list">
              <label htmlFor="status">Choose Status</label>
              <select
                id="status"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.status}
              >
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
                {loading ? "editing" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditShiftMaster;
