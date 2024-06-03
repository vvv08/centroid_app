import React from 'react';
import './addMaster.scss';
import { useNavigate, useParams } from 'react-router-dom';
import AddOperatorsMaster from '../../../components/master/operators/addOperators';
import AddOperationMaster from '../../../components/master/operations/addOperation';
import AddMachineMaster from '../../../components/master/machines/addMachine';
import AddInspectorMaster from '../../../components/master/inspectors/addInspector';
import AddDefectMaster from '../../../components/master/defects/addDefect';
import AddMachineLossMaster from '../../../components/master/machineLoss/addMachineLoss';
import AddShiftMaster from '../../../components/master/shifts/addShift';
import AddPartNumbersMaster from '../../../components/master/partNumbers/addPartNumber';
import AddWorkOrderMaster from '../../../components/master/workOrder/addWorkOrder';
import AddUOMMaster from '../../../components/master/uom/addUom';

const AddMaster = () => {
    const {type} = useParams();
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addMasterWrapper">
                <div className="centroid_addMaster_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/masterData')}}>Back</button>
                </div>
                <h1>New {type}</h1>
            {type === "Operator" && <AddOperatorsMaster/>}
            {type === "Operation" && <AddOperationMaster/>}
            {type === "Machine" && <AddMachineMaster/>}
            {type === "Inspector" && <AddInspectorMaster/>}
            {type === "Defect" && <AddDefectMaster/>}
            {type === "Reason" && <AddMachineLossMaster/>}
            {type === "Shift" && <AddShiftMaster/>}
            {type === "Part Number" && <AddPartNumbersMaster/>}
            {type === "Work Order" && <AddWorkOrderMaster/>}
            {type === "UOM" && <AddUOMMaster/>}
        </div>
    </>
  )
}

export default AddMaster
