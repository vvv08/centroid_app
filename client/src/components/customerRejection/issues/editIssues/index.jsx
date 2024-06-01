import React, { useEffect, useState } from "react";
import "./editIssuesComp.scss";
import { useNavigate } from "react-router-dom";
import {
  editIssue,
  getIssueDetails,
} from "../../../../repository/customerRejection/capa";

const EditIssuesComp = ({ cust_rej_id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    cust_rej_id: cust_rej_id,
    description: "",
    rejected_qty: "",
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
    editIssue(inputs)
      .then((result) => {
        alert("Issue edited");
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
    getIssueDetails(cust_rej_id)
      .then((result) => {
        setInputs({
          cust_rej_id: cust_rej_id,
          description: result.problem || "",
          rejected_qty: result.rejected_qty || "",
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
      <div className="centroid_editIssueWrapper">
        <div className="centroid_editIssueContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editIssue_input">
              <label htmlFor="description">Problem</label>
              <input
                id="description"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.description}
              />
            </div>
            <div className="centroid_editIssue_input">
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
                {loading ? "editing" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditIssuesComp;
