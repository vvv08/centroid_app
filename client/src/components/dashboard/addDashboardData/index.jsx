import React, { useEffect, useState } from "react";
import "./addDasboardData.scss";
import { useNavigate } from "react-router-dom";
import { addEntry, getInputData } from "../../../repository/dashboardRepository";
import { dateFormatter, timeFormatter } from "../../../validations/validations";
import Select from 'react-select';

const AddDashboardData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLists , setDataLists] = useState({});
  const [inputs, setInputs] = useState({
    entry_date: "",
    shift: "",
    inspector: "",
    work_order: "",
    production_qty: "",
    remarks:"",
    production_from:"",
    production_to:"",
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
    setInputs((state) => ({ ...state, [field]: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    addEntry(inputs).then((result) => {
      alert("Entry added");
      navigate('/')
    }).catch((err) => {
      if(err.response.data.status === "authenticationError"){
        alert(err.response.data.message)
        navigate('/login')
      }else{
        alert("Internal server error!")
        navigate('/maintenance')
      }
    }).finally(() => {
      setLoading(false)
    })
  };

  useEffect(() => {
    getInputData().then((result) => {
      setDataLists(result)
    })
  }, []);

  return (
    <>
      <div className="centroid_addDashboardDataWrapper">
        <div className="centroid_addDashboardDataContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="entry_date">Date</label>
              <input
                id="entry_date"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.entry_date}
                required
              />
              {inputs.entry_date && <p>{`${dateFormatter(inputs.entry_date.substr(0 , 10))}, ${timeFormatter(inputs.entry_date.substr(11,5))}`}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="shift">Choose Shift</label>
              <select
                id="shift"
                type="text"
                onChange={handleInputChange}
                value={inputs.shift}
                required
              >
                <option value="">Select</option>
                {dataLists.shifts && dataLists.shifts.map((obj) => {
                  return(
                    <option value={obj.shift_id} key={obj.shift_id}>{obj.shift}</option>
                  )
                })}
              </select>
              {inputs.shift && <p>{dataLists.shifts.filter((f) => f.shift_id === Number(inputs.shift))[0].description}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="production_from">Production start</label>
              <input
                id="production_from"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.production_from}
                required
              />
              {inputs.production_from && <p>{`${dateFormatter(inputs.production_from.substr(0 , 10))}, ${timeFormatter(inputs.production_from.substr(11,5))}`}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="production_to">Production end</label>
              <input
                id="production_to"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.production_to}
                min={inputs.production_from}
                required
              />
              {inputs.production_to && <p>{`${dateFormatter(inputs.production_to.substr(0 , 10))}, ${timeFormatter(inputs.production_to.substr(11,5))}`}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="inspector">Choose Inspector</label>
              <select
                id="inspector"
                type="text"
                onChange={handleInputChange}
                value={inputs.inspector}
                required
              >
                <option value="">Select</option>
                {dataLists.inspectors && dataLists.inspectors.map((obj) => {
                  return(
                    <option value={obj.inspector_id} key={obj.inspector_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.inspector && <p>{dataLists.inspectors.filter((f) => f.inspector_id === Number(inputs.inspector))[0].name}</p>}
            </div>
            <div className="centroid_addDashboardData_search_list">
              <label htmlFor="work_order">Work Order</label>
              {dataLists.work_orders && <Select
                className="centroid_search_select"
                options={dataLists.work_orders}
                id="work_order"
                value={dataLists.work_orders.find(
                  (option) => option.value === inputs.work_order
                )}
                onChange={(option) => handleSelectChange(option, 'work_order')}
                required
              />}
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
            <div className="centroid_addDashboardData_input">
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
            <div className="centroid_addDashboardData_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="text"
                onChange={handleInputChange}
                value={inputs.remarks}
              />
            </div>
            <div className="centroid_formSubmitContainer">
              <button type="submit" className="centroid_AddButton" disabled = {loading}>{loading ? "adding" :"Add Entry"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDashboardData;
