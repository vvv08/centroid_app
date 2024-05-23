import React, { useState } from "react";
import "./addPartNumber.scss";
import { useNavigate } from "react-router-dom";
import { addPartNumber } from "../../../../repository/master";

const AddPartNumbersMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    part_number : "",
    part_name: "",
    part_cost:"",
    status: "",
    remarks:""
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
      case "part_cost": {
        setInputs((state) => ({ ...state, part_cost: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
     }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     addPartNumber(inputs)
       .then((result) => {
         alert("Part number added");
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
      <div className="centroid_addPartNumbersWrapper">
        <div className="centroid_addPartNumbersContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addPartNumbers_input">
              <label htmlFor="part_number">Part Number</label>
              <input
                id="part_number"
                type="text"
                value={inputs.part_number}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addPartNumbers_input">
              <label htmlFor="part_name">Part Name</label>
              <input
                id="part_name"
                type="text"
                value={inputs.part_name}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addPartNumbers_input">
              <label htmlFor="part_cost">Cost (Rs/Kg)</label>
              <input
                id="part_cost"
                type="number"
                max={99999}
                value={inputs.part_cost}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addPartNumbers_list">
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
            <div className="centroid_addPartNumbers_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="type"
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
                {loading ? "adding" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPartNumbersMaster;
