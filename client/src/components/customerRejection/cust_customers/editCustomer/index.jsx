import React, { useEffect, useState } from "react";
import "./editCustomerComp.scss";
import { useNavigate } from "react-router-dom";
import { editCustomer, getCustomerDetail } from "../../../../repository/customerRejection/customer";

const EditCustomerComp = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    customer_id: "",
    name: "",
    status: "",
    remarks: ""
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
    editCustomer(inputs)
      .then((result) => {
        alert("Customer edited");
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

  useEffect(() => {
    getCustomerDetail(id)
      .then((result) => {
        setInputs({
          customer_id: result.customer_id || "",
          name: result.name || "",
          status: result.status || "",
          remarks : result.remarks || ""
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
      <div className="centroid_editCustomerWrapper">
        <div className="centroid_editCustomerContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editCustomer_input">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editCustomer_list">
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
            <div className="centroid_editCustomer_input">
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

export default EditCustomerComp;
