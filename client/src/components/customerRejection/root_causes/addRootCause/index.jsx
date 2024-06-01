import React, { useEffect, useState } from "react";
import "./addRootCauseComp.scss";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { addRootCause, getIssuesByInvoice } from "../../../../repository/customerRejection/capa";

const AddRootCauseComp = ({invoice_id}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState({
    issues:[]
  });
  const [inputs, setInputs] = useState({
    issue: "",
    inspector : "",
    description : "",
    remarks: ""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "description": {
        setInputs((state) => ({ ...state, description: e.target.value }));
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
         addRootCause(inputs)
           .then((result) => {
             alert("Root Cause added");
             window.history.back()
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
    getIssuesByInvoice(invoice_id)
      .then((result) => {
        setSelections({
            issues : result
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
      <div className="centroid_addRootCauseWrapper">
        <div className="centroid_addRootCauseContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addRootCause_search_list">
              <label htmlFor="issue">Issue</label>
              <Select
                className="centroid_search_select"
                options={selections.issues}
                id="issue"
                value={selections.issues.find(
                  (option) => option.value === inputs.issue
                )}
                onChange={(option) => handleSelectChange(option, 'issue')}
                required
              />
              {inputs.issue && (
                <p>
                  {
                    selections.issues.filter(
                      (f) => f.value === Number(inputs.issue)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addRootCause_input">
              <label htmlFor="description">Root Cause</label>
              <input
                id="description"
                type="text"
                onChange={handleInputChange}
                value={inputs.description}
              />
            </div>
            <div className="centroid_addRootCause_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="text"
                onChange={handleInputChange}
                value={inputs.remarks}
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

export default AddRootCauseComp;
