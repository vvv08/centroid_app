import React, { useEffect, useState } from "react";
import "./editWorkOrder.scss";
import { useNavigate } from "react-router-dom";
import {
  editWorkOrder,
  getWorkOrderDetails,
} from "../../../../repository/master";
import Select from 'react-select';

const EditWorkOrderMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [partNumbers , setPartNumbers] = useState([])
  const [inputs, setInputs] = useState({
    id: "",
    work_order: "",
    status: "",
    part_number: "",
    remarks: "",
    total_mix: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "work_order": {
        setInputs((state) => ({ ...state, work_order: e.target.value }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
        break;
      }
      case "total_mix": {
        setInputs((state) => ({ ...state, total_mix: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
    }
  };

  const handleSelectChange = (selectedOption) => {
    setInputs((state) => ({ ...state, part_number: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editWorkOrder(inputs)
      .then((result) => {
        alert("Work order edited");
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
    getWorkOrderDetails(id)
      .then((result) => {
        setInputs({
          id: result.work_order.work_order_id || "",
          work_order: result.work_order.work_order || "",
          status: result.work_order.status || "",
          part_number: result.work_order.part_number_id || "",
          total_mix: result.work_order.total_mix || "",
          remarks: result.work_order.remarks || "",
        });
        setPartNumbers(result.part_numbers);
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
      <div className="centroid_editWorkOrderWrapper">
        <div className="centroid_editWorkOrderContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editWorkOrder_input">
              <label htmlFor="work_order">Work Order</label>
              <input
                id="work_order"
                type="text"
                required
                value={inputs.work_order}
                onChange={handleInputChange}
              />
            </div>
            {partNumbers[0] && partNumbers.filter(
                      (f) => f.value === Number(inputs.part_number)
                    )[0].label && <div className="centroid_editWorkOrder_search_list">
              <label htmlFor="part_number">Choose Part Number</label>
              <Select
                className="centroid_search_select"
                options={partNumbers}
                id="part_number"
                value={partNumbers.find(
                  (option) => option.value === inputs.part_number
                )}
                onChange={handleSelectChange}
                required
              />
              {inputs.part_number && (
                <p>
                  {
                    partNumbers.filter(
                      (f) => f.value === Number(inputs.part_number)
                    )[0].label
                  }
                </p>
              )}
            </div>}
            <div className="centroid_editWorkOrder_input">
              <label htmlFor="total_mix">Total mix (Kg)</label>
              <input
                id="total_mix"
                type="text"
                required
                value={inputs.total_mix}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editWorkOrder_list">
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
            <div className="centroid_editWorkOrder_input">
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

export default EditWorkOrderMaster;
