import React, { useEffect, useState } from "react";
import "./editInspector.scss";
import { useNavigate } from "react-router-dom";
import {
    editInspectorMaster,
  getInspectorDetails
} from "../../../../repository/master";

const EditInspectorMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    inspector_id: "",
    name: "",
    status: "",
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editInspectorMaster(inputs)
      .then((result) => {
        alert("Inspector edited");
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
    getInspectorDetails(id)
      .then((result) => {
        setInputs({
          inspector_id: result.inspector_id || "",
          name: result.name || "",
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
      <div className="centroid_editInspectorWrapper">
        <div className="centroid_editInspectorContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editInspector_input">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editInspector_list">
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

export default EditInspectorMaster;
