import React, { useEffect, useState } from "react";
import "./addDowntimeComp.scss";
import { useNavigate } from "react-router-dom";
import { getInputData } from "../../../repository/dashboardRepository";
import { addDowntime } from "../../../repository/downtime";

const AddDowntimeComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLists , setDataLists] = useState({});
  const [inputs, setInputs] = useState({
    entry_date: "",
    machine: "",
    inspector: "",
    remarks:"",
    machine_loss:"",
    idle_time_from:"",
    idle_time_to:""
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "entry_date": {
        setInputs((state) => ({ ...state, entry_date: e.target.value }));
        break;
      }
      case "machine": {
        setInputs((state) => ({ ...state, machine: e.target.value }));
        break;
      }
      case "inspector": {
        setInputs((state) => ({ ...state, inspector: e.target.value }));
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
    }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true)
     addDowntime(inputs).then((result) => {
       alert("Entry added");
       navigate('/downtimeDashboard')
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
      <div className="centroid_addDowntimeCompWrapper">
        <div className="centroid_addDowntimeCompContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_list">
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
            <div className="centroid_addDowntimeComp_input">
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

export default AddDowntimeComp;
