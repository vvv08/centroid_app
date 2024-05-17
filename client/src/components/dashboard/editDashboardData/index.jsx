import React, { useEffect, useState } from "react";
import "./editDashboardData.scss";
import { useNavigate } from "react-router-dom";
import { editEntry, getEntryForEdit, getInputData } from "../../../repository/dashboardRepository";
import { dateFormatter, timeFormatter } from "../../../../../server/validations/validations";

const EditDashboardData = ({id}) => {
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
    production_from:"",
    production_to:"",
    total_mix:""
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
      case "production_from": {
        setInputs((state) => ({ ...state, production_from: e.target.value }));
        break;
      }
      case "production_to": {
        setInputs((state) => ({ ...state, production_to: e.target.value }));
        break;
      }
      case "total_mix": {
        setInputs((state) => ({ ...state, total_mix: e.target.value }));
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    editEntry(inputs).then((result) => {
      alert("Entry edited");
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
    getEntryForEdit(id).then((result) => {
      setInputs({
        id:result.Id,
        entry_date: result.date || "",
        shift: result.shift_id || "",
        machine: result.machine_id || "",
        operator: result.operator_id || "",
        operation: result.operation_id || "",
        inspector: result.inspector_id || "",
        part_number: result.part_number || "",
        batch_number: result.batch_number || "",
        production_qty: result.production_qty || "",
        rejection_qty: result.rejection_qty || "",
        defect: result.defect_id || "",
        remarks:result.remarks || "",
        production_from:result.production_from || "",
        production_to:result.production_to || "",
        total_mix:result.total_mix || ""
      })
    })
    getInputData().then((result) => {
      setDataLists(result)
    })
  }, []);

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
              {inputs.entry_date && <p>{`${dateFormatter(inputs.entry_date.substr(0 , 10))}, ${timeFormatter(inputs.entry_date.substr(11,5))}`}</p>}
            </div>
            {dataLists.shifts && dataLists.shifts.filter((f) => f.shift_id === Number(inputs.shift))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="shift">Choose Shift</label>
              <select
                id="shift"
                type="text"
                onChange={handleInputChange}
                value={inputs.shift}
                required
              >
                {/* <option value="">Select</option> */}
                {dataLists.shifts && dataLists.shifts.map((obj) => {
                  return(
                    <option value={obj.shift_id} key={obj.shift_id}>{obj.shift}</option>
                  )
                })}
              </select>
              {inputs.shift && dataLists.shifts && <p>{dataLists.shifts.filter((f) => f.shift_id === Number(inputs.shift))[0].description}</p>}
            </div>}
            <div className="centroid_editDashboardData_list">
              <label htmlFor="production_from">Production Start</label>
              <input
                id="production_from"
                type="datetime-local"
                value={inputs.production_from}
                onChange={handleInputChange}
                required
              />
              {inputs.production_from && <p>{`${dateFormatter(inputs.production_from.substr(0 , 10))}, ${timeFormatter(inputs.production_from.substr(11,5))}`}</p>}
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
              {inputs.production_to && <p>{`${dateFormatter(inputs.production_to.substr(0 , 10))}, ${timeFormatter(inputs.production_to.substr(11,5))}`}</p>}
            </div>
            {dataLists.machines && dataLists.machines.filter((f) => f.machine_id === Number(inputs.machine))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="machine">Choose Machine</label>
              <select
                id="machine"
                type="text"
                onChange={handleInputChange}
                value={inputs.machine}
                required
              >
                {/* <option value="">Select</option> */}
                {dataLists.machines && dataLists.machines.map((obj) => {
                  return(
                    <option value={obj.machine_id} key={obj.machine_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.machine && dataLists.defects &&  <p>{dataLists.machines.filter((f) => f.machine_id === Number(inputs.machine))[0].name}</p>}
            </div>}
            {dataLists.operations && dataLists.operations.filter((f) => f.operation_id === Number(inputs.operation))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="operation">Choose Operation</label>
              <select
                id="operation"
                type="text"
                onChange={handleInputChange}
                value={inputs.operation}
                required
              >
                {/* <option value="">Select</option> */}
                {dataLists.operations && dataLists.operations.map((obj) => {
                  return(
                    <option value={obj.operation_id} key={obj.operation_id}>{obj.operation_description}</option>
                  )
                })}
              </select>
              {inputs.operation && dataLists.defects &&  <p>{dataLists.operations.filter((f) => f.operation_id === Number(inputs.operation))[0].operation_description}</p>}
            </div>}
            <div className="centroid_editDashboardData_input">
              <label htmlFor="part_number">Part No. / Name</label>
              <input
                id="part_number"
                type="text"
                onChange={handleInputChange}
                value={inputs.part_number}
                required
              />
            </div>
            {dataLists.operators && dataLists.operators.filter((f) => f.operator_id === Number(inputs.operator))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="operator">Choose Operator</label>
              <select
                id="operator"
                type="text"
                onChange={handleInputChange}
                value={inputs.operator}
                required
              >
                {/* <option value="">Select</option> */}
                {dataLists.operators && dataLists.operators.map((obj) => {
                  return(
                    <option value={obj.operator_id} key={obj.operator_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.operator && dataLists.defects &&  <p>{dataLists.operators.filter((f) => f.operator_id === Number(inputs.operator))[0].name}</p>}
            </div>}
            {dataLists.inspectors && dataLists.inspectors.filter((f) => f.inspector_id === Number(inputs.inspector))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="inspector">Choose Inspector</label>
              <select
                id="inspector"
                type="text"
                onChange={handleInputChange}
                value={inputs.inspector}
                required
              >
                {/* <option value="">Select</option> */}
                {dataLists.inspectors && dataLists.inspectors.map((obj) => {
                  return(
                    <option value={obj.inspector_id} key={obj.inspector_id}>{obj.name}</option>
                  )
                })}
              </select>
              {inputs.inspector && dataLists.defects &&  <p>{dataLists.inspectors.filter((f) => f.inspector_id === Number(inputs.inspector))[0].name}</p>}
            </div>}
            <div className="centroid_editDashboardData_input">
              <label htmlFor="batch_number">Batch No.</label>
              <input
                id="batch_number"
                type="text"
                onChange={handleInputChange}
                value={inputs.batch_number}
                required
              />
            </div>
            {dataLists.defects && dataLists.defects.filter((f) => f.defect_id === Number(inputs.defect))[0] && <div className="centroid_editDashboardData_list">
              <label htmlFor="defect">Reason for rejection</label>
              <select
                id="defect"
                type="text"
                onChange={handleInputChange}
                value={inputs.defect}
                min = {1}
                required
              >
                {/* <option value={0}>Select</option> */}
                {dataLists.defects && dataLists.defects.map((obj) => {
                  return(
                    <option value={obj.defect_id} key={obj.defect_id}>{obj.description}</option>
                  )
                })}
              </select>
              {inputs.defect && dataLists.defects &&  <p>{dataLists.defects.filter((f) => f.defect_id === Number(inputs.defect))[0].description}</p>}
            </div>}
            <div className="centroid_editDashboardData_input">
              <label htmlFor="total_mix">Total supplied quantity</label>
              <input
                id="total_mix"
                type="number"
                onChange={handleInputChange}
                value={inputs.total_mix}
                max={99999}
                required
              />
            </div>
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
              <button type="submit" className="centroid_AddButton" disabled = {loading}>{loading ? "editing" :"Edit Entry"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDashboardData;
