import React, { useEffect, useState, useRef } from "react";
import "./customerRejectionHomePage.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getInvoicesCAPA } from "../../../repository/customerRejection/capa";
import CustomerNavbar from "../../../components/customerRejection/cust_navbar";

const CustomerRejectionPage = () => {
  const [inputs, setInputs] = useState({
    invoice: "",
  });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSelectChange = (selectedOption, field) => {
    setInputs((state) => ({ ...state, [field]: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedInvoice = invoices.find(
      (invoice) => invoice.value === Number(inputs.invoice)
    );
    if (selectedInvoice) {
      navigate(
        `/customerRejectionReport/${inputs.invoice}/${encodeURIComponent(selectedInvoice.label)}`
      );
    }
  }


  useEffect(() => {
    setLoading(true);
    getInvoicesCAPA()
      .then((result) => {
        setInvoices(result);
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert(err.response.data.Message);
          navigate("/maintenance");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="centroid_customerRejectionPageWrapper">
        <CustomerNavbar current_tab={"rejection"}/>
        <form onSubmit={handleSubmit}>
          <div className="centroid_customerRejectionPageList">
            <div className="centroid_customerRejectionPage_list_content">
              <label htmlFor="invoice">Choose a Invoice number :</label>
              <Select
                id="invoice"
                required
                className="customerRejectionPage_select"
                options={invoices}
                onChange={(option) => handleSelectChange(option, "invoice")}
                value={invoices.find(
                  (option) => option.value === inputs.invoice
                )}
              />
              {inputs.invoice && (
                <p>
                  {
                    invoices.filter(
                      (f) => f.value === Number(inputs.invoice)
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
                  Report
                </button>
              </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerRejectionPage;
