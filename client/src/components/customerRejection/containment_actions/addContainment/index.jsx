import React, { useEffect, useState } from "react";
import "./addContainmentComp.scss";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { addContainment, getIssuesByInvoice } from "../../../../repository/customerRejection/capa";
import { dateFormatter } from "../../../../../../server/validations/validations";

const AddContainmentComp = ({invoice_id}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState({
    issues:[]
  });
  const [inputs, setInputs] = useState({
    issue: "",
    stock_check_supplier: "",
    supplier_date:"",
    stock_check_customer: "",
    customer_date:"",
    stock_check_production: "",
    production_date:"",
    stock_check_transit: "",
    transit_date:"",
    remarks: ""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "stock_check_supplier": {
        setInputs((state) => ({ ...state, stock_check_supplier: e.target.value }));
        break;
      }
      case "supplier_date": {
        setInputs((state) => ({ ...state, supplier_date: e.target.value }));
        break;
      }
      case "stock_check_production": {
        setInputs((state) => ({ ...state, stock_check_production: e.target.value }));
        break;
      }
      case "production_date": {
        setInputs((state) => ({ ...state, production_date: e.target.value }));
        break;
      }
      case "stock_check_customer": {
        setInputs((state) => ({ ...state, stock_check_customer: e.target.value }));
        break;
      }
      case "customer_date": {
        setInputs((state) => ({ ...state, customer_date: e.target.value }));
        break;
      }
      case "stock_check_transit": {
        setInputs((state) => ({ ...state, stock_check_transit: e.target.value }));
        break;
      }
      case "transit_date": {
        setInputs((state) => ({ ...state, transit_date: e.target.value }));
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
       addContainment(inputs)
         .then((result) => {
           alert("Containment added");
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
      <div className="centroid_addContainmentWrapper">
        <div className="centroid_addContainmentContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addContainment_search_list">
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
            <div className="centroid_addContainment_list">
              <label htmlFor="stock_check_supplier">Stock checked at Supplier</label>
              <select
                id="stock_check_supplier"
                type="text"
                onChange={handleInputChange}
                required
                value={inputs.stock_check_supplier}
              >
                <option value={""}>Select</option>
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
              {inputs.stock_check_supplier && <p>{inputs.stock_check_supplier === "yes" ? "Yes" : "No"}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="supplier_date">Supplier stock checked date</label>
              <input
                id="supplier_date"
                type="date"
                onChange={handleInputChange}
                required
                value={inputs.supplier_date}
              />
              {inputs.supplier_date && <p>{dateFormatter(inputs.supplier_date)}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="stock_check_customer">Stock checked at customer</label>
              <select
                id="stock_check_customer"
                type="text"
                onChange={handleInputChange}
                required
                value={inputs.stock_check_customer}
              >
                <option value={""}>Select</option>
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
              {inputs.stock_check_customer && <p>{inputs.stock_check_customer === "yes" ? "Yes" : "No"}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="customer_date">Customer stock checked date</label>
              <input
                id="customer_date"
                type="date"
                onChange={handleInputChange}
                required
                value={inputs.customer_date}
              />
              {inputs.customer_date && <p>{dateFormatter(inputs.customer_date)}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="stock_check_production">Stock checked at production</label>
              <select
                id="stock_check_production"
                type="text"
                onChange={handleInputChange}
                required
                value={inputs.stock_check_production}
              >
                <option value={""}>Select</option>
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
              {inputs.stock_check_production && <p>{inputs.stock_check_production === "yes" ? "Yes" : "No"}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="production_date">Production stock checked date</label>
              <input
                id="production_date"
                type="date"
                onChange={handleInputChange}
                required
                value={inputs.production_date}
              />
              {inputs.production_date && <p>{dateFormatter(inputs.production_date)}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="stock_check_transit">Stock checked at transit</label>
              <select
                id="stock_check_transit"
                type="text"
                onChange={handleInputChange}
                required
                value={inputs.stock_check_transit}
              >
                <option value={""}>Select</option>
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
              {inputs.stock_check_transit && <p>{inputs.stock_check_transit === "yes" ? "Yes" : "No"}</p>}
            </div>
            <div className="centroid_addContainment_list">
              <label htmlFor="transit_date">Transit stock checked date</label>
              <input
                id="transit_date"
                type="date"
                onChange={handleInputChange}
                required
                value={inputs.transit_date}
              />
              {inputs.transit_date && <p>{dateFormatter(inputs.transit_date)}</p>}
            </div>
            <div className="centroid_addContainment_input">
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

export default AddContainmentComp;
