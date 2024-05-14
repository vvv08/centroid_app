import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./masterMain.scss";
import OperatorMaster from "../operators";
import OperationsMaster from "../operations";
import MachinesMaster from "../machines";
import InspectorsMaster from "../inspectors";
import DefectsMaster from "../defects";
import MachineLossMaster from "../machineLoss";
import ShiftsMaster from "../shifts";
import { getMasterData } from "../../../repository/master";

const MasterMain = () => {
  const navigate = useNavigate();
  const [masterData, setMasterData] = useState({});
  const [tabState, setTabState] = useState("A");
  const [loading, setLoading] = useState(true);

  const tabChange = (tab) => {
    setTabState(tab);
  };

  useEffect(() => {
    setLoading(true);
    getMasterData()
      .then((result) => {
        setMasterData(result);
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
  }, []);

  return (
    <>
      <div className="centroid_masterMainWrapper">
        <div className="centroid_masterMainContainer">
          <div className="centroid_masterMainList">
            <ul>
              <li
                onClick={() => {
                  tabChange("A");
                }}
                className={
                  tabState === "A"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Operators
              </li>
              <li
                onClick={() => {
                  tabChange("B");
                }}
                className={
                  tabState === "B"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Operations
              </li>
              <li
                onClick={() => {
                  tabChange("C");
                }}
                className={
                  tabState === "C"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Machines
              </li>
              <li
                onClick={() => {
                  tabChange("D");
                }}
                className={
                  tabState === "D"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Inspectors
              </li>
              <li
                onClick={() => {
                  tabChange("E");
                }}
                className={
                  tabState === "E"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Defects
              </li>
              <li
                onClick={() => {
                  tabChange("F");
                }}
                className={
                  tabState === "F"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Down time loss
              </li>
              <li
                onClick={() => {
                  tabChange("G");
                }}
                className={
                  tabState === "G"
                    ? "centroid_masterMainSelectedTab"
                    : undefined
                }
              >
                Shifts
              </li>
            </ul>
          </div>
          {!loading && masterData ? <div className="centroid_masterMainContent">
            {tabState === "A" && masterData.operators && <OperatorMaster data = {masterData.operators}/>}
            {tabState === "B" && masterData.operations &&  <OperationsMaster data = {masterData.operations}/>}
            {tabState === "C" && masterData.machines &&  <MachinesMaster data = {masterData.machines} />}
            {tabState === "D" && masterData.inspectors &&  <InspectorsMaster data = {masterData.inspectors} />}
            {tabState === "E" && masterData.defects &&  <DefectsMaster data = {masterData.defects} />}
            {tabState === "F" && masterData.machine_loss &&  <MachineLossMaster data = {masterData.machine_loss} />}
            {tabState === "G" && masterData.shifts &&  <ShiftsMaster data = {masterData.shifts} />}
          </div> : 
          <div className="centroid_masterMainContent">
              <p>Loading...</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default MasterMain;
