import React, { useEffect, useState } from "react";
import "./editRejectionEntryComp.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { editRejectionEntry, getRejectionEntryEdit } from "../../../repository/rejectionEntry";

const EditRejectionEntryComp = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState({
    machines: [],
    operators: [],
    operations: [],
    reasons: [],
    work_order: {},
  });
  const [inputs, setInputs] = useState({
    id: "",
    work_order: "",
    machine: "",
    operation: "",
    operator: "",
    reason: "",
    remarks: "",
    rejection_qty: "",
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
    setInputs((state) => ({ ...state, [field]: selectedOption.value || ""  }));
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     editRejectionEntry(inputs)
       .then((result) => {
         alert("Rejection edited");
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
    getRejectionEntryEdit(id)
      .then((result) => {
        setInputs({
          id: result.rejection_entry.rejection_id || "",
          work_order: result.rejection_entry.work_order_id || "",
          operation: result.rejection_entry.operation_id || "",
          operator: result.rejection_entry.operator_id || "",
          machine: result.rejection_entry.machine_id || "",
          reason: result.rejection_entry.defect_id || "",
          rejection_qty: result.rejection_entry.rejection_qty || "",
          remarks: result.rejection_entry.remarks || "",
        });
        setSelections({
          operations: result.operations || "",
          operators: result.operators || "",
          reasons: result.reasons || "",
          machines: result.machines || "",
          work_order: result.work_order || "",
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
      <div className="centroid_editRejectionEntryWrapper">
        <div className="centroid_editRejectionEntryContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editRejectionEntry_input">
              <label htmlFor="work_order">Work Order</label>
              <input
                id="work_order"
                type="text"
                value={selections.work_order.work_order}
                disabled={true}
              />
            </div>
            {selections.operations.filter(
              (f) => f.value === Number(inputs.operation)
            )[0] && (
              <div className="centroid_editRejectionEntry_search_list">
                <label htmlFor="operation">Operation</label>
                <Select
                  className="centroid_search_select"
                  options={selections.operations}
                  id="operation"
                  value={selections.operations.find(
                    (option) => option.value === inputs.operation
                  )}
                  onChange={(option) => handleSelectChange(option, "operation")}
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
            )}
            {selections.machines.filter(
              (f) => f.value === Number(inputs.machine)
            )[0] && (
              <div className="centroid_editRejectionEntry_search_list">
                <label htmlFor="machine">Machine</label>
                <Select
                  className="centroid_search_select"
                  options={selections.machines}
                  id="machine"
                  value={selections.machines.find(
                    (option) => option.value === inputs.machine
                  )}
                  onChange={(option) => handleSelectChange(option, "machine")}
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
            )}
            {selections.operators.filter(
              (f) => f.value === Number(inputs.operator)
            )[0] && (
              <div className="centroid_editRejectionEntry_search_list">
                <label htmlFor="operator">Operator</label>
                <Select
                  className="centroid_search_select"
                  options={selections.operators}
                  id="operator"
                  value={selections.operators.find(
                    (option) => option.value === inputs.operator
                  )}
                  onChange={(option) => handleSelectChange(option, "operator")}
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
            )}
            {selections.reasons.filter(
              (f) => f.value === Number(inputs.reason)
            )[0] && (
              <div className="centroid_editRejectionEntry_search_list">
                <label htmlFor="reason">Reason for rejection</label>
                <Select
                  className="centroid_search_select"
                  options={selections.reasons}
                  id="reason"
                  value={selections.reasons.find(
                    (option) => option.value === inputs.reason
                  )}
                  onChange={(option) => handleSelectChange(option, "reason")}
                  required
                />
                {inputs.reason && selections.reasons && (
                  <p>
                    {
                      selections.reasons.filter(
                        (f) => f.value === Number(inputs.reason)
                      )[0].label
                    }
                  </p>
                )}
              </div>
            )}
            <div className="centroid_editRejectionEntry_input">
              <label htmlFor="rejection_qty">Rejection Qty (Kg)</label>
              <input
                id="rejection_qty"
                type="number"
                required
                max={99999}
                value={inputs.rejection_qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editRejectionEntry_input">
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

export default EditRejectionEntryComp;
