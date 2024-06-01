import React, { useEffect, useState } from "react";
import "./editCorrectiveComp.scss";
import { useNavigate } from "react-router-dom";
import {
  editCorrective,
  getCorrectiveDetail,
  getInspectorsCAPA,
} from "../../../../repository/customerRejection/capa";
import Select from 'react-select';
import { dateFormatter } from "../../../../../../server/validations/validations";

const EditCorrectiveComp = ({ corrective_id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inspectors, setInspectors] = useState([]);
  const [inputs, setInputs] = useState({
    corrective_id: corrective_id,
    issue: "",
    inspector: "",
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

  const handleSelectChange = (selectedOption, field) => {
    setInputs((state) => ({ ...state, [field]: selectedOption.value || ""  }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editCorrective(inputs)
      .then((result) => {
        alert("Corrective action edited");
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
    getCorrectiveDetail(corrective_id)
      .then((result) => {
        setInputs({
          corrective_id: corrective_id,
          issue: result.problem || "",
          description: result.corrective_action || "",
          remarks: result.remarks || "",
          inspector: result.inspector_id || "",
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
    getInspectorsCAPA()
      .then((result) => {
        setInspectors(result);
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
      <div className="centroid_editCorrectiveWrapper">
        <div className="centroid_editCorrectiveContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editCorrective_input">
              <label htmlFor="issue">Issue</label>
              <input
                id="issue"
                type="text"
                required
                value={inputs.issue}
                disabled={true}
              />
            </div>
            {inspectors.filter(
              (f) => f.value === Number(inputs.inspector)
            )[0] && (
              <div className="centroid_editCorrective_search_list">
                <label htmlFor="inspector">Inspector</label>
                <Select
                  className="centroid_search_select"
                  options={inspectors}
                  id="inspector"
                  value={inspectors.find(
                    (option) => option.value === inputs.inspector
                  )}
                  onChange={(option) => handleSelectChange(option, "inspector")}
                  required
                />
                {inputs.inspector && (
                  <p>
                    {
                      inspectors.filter(
                        (f) => f.value === Number(inputs.inspector)
                      )[0].label
                    }
                  </p>
                )}
              </div>
            )}
            <div className="centroid_editCorrective_input">
              <label htmlFor="description">Corrective action</label>
              <input
                id="description"
                type="text"
                required
                value={inputs.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editCorrective_input">
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

export default EditCorrectiveComp;
