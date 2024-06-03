import makeRequest from "../utils/axios";

//To get all master data
export const getMasterData = async () => {
  try {
    const result = await makeRequest.get("/masterData", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To manipulate master data
//Operator
//Add operator
export const addOperatorMaster = async (operator) => {
  try {
    const result = await makeRequest.post(
      "/masterData/add/operator",
      operator,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit operator
export const editOperatorMaster = async (operator) => {
  try {
    const result = await makeRequest.post(
      "/masterData/edit/operator",
      operator,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete operator
export const deleteOperatorMaster = async (operator_id) => {
  try {
    const result = await makeRequest.post(
      "/masterData/delete/operator",
      {
        operator_id: operator_id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Operation
//Add operation
export const addOperationMaster = async (operation) => {
  try {
    const result = await makeRequest.post(
      "/masterData/add/operation",
      operation,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit operation
export const editOperationMaster = async (operation) => {
  try {
    const result = await makeRequest.post(
      "/masterData/edit/operation",
      operation,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete operation
export const deleteOperationMaster = async (operation) => {
  try {
    const result = await makeRequest.post(
      "/masterData/delete/operation",
      operation,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Machine
//Add machine
export const addMachineMaster = async (machine) => {
  try {
    const result = await makeRequest.post("/masterData/add/machine", machine, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit machine
export const editMachineMaster = async (machine) => {
  try {
    const result = await makeRequest.post("/masterData/edit/machine", machine, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete machine
export const deleteMachineMaster = async (machine) => {
  try {
    const result = await makeRequest.post(
      "/masterData/delete/machine",
      machine,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Inspector
//Add inspector
export const addInspectorMaster = async (inspector) => {
  try {
    const result = await makeRequest.post(
      "/masterData/add/inspector",
      inspector,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit inspector
export const editInspectorMaster = async (inspector) => {
  try {
    const result = await makeRequest.post(
      "/masterData/edit/inspector",
      inspector,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete inspector
export const deleteInspectorMaster = async (inspector) => {
  try {
    const result = await makeRequest.post(
      "/masterData/delete/inspector",
      inspector,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Defects
//Add defect
export const addDefectMaster = async (defect) => {
  try {
    const result = await makeRequest.post("/masterData/add/defect", defect, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit defect
export const editDefectMaster = async (defect) => {
  try {
    const result = await makeRequest.post("/masterData/edit/defect", defect, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete defect
export const deleteDefectMaster = async (defect) => {
  try {
    const result = await makeRequest.post("/masterData/delete/defect", defect, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Machine Loss
//Add machine loss
export const addMachineLossMaster = async (machine_loss) => {
  try {
    const result = await makeRequest.post(
      "/masterData/add/machineLoss",
      machine_loss,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit machine loss
export const editMachineLossMaster = async (machine_loss) => {
  try {
    const result = await makeRequest.post(
      "/masterData/edit/machineLoss",
      machine_loss,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete machine loss
export const deleteMachineLossMaster = async (machine_loss) => {
  try {
    const result = await makeRequest.post(
      "/masterData/delete/machineLoss",
      machine_loss,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Shift
//Add shift
export const addShiftMaster = async (shift) => {
  try {
    const result = await makeRequest.post("/masterData/add/shift", shift, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit shift
export const editShiftMaster = async (shift) => {
  try {
    const result = await makeRequest.post("/masterData/edit/shift", shift, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Delete shift
export const deleteShiftMaster = async (shift) => {
  try {
    const result = await makeRequest.post("/masterData/delete/shift", shift, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To get individual data for edit
//Operator
export const getOperatorDetails = async (id) => {
  try {
    const result = await makeRequest.get(
      `/masterData/singleOperator?id=${id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Operation
export const getOperationDetails = async (id) => {
  try {
    const result = await makeRequest.get(
      `/masterData/singleOperation?id=${id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Machine
export const getMachineDetails = async (id) => {
  try {
    const result = await makeRequest.get(`/masterData/singleMachine?id=${id}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Inspector
export const getInspectorDetails = async (id) => {
  try {
    const result = await makeRequest.get(
      `/masterData/singleInspector?id=${id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Defect
export const getDefectDetails = async (id) => {
  try {
    const result = await makeRequest.get(`masterData/singleDefect?id=${id}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Machine loss
export const getMachineLosstDetails = async (id) => {
  try {
    const result = await makeRequest.get(
      `masterData/singleMachineLoss?id=${id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Shift
export const getShiftDetails = async (id) => {
  try {
    const result = await makeRequest.get(`/masterData/singleShift?id=${id}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Part number
export const getPartNumberDetails = async (id) => {
    try {
      const result = await makeRequest.get(`/masterData/singlePartNumber?id=${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(result.data);
      return result.data;
    } catch (err) {
      console.log("Error: ", err);
      throw err;
    }
  };

//Work Order
export const getWorkOrderDetails = async (id) => {
  try{
    const result = await makeRequest.get(`/masterData/singleWorkOrder?id=${id}`,{
      headers:{
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//Part number
//To add a part number
export const addPartNumber = async (part_number) => {
  try {
    const result = await makeRequest.post("/masterData/partNumber/add", part_number, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To edit a part number
export const editPartNumber = async (part_number) => {
    try {
      const result = await makeRequest.post("/masterData/partNumber/edit", part_number, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(result.data)
      return result.data
    } catch (err) {
      console.log("Error: ", err);
      throw err;
    }
  };

//Work Order
//To get all active part numbers
export const getActivePartNumbers = async () => {
  try{
    const result = await makeRequest.get('/masterData/activePartNumbers',{
      headers:{
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//To add a work order
export const addWorkOrder = async (workOrder) => {
  try{
    const result = await makeRequest.post('/masterData/workOrder/add',workOrder,{
      headers:{
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    console.log(result.data)
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//To edit a work order
export const editWorkOrder = async (work_order) => {
  try{
    const result = await makeRequest.post('/masterData/workOrder/edit',work_order,{
      headers:{
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    console.log(result.data)
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//UOM
//To add a UOM
export const addUOM = async (uom) => {
  try{
    const result = await makeRequest.post('/masterData/add/uom',uom,{
      headers:{
        authorization:"Bearer " + localStorage.getItem("token")
      }
    })
    console.log(result.data)
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//To get a single UOM for edit
export const getUOMDetails = async (uom_id) => {
  try{
    const result = await makeRequest.get(`/masterData/singleUOM?uom_id=${uom_id}`,{
      headers:{
        authorization:"Bearer " + localStorage.getItem("token")
      }
    })
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//To edit a UOM
export const editUOM = async (uom) => {
  try{
    const result = await makeRequest.post('/masterData/edit/uom',uom,{
      headers:{
        authorization:"Bearer " + localStorage.getItem("token")
      }
    })
    console.log(result.data)
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}