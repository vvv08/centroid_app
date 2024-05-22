import React, { useEffect, useState } from "react";
import "./addRejectionEntry.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { addRejectionEntry, getMasterData } from "../../../repository/rejectionEntry";

const AddRejectionEntry = ({ id }) => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    machines:[],
    operators:[],
    operations:[],
    reasons:[],
    work_order:""
  });
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    work_order: id || "",
    operator: "",
    operation: "",
    machine: "",
    reason: "",
    rejection_qty: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "rejection_qty": {
        setInputs((state) => ({ ...state, rejection_qty: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
    }
  };

  const handleSelectChange = (selectedOption, field) => {
    setInputs((state) => ({ ...state, [field]: selectedOption.value }));
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     addRejectionEntry(inputs)
       .then((result) => {
         alert("Rejection entry added");
         navigate("/rejectionEntry");
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
    getMasterData(id)
      .then((result) => {
        setSelections({
            machines:result.machines,
            operators:result.operators,
            operations:result.operations,
            reasons:result.reasons,
            work_order:result.work_order.work_order || ""
        })
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
      <div className="centroid_addRejectionEntryWrapper">
        <div className="centroid_addRejectionEntryContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addRejectionEntry_input">
              <label htmlFor="work_order">Work Order</label>
              <input
                id="work_order"
                type="text"
                value={selections.work_order}
                disabled={true}
              />
            </div>
            <div className="centroid_addRejectionEntry_search_list">
              <label htmlFor="operation">Operation</label>
              <Select
                className="centroid_search_select"
                options={selections.operations}
                id="operation"
                value={selections.operations.find(
                  (option) => option.value === inputs.operation
                )}
                onChange={(option) => handleSelectChange(option, 'operation')}
                required
              />
              {inputs.operation && (
                <p>
                  {
                    selections.operations.filter(
                      (f) => f.value === Number(inputs.operation)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addRejectionEntry_search_list">
              <label htmlFor="machine">Machine</label>
              <Select
                className="centroid_search_select"
                options={selections.machines}
                id="machine"
                value={selections.machines.find(
                  (option) => option.value === inputs.machine
                )}
                onChange={(option) => handleSelectChange(option, 'machine')}
                required
              />
              {inputs.machine && (
                <p>
                  {
                    selections.machines.filter(
                      (f) => f.value === Number(inputs.machine)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addRejectionEntry_search_list">
              <label htmlFor="operator">Operator</label>
              <Select
                className="centroid_search_select"
                options={selections.operators}
                id="operator"
                value={selections.operators.find(
                  (option) => option.value === inputs.operator
                )}
                onChange={(option) => handleSelectChange(option, 'operator')}
                required
              />
              {inputs.operator && (
                <p>
                  {
                    selections.operators.filter(
                      (f) => f.value === Number(inputs.operator)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addRejectionEntry_search_list">
              <label htmlFor="reason">Reason for rejection</label>
              <Select
                className="centroid_search_select"
                options={selections.reasons}
                id="operation"
                value={selections.reasons.find(
                  (option) => option.value === inputs.reason
                )}
                onChange={(option) => handleSelectChange(option, 'reason')}
                required
              />
              {inputs.reason && (
                <p>
                  {
                    selections.reasons.filter(
                      (f) => f.value === Number(inputs.reason)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addRejectionEntry_input">
              <label htmlFor="rejection_qty">Rejections (Kg)</label>
              <input
                id="rejection_qty"
                type="number"
                max={99999}
                value={inputs.rejection_qty}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_addRejectionEntry_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="type"
                value={inputs.remarks}
                required
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

export default AddRejectionEntry;
