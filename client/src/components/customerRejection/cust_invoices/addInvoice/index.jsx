import React, { useEffect, useState } from "react";
import "./addInvoiceComp.scss";
import { useNavigate } from "react-router-dom";
import {
  addInvoice,
  getDetails,
} from "../../../../repository/customerRejection/invoice";
import Select from "react-select";

const AddInvoiceComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selections, setSelections] = useState({
    customers: [],
    work_orders: [],
  });
  const [inputs, setInputs] = useState({
    invoice_number: "",
    status: "",
    remarks: "",
    customer: "",
  });

  const handleChange = (options) => {
    // Check if options is null or undefined, set to empty array if so
    setSelectedOptions(options || []);
  };

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "invoice_number": {
        setInputs((state) => ({ ...state, invoice_number: e.target.value }));
        break;
      }
      case "status": {
        setInputs((state) => ({ ...state, status: e.target.value }));
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
    addInvoice({ inputs, selectedOptions })
      .then((result) => {
        alert("Invoice added");
        navigate("/invoice");
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
    getDetails()
      .then((result) => {
        setSelections({
          customers: result.customers,
          work_orders: result.work_orders,
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
      <div className="centroid_addInvoicePageWrapper">
        <div className="centroid_addInvoicePageContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addInvoice_input">
              <label htmlFor="invoice_number">Invoice number</label>
              <input
                id="invoice_number"
                type="text"
                required
                onChange={handleInputChange}
                value={inputs.invoice_number}
              />
            </div>
            <div className="centroid_addInvoice_search_list">
              <label htmlFor="customer">Customer</label>
              <Select
                className="centroid_search_select"
                options={selections.customers}
                id="customer"
                value={selections.customers.find(
                  (option) => option.value === inputs.customer
                )}
                onChange={(option) => handleSelectChange(option, "customer")}
                required
              />
              {inputs.customer && (
                <p>
                  {
                    selections.customers.filter(
                      (f) => f.value === Number(inputs.customer)
                    )[0].label
                  }
                </p>
              )}
            </div>
            <div className="centroid_addInvoice_search_list">
              <label htmlFor="work_order">Work Order</label>
              <Select
                className="centroid_search_select"
                isMulti
                options={selections.work_orders}
                id="work_order"
                value={selectedOptions}
                onChange={handleChange}
                // value={selections.work_orders.find(
                //   (option) => option.value === inputs.work_order
                // )}
                //  onChange={(option) => handleSelectChange(option, 'work_order')}
                required
              />
              {selectedOptions[0] && (
                <div className="centroid_addInvoice_work_orders">
                    {selectedOptions.map((obj, index) => {
                      return <p key={index}>{obj.label}</p>;
                    })}
                </div>
              )}
            </div>
            <div className="centroid_addInvoice_list">
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
            <div className="centroid_addInvoice_input">
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

export default AddInvoiceComp;
