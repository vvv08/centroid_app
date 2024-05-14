import React, { useEffect, useState } from "react";
import "./editOperator.scss";
import { useNavigate } from "react-router-dom";
import {
  editOperatorMaster,
  getOperatorDetails,
} from "../../../../repository/master";

const EditOperatorMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    operator_id: "",
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
    editOperatorMaster(inputs)
      .then((result) => {
        alert("Operator edited");
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
    getOperatorDetails(id)
      .then((result) => {
        setInputs({
          operator_id: result.operator_id || "",
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
      <div className="centroid_editOperatorWrapper">
        <div className="centroid_editOperatorContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editOperator_input">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editOperator_list">
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

export default EditOperatorMaster;
