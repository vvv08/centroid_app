import React, { useEffect, useState } from "react";
import "./editUomComp.scss";
import { useNavigate } from "react-router-dom";
import { editUOM, getUOMDetails } from "../../../../repository/master";

const EditUOMMaster = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    uom_id: "",
    description: "",
    status: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "description": {
        setInputs((state) => ({ ...state, description: e.target.value }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     editUOM(inputs)
       .then((result) => {
         alert("UOM edited");
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
     getUOMDetails(id)
       .then((result) => {
         setInputs({
           uom_id: id || "",
           description: result.description || "",
           status: result.status || "",
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
      <div className="centroid_editUOMWrapper">
        <div className="centroid_editUOMContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editUOM_input">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                required
                value={inputs.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="centroid_editUOM_list">
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
              {inputs.status && <p>{inputs.status}</p>}
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

export default EditUOMMaster;
