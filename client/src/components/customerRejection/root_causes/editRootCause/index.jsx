import React, { useEffect, useState } from "react";
import "./editRootCauseComp.scss";
import { useNavigate } from "react-router-dom";
import { editRootCause, getRootCause } from "../../../../repository/customerRejection/capa";

const EditRootCauseComp = ({ root_id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    root_id: root_id,
    issue: "",
    description: "",
    remarks: "",
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

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     editRootCause(inputs)
       .then((result) => {
         alert("Root cause edited");
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
     getRootCause(root_id)
       .then((result) => {
         setInputs({
           root_id: root_id,
           issue: result.problem || "",
           description: result.root_cause || "",
           remarks: result.remarks || ""
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
      <div className="centroid_editRootCauseWrapper">
        <div className="centroid_editRootCauseContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editRootCause_input">
              <label htmlFor="issue">Issue</label>
              <input
                id="issue"
                type="text"
                required
                value={inputs.issue}
                disabled={true}
              />
            </div>
            <div className="centroid_editRootCause_input">
              <label htmlFor="description">Root cause</label>
              <input
                id="description"
                type="text"
                required
                value={inputs.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editRootCause_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="text"
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

export default EditRootCauseComp;
