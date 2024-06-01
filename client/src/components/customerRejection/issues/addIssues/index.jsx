import React, { useState } from "react";
import "./addIssuesComp.scss";
import { useNavigate } from "react-router-dom";
import { addIssue } from "../../../../repository/customerRejection/capa";

const AddIssuesComp = ({invoice_id}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    invoice_id: invoice_id,
    description: "",
    rejected_qty: ""
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
              <label htmlFor="rejected_qty">Rejected Qty (Kg)</label>
              <input
                id="rejected_qty"
                type="number"
                max={99999}
                onChange={handleInputChange}
                value={inputs.rejected_qty}
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

export default AddIssuesComp;
