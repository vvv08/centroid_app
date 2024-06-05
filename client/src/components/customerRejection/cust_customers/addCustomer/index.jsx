import React, { useState } from "react";
import "./addCustomerComp.scss";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../../../repository/customerRejection/customer";

const AddCustomerComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    status: "",
    remarks : ""
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
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     addCustomer(inputs)
       .then((result) => {
         alert("Customer added");
         navigate("/customerMaster");
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
      <div className="centroid_addCustomerWrapper">
        <div className="centroid_addCustomerContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addCustomer_input">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" required onChange={handleInputChange} value={inputs.name}/>
            </div>
            <div className="centroid_addCustomer_list">
              <label htmlFor="status">Choose Status</label>
              <select id="status" type="text" required onChange={handleInputChange} value={inputs.status}>
                <option value={""}>Select</option>
                <option value={"active"}>Active</option>
                <option value={"inactive"}>Inactive</option>
              </select>
              {inputs.status && <p>{inputs.status}</p>}
            </div>
            <div className="centroid_addCustomer_input">
              <label htmlFor="remarks">Remarks</label>
              <input id="remarks" type="text" onChange={handleInputChange} value={inputs.remarks}/>
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

export default AddCustomerComp;
