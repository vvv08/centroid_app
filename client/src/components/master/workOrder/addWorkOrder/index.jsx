import React, { useEffect, useState } from "react";
import "./addWorkOrder.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { addWorkOrder, getActivePartNumbers } from "../../../../repository/master";

const AddWorkOrderMaster = () => {
  const navigate = useNavigate();
  const [partNumbers, setPartNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    part_number: "",
    part_name: "",
    part_cost: "",
    status: "",
    remarks: "",
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
      addWorkOrder(inputs)
        .then((result) => {
          alert("Work order added");
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
    getActivePartNumbers()
      .then((result) => {
        setPartNumbers(result);
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
      <div className="centroid_addWorkOrderWrapper">
        <div className="centroid_addWorkOrderContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addWorkOrder_input">
              <label htmlFor="work_order">Work Order</label>
              <input
                id="work_order"
                type="text"
                value={inputs.work_order}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addWorkOrder_search_list">
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
            </div>
            <div className="centroid_addWorkOrder_input">
              <label htmlFor="total_mix">Total mix (Kg)</label>
              <input
                id="total_mix"
                type="number"
                max={99999}
                value={inputs.total_mix}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addWorkOrder_list">
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
              {inputs.status && (
                <p>{inputs.status === "active" ? "Active" : "Inactive"}</p>
              )}
            </div>
            <div className="centroid_addWorkOrder_input">
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

export default AddWorkOrderMaster;
