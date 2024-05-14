import React from 'react';
import './editMaster.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditOperatorMaster from '../../../components/master/operators/editOperators';
import EditOperationMaster from '../../../components/master/operations/editOperation';
import EditMachineMaster from '../../../components/master/machines/editMachine';
import EditInspectorMaster from '../../../components/master/inspectors/editInspector';
import EditDefectMaster from '../../../components/master/defects/editDefect';
import EditMachineLossMaster from '../../../components/master/machineLoss/editMachineLoss';
import EditShiftMaster from '../../../components/master/shifts/editShift';

const EditMaster = () => {
    const {type,id} = useParams();
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_editMasterWrapper">
                <div className="centroid_editMaster_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/masterData')}}>Back</button>
                </div>
                <h1>Edit {type}</h1>
                {type === "Operator" && <EditOperatorMaster id = {id}/>}
                {type === "Operation" && <EditOperationMaster id = {id}/>}
                {type === "Machine" && <EditMachineMaster id = {id}/>}
                {type === "Inspector" && <EditInspectorMaster id = {id}/>}
                {type === "Defect" && <EditDefectMaster id = {id}/>}
                {type === "Reason" && <EditMachineLossMaster id = {id}/>}
                {type === "Shift" && <EditShiftMaster id = {id}/>}
        </div>
    </>
  )
}

export default EditMaster
