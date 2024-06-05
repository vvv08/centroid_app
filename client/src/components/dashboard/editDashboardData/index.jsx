import React, { useEffect, useState } from "react";
import "./editDashboardData.scss";
import { useNavigate } from "react-router-dom";
import {
  editEntry,
  getEntryForEdit,
  getInputData,
} from "../../../repository/dashboardRepository";
import { dateFormatter, timeFormatter } from "../../../validations/validations";
import Select from "react-select";

const EditDashboardData = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLists, setDataLists] = useState({});
  const [inputs, setInputs] = useState({
    entry_date: "",
    shift: "",
    inspector: "",
    work_order: "",
    production_qty: "",
    remarks: "",
    production_from: "",
    production_to: "",
    shift_status: "",
    shift_desc: "",
    inspector_status: "",
    inspector_name: "",
    work_order_status: "",
    work_order_number: "",
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "entry_date": {
        setInputs((state) => ({ ...state, entry_date: e.target.value }));
        break;
      }
      case "shift": {
        setInputs((state) => ({ ...state, shift: e.target.value }));
        break;
      }
      case "inspector": {
        setInputs((state) => ({ ...state, inspector: e.target.value }));
        break;
      }
      case "production_qty": {
        setInputs((state) => ({ ...state, production_qty: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
      case "production_from": {
        setInputs((state) => ({ ...state, production_from: e.target.value }));
        break;
      }
      case "production_to": {
        setInputs((state) => ({ ...state, production_to: e.target.value }));
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
    editEntry(inputs)
      .then((result) => {
        alert("Entry edited");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert("Internal server error!");
          navigate("/maintenance");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getEntryForEdit(id).then((result) => {
      setInputs({
        id: result.Id,
        entry_date: result.date || "",
        shift: result.shift_id || "",
        inspector: result.inspector_id || "",
        work_order: result.work_order_id || "",
        production_qty: result.production_qty || "",
        remarks: result.remarks || "",
        production_from: result.production_from || "",
        production_to: result.production_to || "",
        shift_status: result.shift_status || "",
        shift_desc: result.shift || "",
        inspector_status: result.inspector_status || "",
        inspector_name: result.inspector || "",
        work_order_status: result.work_order_status || "",
        work_order_number: result.work_order || "",
      });
    });
    getInputData().then((result) => {
      setDataLists(result);
    });
  }, []);

  console.log(dataLists)

  return (
    <>
      <div className="centroid_editDashboardDataWrapper">
        <div className="centroid_editDashboardDataContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editDashboardData_list">
              <label htmlFor="entry_date">Date</label>
              <input
                id="entry_date"
                type="datetime-local"
                value={inputs.entry_date}
                onChange={handleInputChange}
                required
              />
              {inputs.entry_date && (
                <p>{`${dateFormatter(
                  inputs.entry_date.substr(0, 10)
                )}, ${timeFormatter(inputs.entry_date.substr(11, 5))}`}</p>
              )}
            </div>
            {inputs.shift_status === "inactive" ? (
              <div className="centroid_editDashboardData_list">
                <label htmlFor="shift">Shift (Inactive)</label>
                <input
                  id="shift"
                  type="text"
                  value={inputs.shift_desc}
                  disabled={true}
                  required
                />
              </div>
            ) : (
              dataLists.shifts &&
              dataLists.shifts.filter(
                (f) => f.shift_id === Number(inputs.shift)
              )[0] && (
                <div className="centroid_editDashboardData_list">
                  <label htmlFor="shift">Choose Shift</label>
                  <select
                    id="shift"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.shift}
                    required
                  >
                    {/* <option value="">Select</option> */}
                    {dataLists.shifts &&
                      dataLists.shifts.map((obj) => {
                        return (
                          <option value={obj.shift_id} key={obj.shift_id}>
                            {obj.shift}
                          </option>
                        );
                      })}
                  </select>
                  {inputs.shift && dataLists.shifts && (
                    <p>
                      {
                        dataLists.shifts.filter(
                          (f) => f.shift_id === Number(inputs.shift)
                        )[0].description
                      }
                    </p>
                  )}
                </div>
              )
            )}
            <div className="centroid_editDashboardData_list">
              <label htmlFor="production_from">Production Start</label>
              <input
                id="production_from"
                type="datetime-local"
                value={inputs.production_from}
                onChange={handleInputChange}
                required
              />
              {inputs.production_from && (
                <p>{`${dateFormatter(
                  inputs.production_from.substr(0, 10)
                )}, ${timeFormatter(inputs.production_from.substr(11, 5))}`}</p>
              )}
            </div>
            <div className="centroid_editDashboardData_list">
              <label htmlFor="production_to">Production end</label>
              <input
                id="production_to"
                type="datetime-local"
                value={inputs.production_to}
                onChange={handleInputChange}
                min={inputs.production_from}
                required
              />
              {inputs.production_to && (
                <p>{`${dateFormatter(
                  inputs.production_to.substr(0, 10)
                )}, ${timeFormatter(inputs.production_to.substr(11, 5))}`}</p>
              )}
            </div>
            {inputs.inspector_status === "inactive" ? (
              <div className="centroid_editDashboardData_list">
                <label htmlFor="inspector">Inspector (Inactive)</label>
                <input
                  id="inspector"
                  type="text"
                  value={inputs.inspector_name}
                  disabled={true}
                  required
                />
              </div>
            ) : (
              dataLists.inspectors &&
              dataLists.inspectors.filter(
                (f) => f.inspector_id === Number(inputs.inspector)
              )[0] && (
                <div className="centroid_editDashboardData_list">
                  <label htmlFor="inspector">Choose Inspector</label>
                  <select
                    id="inspector"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.inspector}
                    required
                  >
                    {/* <option value="">Select</option> */}
                    {dataLists.inspectors &&
                      dataLists.inspectors.map((obj) => {
                        return (
                          <option
                            value={obj.inspector_id}
                            key={obj.inspector_id}
                          >
                            {obj.name}
                          </option>
                        );
                      })}
                  </select>
                  {inputs.inspector && dataLists.defects && (
                    <p>
                      {
                        dataLists.inspectors.filter(
                          (f) => f.inspector_id === Number(inputs.inspector)
                        )[0].name
                      }
                    </p>
                  )}
                </div>
              )
            )}
            <div className="centroid_editDashboardData_list">
                <label htmlFor="work_order">Work Order</label>
                <input
                  id="work_order"
                  type="text"
                  value={inputs.work_order_number}
                  disabled={true}
                  required
                />
              </div>
            {dataLists.work_orders &&
              dataLists.work_orders.filter(
                (f) => f.value === Number(inputs.work_order)
              )[0] && (
                <div className="centroid_editDashboardData_search_list">
                  <label htmlFor="work_order">Work Order</label>
                  <Select
                    className="centroid_search_select"
                    options={dataLists.work_orders}
                    id="work_order"
                    value={dataLists.work_orders.find(
                      (option) => option.value === inputs.work_order
                    )}
                    onChange={(option) =>
                      handleSelectChange(option, "work_order")
                    }
                    required
                  />
                  {inputs.work_order && (
                    <p>
                      {
                        dataLists.work_orders.filter(
                          (f) => f.value === Number(inputs.work_order)
                        )[0].label
                      }
                    </p>
                  )}
                </div>
              )}
            <div className="centroid_editDashboardData_input">
              <label htmlFor="production_qty">Production Quantity</label>
              <input
                id="production_qty"
                type="number"
                onChange={handleInputChange}
                value={inputs.production_qty}
                max={inputs.total_mix}
                required
              />
            </div>
            <div className="centroid_editDashboardData_input">
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
                {loading ? "editing" : "Edit Entry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDashboardData;
