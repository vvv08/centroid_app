import React, { useEffect, useState } from "react";
import "./editDowntimeComp.scss";
import { useNavigate } from "react-router-dom";
import { editDowntime, getDowntimeEntry } from "../../../repository/downtime";
import { getInputData } from "../../../repository/dashboardRepository";
import { dateFormatter, timeFormatter } from "../../../validations/validations";

const EditDowntimeData = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLists, setDataLists] = useState({});
  const [inputs, setInputs] = useState({
    id: "",
    entry_date: "",
    machine: "",
    inspector: "",
    remarks: "",
    machine_loss: "",
    idle_time_from: "",
    idle_time_to: "",
    machine_status: "",
    machine_name: "",
    machine_loss_status: "",
    machine_loss_name: "",
    inspector_status: "",
    inspector_name: ""
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
    setLoading(true);
    editDowntime(inputs)
      .then((result) => {
        alert("Entry edited");
        navigate("/downtimeDashboard");
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
    getDowntimeEntry(id).then((result) => {
      setInputs({
        id: result.downtime_id,
        entry_date: result.date || "",
        machine: result.machine_id || "",
        inspector: result.inspector_id || "",
        remarks: result.remarks || "",
        machine_loss: result.machine_loss_id || "",
        idle_time_from: result.idle_time_from || "",
        idle_time_to: result.idle_time_to || "",
        machine_status: result.machine_status || "",
        machine_name: result.machine || "",
        machine_loss_status: result.machine_loss_status || "",
        machine_loss_name: result.machine_loss || "",
        inspector_status:result.inspector_status || "",
        inspector_name:result.inspector || ""
      });
    });
    getInputData().then((result) => {
      setDataLists(result);
    });
  }, []);

  return (
    <>
      <div className="centroid_editDowntimeDataWrapper">
        <div className="centroid_editDowntimeDataContainer">
          <form onSubmit={handleSubmit}>
            <div className="centroid_editDowntimeData_list">
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
            {inputs.machine_status === "inactive" ? (
              <div className="centroid_editDowntimeData_list">
                <label htmlFor="machine">Machine (Inactive)</label>
                <input
                  id="machine"
                  type="text"
                  value={inputs.machine_name}
                  disabled={true}
                  required
                />
              </div>
            ) : (
              dataLists.machines &&
              dataLists.machines.filter(
                (f) => f.machine_id === Number(inputs.machine)
              )[0] && (
                <div className="centroid_editDowntimeData_list">
                  <label htmlFor="machine">Choose Machine</label>
                  <select
                    id="machine"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.machine}
                    required
                  >
                    {dataLists.machines &&
                      dataLists.machines.map((obj) => {
                        return (
                          <option value={obj.machine_id} key={obj.machine_id}>
                            {obj.name}
                          </option>
                        );
                      })}
                  </select>
                  {inputs.machine && dataLists.defects && (
                    <p>
                      {
                        dataLists.machines.filter(
                          (f) => f.machine_id === Number(inputs.machine)
                        )[0].name
                      }
                    </p>
                  )}
                </div>
              )
            )}
            <div className="centroid_editDowntimeData_list">
              <label htmlFor="idle_time_from">Machine idle from</label>
              <input
                id="idle_time_from"
                type="datetime-local"
                onChange={handleInputChange}
                value={inputs.idle_time_from}
                required
              />
              {inputs.idle_time_from && (
                <p>{`${dateFormatter(
                  inputs.idle_time_from.substr(0, 10)
                )}, ${timeFormatter(inputs.idle_time_from.substr(11, 5))}`}</p>
              )}
            </div>
            <div className="centroid_editDowntimeData_list">
              <label htmlFor="idle_time_to">Machine idle till</label>
              <input
                id="idle_time_to"
                type="datetime-local"
                onChange={handleInputChange}
                min={inputs.idle_time_from}
                value={inputs.idle_time_to}
                required
              />
              {inputs.idle_time_to && (
                <p>{`${dateFormatter(
                  inputs.idle_time_to.substr(0, 10)
                )}, ${timeFormatter(inputs.idle_time_to.substr(11, 5))}`}</p>
              )}
            </div>
            {inputs.machine_loss_status === "inactive" ? (
              <div className="centroid_editDowntimeData_list">
                <label htmlFor="machine_loss">Idle time reason (Inactive)</label>
                <input
                  id="machine_loss"
                  type="text"
                  value={inputs.machine_loss_name}
                  disabled={true}
                  required
                />
              </div>
            ) : (
              dataLists.machine_loss &&
              dataLists.machine_loss.filter(
                (f) => f.machine_loss_id === Number(inputs.machine_loss)
              )[0] && (
                <div className="centroid_editDowntimeData_list">
                  <label htmlFor="machine_loss">Idle time reason</label>
                  <select
                    id="machine_loss"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.machine_loss}
                    required
                  >
                    {dataLists.machine_loss &&
                      dataLists.machine_loss.map((obj) => {
                        return (
                          <option
                            value={obj.machine_loss_id}
                            key={obj.machine_loss_id}
                          >
                            {obj.description}
                          </option>
                        );
                      })}
                  </select>
                  {inputs.machine_loss && dataLists.machine_loss && (
                    <p>
                      {
                        dataLists.machine_loss.filter(
                          (f) =>
                            f.machine_loss_id === Number(inputs.machine_loss)
                        )[0].description
                      }
                    </p>
                  )}
                </div>
              )
            )}
            {inputs.inspector_status === "inactive" ?
            <div className="centroid_editDowntimeData_list">
                <label htmlFor="inspector">Inspector (Inactive)</label>
                <input
                  id="inspector"
                  type="text"
                  value={inputs.inspector_name}
                  disabled={true}
                  required
                />
              </div>
              :              
              (dataLists.inspectors &&
              dataLists.inspectors.filter(
                (f) => f.inspector_id === Number(inputs.inspector)
              )[0] && (
                <div className="centroid_editDowntimeData_list">
                  <label htmlFor="inspector">Choose Inspector</label>
                  <select
                    id="inspector"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.inspector}
                    required
                  >
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
                  {inputs.inspector && (
                    <p>
                      {
                        dataLists.inspectors.filter(
                          (f) => f.inspector_id === Number(inputs.inspector)
                        )[0].name
                      }
                    </p>
                  )}
                </div>
              ))}
            <div className="centroid_editDowntimeData_input">
              <label htmlFor="remarks">Remarks</label>
              <input
                id="remarks"
                type="text"
                onChange={handleInputChange}
                value={inputs.remarks}
                required
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

export default EditDowntimeData;
