import React, { useEffect, useState } from "react";
import "./addIssuesComp.scss";
import { useNavigate } from "react-router-dom";
import { addIssue, getUOMs } from "../../../../repository/customerRejection/capa";
import Select from 'react-select'

const AddIssuesComp = ({invoice_id}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState({
    uoms:[]
  });
  const [inputs, setInputs] = useState({
    invoice_id: invoice_id,
    description: "",
    rejected_qty: "",
    uom:""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "description": {
        setInputs((state) => ({ ...state, description: e.target.value }));
        break;
      }
      case "rejected_qty": {
        setInputs((state) => ({ ...state, rejected_qty: e.target.value }));
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
       addIssue(inputs)
         .then((result) => {
           alert("Problem added");
           window.history.back();
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
    getUOMs()
    .then((result) => {
      setSelections({
          uoms : result.uoms
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
  },[])

  return (
    <>
      <div className="centroid_addIssueWrapper">
        <div className="centroid_addIssueContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addIssue_input">
              <label htmlFor="description">Problem</label>
              <input
                id="description"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.description}
              />
            </div>
            <div className="centroid_addIssue_input">
              <label htmlFor="rejected_qty">Rejected Qty</label>
              <input
                id="rejected_qty"
                type="number"
                max={99999}
                onChange={handleInputChange}
                value={inputs.rejected_qty}
              />
            </div>
            <div className="centroid_addIssue_search_list">
              <label htmlFor="uom">UOM</label>
              <Select
                className="centroid_search_select"
                options={selections.uoms}
                id="uom"
                value={selections.uoms.find(
                  (option) => option.value === inputs.uom
                )}
                onChange={(option) => handleSelectChange(option, 'uom')}
                required
              />
              {inputs.uom && (
                <p>
                  {
                    selections.uoms.filter(
                      (f) => f.value === Number(inputs.uom)
                    )[0].label
                  }
                </p>
              )}
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

export default AddIssuesComp;
