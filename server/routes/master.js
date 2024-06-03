import express from 'express';
import { addDefectMaster, addInspectorMaster, addMachineLossMaster, addMachineMaster, addOperationMaster, addOperatorMaster, addPartNumber, addShiftMaster, addUOM, addWorkOrder, deleteDefectMaster, deleteInspectorMaster, deleteMachineLossMaster, deleteMachineMaster, deleteOperationMaster, deleteOperatorMaster, deleteShiftMaster, editDefectMaster, editInspectorMaster, editMachineLossMaster, editMachineMaster, editOperationMaster, editOperatorMaster, editPartNumber, editShiftMaster, editUOM, editWorkOrder, getActivePartNumbers, getDefectDetails, getInspectorDetails, getMachineDetails, getMachineLossDetails, getMasterData, getOperationDetails, getOperatorDetails, getPartNumberDetails, getShiftDetails, getUOMDetails, getWorkOrderDetails } from '../controllers/master.js';
import { verifyToken } from '../config/verify.js'

const router = express.Router();

//To get all master data
router.get('/',[verifyToken],(req,res) => {
    getMasterData().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To manipulate master data
//Operator
//Add operator
router.post('/add/operator',[verifyToken],(req,res) => {
    let operator = {
        name:req.body.name,
        status:req.body.status
    }
    addOperatorMaster(operator).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit operator
router.post('/edit/operator',[verifyToken],(req,res) => {
    let operator = {
        id:Number(req.body.operator_id),
        name:req.body.name,
        status:req.body.status
    }
    editOperatorMaster(operator).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete operator
router.post('/delete/operator',[verifyToken],(req,res) => {
    let operator = {
        id:Number(req.body.operator_id)
    }
    deleteOperatorMaster(operator).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Operation
//Add operation
router.post('/add/operation',[verifyToken],(req,res) => {
    let operation = {
        description:req.body.description,
        status:req.body.status
    }
    addOperationMaster(operation).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit operation
router.post('/edit/operation',[verifyToken],(req,res) => {
    let operation = {
        id:Number(req.body.operation_id),
        description:req.body.description,
        status:req.body.status
    }
    editOperationMaster(operation).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete operation
router.post('/delete/operation',[verifyToken],(req,res) => {
    let operation = {
        id:Number(req.body.operation_id)
    }
    deleteOperationMaster(operation).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Machine
//Add machine
router.post('/add/machine',[verifyToken],(req,res) => {
    let machine = {
        name:req.body.name,
        status:req.body.status
    }
    addMachineMaster(machine).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit machine
router.post('/edit/machine',[verifyToken],(req,res) => {
    let machine = {
        id:Number(req.body.machine_id),
        name:req.body.name,
        status:req.body.status
    }
    editMachineMaster(machine).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete machine
router.post('/delete/machine',[verifyToken],(req,res) => {
    let machine = {
        id:Number(req.body.machine_id)
    }
    deleteMachineMaster(machine).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Inspector
//Add inspector
router.post('/add/inspector',[verifyToken],(req,res) => {
    let inspector = {
        name:req.body.name,
        status:req.body.status
    }
    addInspectorMaster(inspector).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit inspector
router.post('/edit/inspector',[verifyToken],(req,res) => {
    let inspector = {
        id:Number(req.body.inspector_id),
        name:req.body.name,
        status:req.body.status
    }
    editInspectorMaster(inspector).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete inspector
router.post('/delete/inspector',[verifyToken],(req,res) => {
    let inspector = {
        id:Number(req.body.inspector_id)
    }
    deleteInspectorMaster(inspector).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Defect
//Add defect
router.post('/add/defect',[verifyToken],(req,res) => {
    let defect = {
        description:req.body.description,
        status:req.body.status
    }
    addDefectMaster(defect).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit defect
router.post('/edit/defect',[verifyToken],(req,res) => {
    let defect = {
        id:Number(req.body.defect_id),
        description:req.body.description,
        status:req.body.status
    }
    editDefectMaster(defect).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete inspector
router.post('/delete/defect',[verifyToken],(req,res) => {
    let defect = {
        id:Number(req.body.defect_id)
    }
    deleteDefectMaster(defect).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Machine Loss
//Add machine loss
router.post('/add/machineLoss',[verifyToken],(req,res) => {
    let machine_loss = {
        description:req.body.description,
        status:req.body.status
    }
    addMachineLossMaster(machine_loss).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit machine loss
router.post('/edit/machineLoss',[verifyToken],(req,res) => {
    let machine_loss = {
        id:Number(req.body.machine_loss_id),
        description:req.body.description,
        status:req.body.status
    }
    editMachineLossMaster(machine_loss).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete machine loss
router.post('/delete/machine_loss',[verifyToken],(req,res) => {
    let machine_loss = {
        id:Number(req.body.machine_loss_id)
    }
    deleteMachineLossMaster(machine_loss).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Shift
//Add shift
router.post('/add/shift',[verifyToken],(req,res) => {
    let shift_details = {
        description:req.body.description,
        shift:req.body.shift,
        status:req.body.status
    }
    addShiftMaster(shift_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Edit shift
router.post('/edit/shift',[verifyToken],(req,res) => {
    let shift_details = {
        id:Number(req.body.shift_id),
        description:req.body.description,
        shift:req.body.shift,
        status:req.body.status
    }
    editShiftMaster(shift_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete machine loss
router.post('/delete/shift',[verifyToken],(req,res) => {
    let shift_details = {
        id:Number(req.body.shift_id)
    }
    deleteShiftMaster(shift_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get individual details for 
//Operator
router.get('/singleOperator',[verifyToken],(req,res) => {
    let operator_details = {
        id:Number(req.query.id)
    }
    getOperatorDetails(operator_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Operation
router.get('/singleOperation',[verifyToken],(req,res) => {
    let operation_details = {
        id:Number(req.query.id)
    }
    getOperationDetails(operation_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Machine
router.get('/singleMachine',[verifyToken],(req,res) => {
    let machine_details = {
        id:Number(req.query.id)
    }
    getMachineDetails(machine_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Inspector
router.get('/singleInspector',[verifyToken],(req,res) => {
    let inspector_details = {
        id:Number(req.query.id)
    }
    getInspectorDetails(inspector_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Defect
router.get('/singleDefect',[verifyToken],(req,res) => {
    let defect_details = {
        id:Number(req.query.id)
    }
    getDefectDetails(defect_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Machine loss
router.get('/singleMachineLoss',[verifyToken],(req,res) => {
    let machine_loss_details = {
        id:Number(req.query.id)
    }
    getMachineLossDetails(machine_loss_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Shift
router.get('/singleShift',[verifyToken],(req,res) => {
    let shift_details = {
        id:Number(req.query.id)
    }
    getShiftDetails(shift_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Part Number
router.get('/singlePartNumber',[verifyToken],(req,res) => {
    let part_number_details = {
        id:Number(req.query.id)
    }
    getPartNumberDetails(part_number_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Work Order
router.get('/singleWorkOrder',[verifyToken],(req,res) => {
    let work_order = {
        id:Number(req.query.id)
    }
    getWorkOrderDetails(work_order).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//UOM
router.get('/singleUOM',[verifyToken],(req,res) => {
    let uom = {
        uom_id : Number(req.query.uom_id)
    }
    getUOMDetails(uom).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Part Number
//To add a Part number
router.post('/partNumber/add',[verifyToken],(req,res) => {
    let part = {
        part_number : req.body.part_number,
        part_name: req.body.part_name,
        part_cost: parseFloat(req.body.part_cost),
        status : req.body.status,
        remarks:req.body.remarks
    }
    addPartNumber(part).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a part number
router.post('/partNumber/edit',[verifyToken],(req,res) => {
    let part_number = {
        id : Number(req.body.id),
        part_number : req.body.part_number,
        part_name : req.body.part_name,
        part_cost : parseFloat(req.body.part_cost),
        status : req.body.status,
        remarks : req.body.remarks 
    }
    editPartNumber(part_number).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Work Order
//To get all active part numbers
router.get('/activePartNumbers',[verifyToken],(req,res) => {
    getActivePartNumbers().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a work order
router.post('/workOrder/add',[verifyToken],(req,res) => {
    let workOrder = {
        work_order:req.body.work_order,
        part_number:Number(req.body.part_number),
        total_mix:req.body.total_mix,
        remarks:req.body.remarks,
        status:req.body.status
    }
    addWorkOrder(workOrder).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a work order
router.post('/workOrder/edit',[verifyToken],(req,res) => {
    let work_order_input = {
        id:Number(req.body.id),
        work_order:req.body.work_order,
        part_number:Number(req.body.part_number),
        status:req.body.status,
        remarks:req.body.remarks,
        total_mix:parseFloat(req.body.total_mix)
    }
    editWorkOrder(work_order_input).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//UOM
//To add a UOM
router.post('/add/uom',[verifyToken],(req,res) => {
    let uom = {
        description:req.body.description,
        status:req.body.status
    }
    addUOM(uom).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a UOM
router.post('/edit/uom',[verifyToken],(req,res) => {
    let uom = {
        uom_id:Number(req.body.uom_id),
        description:req.body.description,
        status:req.body.status
    }
    editUOM(uom).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;