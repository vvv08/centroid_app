import React, { useEffect, useState } from "react";
import "./editPartNumber.scss";
import { useNavigate } from "react-router-dom";
import {
  editPartNumber,
  getPartNumberDetails,
} from "../../../../repository/master";

const EditPartNumberMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    part_name: "",
    status: "",
    part_number: "",
    remarks: "",
    part_cost: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "part_name": {
        setInputs((state) => ({ ...state, part_name: e.target.value }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
        break;
      }
      case "part_number": {
        setInputs((state) => ({ ...state, part_number: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
      case "part_cost": {
        setInputs((state) => ({ ...state, part_cost: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editPartNumber(inputs)
      .then((result) => {
        alert("Part number edited");
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
    getPartNumberDetails(id)
      .then((result) => {
        setInputs({
          id: result.part_number_id || "",
          part_name: result.part_name || "",
          status: result.status || "",
          part_number: result.part_number || "",
          part_cost: result.part_cost || "",
          remarks: result.remarks || "",
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
      <div className="centroid_editPartNumberWrapper">
        <div className="centroid_editPartNumberContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editPartNumber_input">
              <label htmlFor="part_number">Part Number</label>
              <input
                id="part_number"
                type="text"
                required
                value={inputs.part_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editPartNumber_input">
              <label htmlFor="part_name">Part Name</label>
              <input
                id="part_name"
                type="text"
                required
                value={inputs.part_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editPartNumber_input">
              <label htmlFor="part_cost">Conversion Cost (Rs/Kg)</label>
              <input
                id="part_cost"
                type="text"
                required
                value={inputs.part_cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editPartNumber_list">
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
              {inputs.status && <p>{inputs.status === "active" ? "Active" : "Inactive"}</p>}
            </div>
            <div className="centroid_editPartNumber_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="text"
                required
                value={inputs.remarks}
                onChange={handleInputChange}
              />
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

export default EditPartNumberMaster;
