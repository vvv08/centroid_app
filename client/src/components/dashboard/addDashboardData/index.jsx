import React, { useEffect, useState } from "react";
import "./addDasboardData.scss";
import { useNavigate } from "react-router-dom";
import { addEntry, getInputData } from "../../../repository/dashboardRepository";

const AddDashboardData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLists , setDataLists] = useState({});
  const [inputs, setInputs] = useState({
    entry_date: "",
    shift: "",
    machine: "",
    operator: "",
    operation: "",
    inspector: "",
    part_number: "",
    batch_number: "",
    production_qty: "",
    rejection_qty: "",
    defect: "",
    remarks:"",
    machine_loss:"",
    idle_time_from:"",
    idle_time_to:"",
    production_from:"",
    production_to:""
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
      case "machine": {
        setInputs((state) => ({ ...state, machine: e.target.value }));
        break;
      }
      case "operation": {
        setInputs((state) => ({ ...state, operation: e.target.value }));
        break;
      }
      case "operator": {
        setInputs((state) => ({ ...state, operator: e.target.value }));
        break;
      }
      case "inspector": {
        setInputs((state) => ({ ...state, inspector: e.target.value }));
        break;
      }
      case "part_number": {
        setInputs((state) => ({ ...state, part_number: e.target.value }));
        break;
      }
      case "batch_number": {
        setInputs((state) => ({ ...state, batch_number: e.target.value }));
        break;
      }
      case "production_qty": {
        setInputs((state) => ({ ...state, production_qty: e.target.value }));
        break;
      }
      case "rejection_qty": {
        setInputs((state) => ({ ...state, rejection_qty: e.target.value }));
        break;
      }
      case "defect": {
        setInputs((state) => ({ ...state, defect: e.target.value }));
        break;
      }
      case "remarks": {
        setInputs((state) => ({ ...state, remarks: e.target.value }));
        break;
      }
      case "machine_loss": {
        setInputs((state) => ({ ...state, machine_loss: e.target.value }));
        break;
      }
      case "idle_time_from": {
        setInputs((state) => ({ ...state, idle_time_from: e.target.value }));
        break;
      }
      case "idle_time_to": {
        setInputs((state) => ({ ...state, idle_time_to: e.target.value }));
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
              {inputs.entry_date && <p>{inputs.entry_date}</p>}
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
                <option value={0}>Select</option>
                {dataLists.shifts && dataLists.shifts.map((obj) => {
                  return(
                    <option value={obj.shift_id} key={obj.shift_id}>{obj.shift}</option>
                  )
                })}
              </select>
              {inputs.shift > 0 && <p>{dataLists.shifts.filter((f) => f.shift_id === Number(inputs.shift))[0].description}</p>}
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
              {inputs.production_from && <p>{inputs.production_from}</p>}
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
              {inputs.production_to && <p>{inputs.production_to}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="machine">Choose Machine</label>
              <select
                id="machine"
                type="text"
                onChange={handleInputChange}
                value={inputs.machine}
                required
              >
                <option value={0}>Select</option>
                {dataLists.machines && dataLists.machines.map((obj) => {
                  return(
                    <option value={obj.machine_id} key={obj.machine_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.machine > 0 && <p>{dataLists.machines.filter((f) => f.machine_id === Number(inputs.machine))[0].name}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="idle_time_from">Machine idle from</label>
              <input
                id="idle_time_from"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.idle_time_from}
                required
              />
              {inputs.idle_time_from && <p>{inputs.idle_time_from}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="idle_time_to">Machine idle till</label>
              <input
                id="idle_time_to"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.idle_time_to}
                min={inputs.idle_time_from}
                required
              />
              {inputs.idle_time_to && <p>{inputs.idle_time_to}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="machine_loss">Idle time reason</label>
              <select
                id="machine_loss"
                type="text"
                onChange={handleInputChange}
                value={inputs.machine_loss}
                required
              >
                <option value={0}>Select</option>
                {dataLists.machine_loss && dataLists.machine_loss.map((obj) => {
                  return(
                    <option value={obj.machine_loss_id} key={obj.machine_loss_id}>{obj.description}</option>
                  )
                })}
              </select>
              {inputs.machine_loss > 0 && <p>{dataLists.machine_loss.filter((f) => f.machine_loss_id === Number(inputs.machine_loss))[0].description}</p>}
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="operation">Choose Operation</label>
              <select
                id="operation"
                type="text"
                onChange={handleInputChange}
                value={inputs.operation}
                required
              >
                <option value={0}>Select</option>
                {dataLists.operations && dataLists.operations.map((obj) => {
                  return(
                    <option value={obj.operation_id} key={obj.operation_id}>{obj.operation_description}</option>
                  )
                })}
              </select>
              {inputs.operation > 0 && <p>{dataLists.operations.filter((f) => f.operation_id === Number(inputs.operation))[0].operation_description}</p>}
            </div>
            <div className="centroid_addDashboardData_input">
              <label htmlFor="part_number">Part No.</label>
              <input
                id="part_number"
                type="text"
                onChange={handleInputChange}
                value={inputs.part_number}
                required
              />
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="operator">Choose Operator</label>
              <select
                id="operator"
                type="text"
                onChange={handleInputChange}
                value={inputs.operator}
                required
              >
                <option value={0}>Select</option>
                {dataLists.operators && dataLists.operators.map((obj) => {
                  return(
                    <option value={obj.operator_id} key={obj.operator_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.operator > 0 && <p>{dataLists.operators.filter((f) => f.operator_id === Number(inputs.operator))[0].name}</p>}
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
                <option value={0}>Select</option>
                {dataLists.inspectors && dataLists.inspectors.map((obj) => {
                  return(
                    <option value={obj.inspector_id} key={obj.inspector_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.inspector > 0 && <p>{dataLists.inspectors.filter((f) => f.inspector_id === Number(inputs.inspector))[0].name}</p>}
            </div>
            <div className="centroid_addDashboardData_input">
              <label htmlFor="batch_number">Batch No.</label>
              <input
                id="batch_number"
                type="text"
                onChange={handleInputChange}
                value={inputs.batch_number}
                required
              />
            </div>
            <div className="centroid_addDashboardData_list">
              <label htmlFor="defect">Choose Defect</label>
              <select
                id="defect"
                type="text"
                onChange={handleInputChange}
                value={inputs.defect}
                required
              >
                <option value={0}>Select</option>
                {dataLists.defects && dataLists.defects.map((obj) => {
                  return(
                    <option value={obj.defect_id} key={obj.defect_id}>{obj.description}</option>
                  )
                })}
              </select>
              {inputs.defect > 0 && <p>{dataLists.defects.filter((f) => f.defect_id === Number(inputs.defect))[0].description}</p>}
            </div>
            <div className="centroid_addDashboardData_input">
              <label htmlFor="production_qty">Production Quantity</label>
              <input
                id="production_qty"
                type="number"
                onChange={handleInputChange}
                value={inputs.production_qty}
                max={99999}
                required
              />
            </div>
            <div className="centroid_addDashboardData_input">
              <label htmlFor="rejection_qty">Rejection Quantity</label>
              <input
                id="rejection_qty"
                type="number"
                onChange={handleInputChange}
                value={inputs.rejection_qty}
                max={inputs.production_qty}
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
