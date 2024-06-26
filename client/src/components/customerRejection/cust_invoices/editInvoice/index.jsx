import React, { useEffect, useState } from "react";
import "./editInvoiceComp.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  editInvoice,
  getInvoiceDetails,
} from "../../../../repository/customerRejection/invoice";

const EditInvoiceComp = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selections, setSelections] = useState({
    customers: [],
    work_orders: [],
  });
  const [inputs, setInputs] = useState({
    invoice_id: "",
    invoice_number: "",
    status: "",
    remarks: "",
    customer: "",
    customer_status: "",
    customer_name: "",
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
    setInputs((state) => ({ ...state, [field]: selectedOption.value || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editInvoice({ inputs, selectedOptions })
      .then((result) => {
        alert("Invoice edited");
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
    getInvoiceDetails(id)
      .then((result) => {
        setInputs({
          invoice_id: result.invoice.invoice_id || "",
          invoice_number: result.invoice.invoice_number || "",
          customer: result.invoice.customer_id || "",
          status: result.invoice.status || "",
          remarks: result.invoice.remarks || "",
          customer_status: result.invoice.customer_status || "",
          customer_name: result.invoice.customer || "",
        });
        setSelections({
          customers: result.customers || "",
          work_orders: result.work_orders || "",
        });
        setSelectedOptions(result.invoice_work_order || "");
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
      <div className="centroid_editInvoiceWrapper">
        <div className="centroid_editInvoiceContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editInvoice_input">
              <label htmlFor="invoice_number">Invoice number</label>
              <input
                id="invoice_number"
                type="text"
                required
                value={inputs.invoice_number}
                onChange={handleInputChange}
              />
            </div>
            {inputs.customer_status === "inactive" ? (
              <div className="centroid_editInvoice_input">
                <label htmlFor="customer">Customer (Inactive)</label>
                <input
                  id="customer"
                  type="text"
                  required
                  value={inputs.customer_name}
                  disabled={true}
                />
              </div>
            ) : (
              selections.customers[0] &&
              selections.customers.filter(
                (f) => f.value === Number(inputs.customer)
              )[0] && (
                <div className="centroid_editInvoice_search_list">
                  <label htmlFor="customer">Customer</label>
                  <Select
                    className="centroid_search_select"
                    options={selections.customers}
                    id="customer"
                    value={selections.customers.find(
                      (option) => option.value === inputs.customer
                    )}
                    onChange={(option) =>
                      handleSelectChange(option, "customer")
                    }
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
              )
            )}
            {!selections.work_orders.filter((f) =>
              selectedOptions.includes(f.value)
            )[0] && (
              <div className="centroid_editInvoice_search_list">
                <label htmlFor="work_order">Work order</label>
                <Select
                  isMulti
                  className="centroid_search_select"
                  options={selections.work_orders}
                  id="work_order"
                  value={selectedOptions}
                  onChange={handleChange}
                  required
                />
                {selectedOptions[0] && (
                  <div className="centroid_editInvoice_work_orders">
                    {selectedOptions.map((obj, index) => {
                      return <p key={index}>{obj.label}</p>;
                    })}
                  </div>
                )}
              </div>
            )}
            <div className="centroid_editInvoice_list">
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
            <div className="centroid_editInvoice_input">
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

export default EditInvoiceComp;
