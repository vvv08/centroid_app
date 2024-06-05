import { db } from "../config/connection.js";
import { padZero } from "../validations/validations.js";

//To get current date
const currentDate = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(currentDate.getTime() + istOffset);
const year = currentDate.getFullYear();
const month = padZero(istDate.getMonth() + 1); // Months are zero-based (0 = January)
const day = padZero(istDate.getDate());
const hours = padZero(istDate.getUTCHours());
const minutes = padZero(istDate.getUTCMinutes());
const seconds = padZero(istDate.getUTCSeconds());
// const curr_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
const curr_date = `${year}-${month}-${day}`;

//To fetch all master data
export const getMasterData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [operators] = await db.query("select * from operators;");
      const [operations] = await db.query("select * from operations;");
      const [machines] = await db.query("select * from machines;");
      const [defects] = await db.query("select * from defects;");
      const [shifts] = await db.query("select * from shifts;");
      const [machine_loss] = await db.query("select * from machine_loss;");
      const [inspectors] = await db.query("select * from inspectors;");
      const [part_numbers] = await db.query(
        "select *, date_format(created_date, '%Y-%m-%d') as created_date, date_format(last_updated, '%Y-%m-%d') as last_updated from part_numbers;"
      );
      const [work_orders] = await db.query(
        "select w.*, date_format(w.created_date, '%Y-%m-%d') as created_date, date_format(w.last_updated, '%Y-%m-%d') as last_updated ,p.part_number from work_orders w inner join part_numbers p on w.part_number_id = p.part_number_id;"
      );
      const [uom] = await db.query(
        `select *, date_format(created_date, '%Y-%m-%d') as created_date, date_format(last_updated, '%Y-%m-%d') as last_updated from unit_of_measurements;`
      );
      resolve({
        operators: operators,
        operations: operations,
        machines: machines,
        defects: defects,
        shifts: shifts,
        machine_loss: machine_loss,
        inspectors: inspectors,
        part_numbers: part_numbers,
        work_orders: work_orders,
        uom: uom
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To manipulate master data
//Operators
//Add operator
export const addOperatorMaster = ({ name, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [operator] = await db.query(
        `insert into operators (name,status) values ("${name}","${status}");`
      );
      let insertedOperator = {
        id: operator.insertId,
        name,
        status,
      };
      resolve({ Added: insertedOperator });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit operator
export const editOperatorMaster = ({ name, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from operators where operator_id = ${id}`
      );
      const [operator] = await db.query(
        `update operators set name = "${name}", status = "${status}" where operator_id = ${id};`
      );

      let editedOperator = {
        id,
        name,
        status,
      };
      resolve({
        before: before,
        after: editedOperator,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete operator
export const deleteOperatorMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from operators where operator_id = ${id}`
      );
      const [operator] = await db.query(
        `delete from operators where operator_id = ${id};`
      );
      resolve({
        deleted_operator: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Operations
//Add operation
export const addOperationMaster = ({ description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [operation] = await db.query(
        `insert into operations (operation_description,status) values ("${description}","${status}");`
      );
      let insertedOperation = {
        id: operation.insertId,
        description,
        status,
      };
      resolve({ Added: insertedOperation });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit operation
export const editOperationMaster = ({ description, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from operations where operation_id = ${id}`
      );
      const [operation] = await db.query(
        `update operations set operation_description = "${description}",status = "${status}" where operation_id = ${id};`
      );

      let editedOperation = {
        id,
        description,
        status,
      };
      resolve({
        before: before,
        after: editedOperation,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete operation
export const deleteOperationMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from operations where operation_id = ${id}`
      );
      const [operation] = await db.query(
        `delete from operations where operation_id = ${id};`
      );
      resolve({
        deleted_operation: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Machines
//Add machine
export const addMachineMaster = ({ name, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [machine] = await db.query(
        `insert into machines (name,status) values ("${name}","${status}");`
      );
      let insertedMachine = {
        id: machine.insertId,
        name,
        status,
      };
      resolve({ Added: insertedMachine });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit machine
export const editMachineMaster = ({ name, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from machines where machine_id = ${id}`
      );
      const [machine] = await db.query(
        `update machines set name = "${name}",status = "${status}" where machine_id = ${id};`
      );

      let editedMachine = {
        id,
        name,
        status,
      };
      resolve({
        before: before,
        after: editedMachine,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete machine
export const deleteMachineMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from machines where machine_id = ${id}`
      );
      const [operation] = await db.query(
        `delete from machines where machine_id = ${id};`
      );
      resolve({
        deleted_machine: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Inspectors
//Add inspector
export const addInspectorMaster = ({ name, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [inspector] = await db.query(
        `insert into inspectors (name,status) values ("${name}","${status}");`
      );
      let insertedInspector = {
        id: inspector.insertId,
        name,
        status,
      };
      resolve({ Added: insertedInspector });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit inspector
export const editInspectorMaster = ({ name, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from inspectors where inspector_id = ${id}`
      );
      const [inspector] = await db.query(
        `update inspectors set name = "${name}" , status = "${status}" where inspector_id = ${id};`
      );

      let editedInspector = {
        id,
        name,
        status,
      };
      resolve({
        before: before,
        after: editedInspector,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete inspector
export const deleteInspectorMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from inspectors where inspector_id = ${id}`
      );
      const [inspector] = await db.query(
        `delete from inspectors where inspector_id = ${id};`
      );
      resolve({
        deleted_inspector: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Defects
//Add defect
export const addDefectMaster = ({ description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [defect] = await db.query(
        `insert into defects (description,status) values ("${description}","${status}");`
      );
      let insertedDefect = {
        id: defect.insertId,
        description,
        status,
      };
      resolve({ Added: insertedDefect });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit defect
export const editDefectMaster = ({ description, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from defects where defect_id = ${id}`
      );
      const [defect] = await db.query(
        `update defects set description = "${description}",status = "${status}" where defect_id = ${id};`
      );

      let editedDefect = {
        id,
        description,
        status,
      };
      resolve({
        before: before,
        after: editedDefect,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete defect
export const deleteDefectMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from defects where defect_id = ${id}`
      );
      const [defect] = await db.query(
        `delete from defects where defect_id = ${id};`
      );
      resolve({
        deleted_defect: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Machine Loss
//Add machine loss
export const addMachineLossMaster = ({ description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [machine_loss] = await db.query(
        `insert into machine_loss (description,status) values ("${description}","${status}");`
      );
      let insertedMachineLoss = {
        id: machine_loss.insertId,
        description,
        status,
      };
      resolve({ Added: insertedMachineLoss });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit machine loss
export const editMachineLossMaster = ({ description, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from machine_loss where machine_loss_id = ${id}`
      );
      const [machine_loss] = await db.query(
        `update machine_loss set description = "${description}",status = "${status}" where machine_loss_id = ${id};`
      );

      let editedMachineLoss = {
        id,
        description,
        status,
      };
      resolve({
        before: before,
        after: editedMachineLoss,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete machine loss
export const deleteMachineLossMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from machine_loss where machine_loss_id = ${id}`
      );
      const [machine_loss] = await db.query(
        `delete from machine_loss where machine_loss_id = ${id};`
      );
      resolve({
        deleted_machine_loss: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Shift
//Add shift
export const addShiftMaster = ({ shift, description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_shift] = await db.query(
        `insert into shifts (shift,description,status) values ("${shift}","${description}","${status}");`
      );
      let insertedShift = {
        id: res_shift.insertId,
        shift,
        description,
        status,
      };
      resolve({ Added: insertedShift });
    } catch (err) {
      reject(err);
    }
  });
};

//Edit shift
export const editShiftMaster = ({ shift, description, id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [before] = await db.query(
        `select * from shifts where shift_id = ${id}`
      );
      const [res_shift] = await db.query(
        `update shifts set shift = ${shift},description = "${description}",status = "${status}" where shift_id = ${id};`
      );

      let editedShift = {
        id,
        description,
        shift,
      };
      resolve({
        before: before,
        after: editedShift,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Delete shift
export const deleteShiftMaster = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[before]] = await db.query(
        `select * from shifts where shift_id = ${id}`
      );
      const [res_shift] = await db.query(
        `delete from shifts where shift_id = ${id};`
      );
      resolve({
        deleted_shift: before,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Individual data for edit
//Operator
export const getOperatorDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[operator]] = await db.query(
        `select * from operators where operator_id = ${id}`
      );
      resolve(operator);
    } catch (err) {
      reject(err);
    }
  });
};

//Operation
export const getOperationDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[operation]] = await db.query(
        `select * from operations where operation_id = ${id}`
      );
      resolve(operation);
    } catch (err) {
      reject(err);
    }
  });
};

//Machine
export const getMachineDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[machine]] = await db.query(
        `select * from machines where machine_id = ${id}`
      );
      resolve(machine);
    } catch (err) {
      reject(err);
    }
  });
};

//Inspector
export const getInspectorDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[inspector]] = await db.query(
        `select * from inspectors where inspector_id = ${id}`
      );
      resolve(inspector);
    } catch (err) {
      reject(err);
    }
  });
};

//Defect
export const getDefectDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[defect]] = await db.query(
        `select * from defects where defect_id = ${id}`
      );
      resolve(defect);
    } catch (err) {
      reject(err);
    }
  });
};

//MachineLoss
export const getMachineLossDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[machine_loss]] = await db.query(
        `select * from machine_loss where machine_loss_id = ${id}`
      );
      resolve(machine_loss);
    } catch (err) {
      reject(err);
    }
  });
};

//Shift
export const getShiftDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[shift]] = await db.query(
        `select * from shifts where shift_id = ${id}`
      );
      resolve(shift);
    } catch (err) {
      reject(err);
    }
  });
};

//Part number
export const getPartNumberDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[part_number]] = await db.query(
        `select * from part_numbers where part_number_id = ${id}`
      );
      resolve(part_number);
    } catch (err) {
      reject(err);
    }
  });
};

//Work Order
export const getWorkOrderDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[res_work_order]] = await db.query(
        `select w.*, p.status as part_number_status,p.part_number as part_number,date_format(w.created_date, '%Y-%m-%d') as created_date, date_format(w.last_updated, '%Y-%m-%d') as last_updated from work_orders w inner join part_numbers p on w.part_number_id = p.part_number_id where w.work_order_id = ${id};`
      );
      const [res_active_part_numbers] = await db.query(
        "select part_number_id as value,part_number as label from part_numbers where status != 'inactive';"
      );
      resolve({
        work_order: res_work_order,
        part_numbers: res_active_part_numbers,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Part Number
//To add a new Part number
export const addPartNumber = ({
  part_number,
  part_name,
  part_cost,
  status,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_part_number] = await db.query(
        `insert into part_numbers (part_number,part_name,status,part_cost,created_date,last_updated,remarks) values ("${part_number}","${part_name}","${status}",${part_cost},"${curr_date}","${curr_date}","${remarks}");`
      );
      let inserted_part_number = {
        id: res_part_number.insertId,
        part_number,
        part_name,
        part_cost,
        status,
        remarks,
      };
      resolve(inserted_part_number);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a part number
export const editPartNumber = ({
  id,
  part_number,
  part_name,
  part_cost,
  status,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[res_part_number]] = await db.query(
        `select *, date_format(created_date, '%Y-%m-%d') as created_date, date_format(last_updated, '%Y-%m-%d') as last_updated from part_numbers where part_number_id = ${id};`
      );
      const [result] = await db.query(
        `update part_numbers set part_number = "${part_number}", part_name = "${part_name}",part_cost = "${part_cost}",status = "${status}",remarks = "${remarks}", last_updated = "${curr_date}" where part_number_id = ${id};`
      );

      let editedEntry = {
        id,
        part_number,
        part_name,
        part_cost,
        status,
        remarks,
      };
      resolve({ Before: res_part_number, After: editedEntry });
    } catch (err) {
      reject(err);
    }
  });
};

//Work order
//To fetch active part numbers when creating new work order
export const getActivePartNumbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_active_part_numbers] = await db.query(
        "select part_number_id as value,part_number as label from part_numbers where status != 'inactive';"
      );
      resolve(res_active_part_numbers);
    } catch (err) {
      reject(err);
    }
  });
};

//To add a work order
export const addWorkOrder = ({
  work_order,
  part_number,
  total_mix,
  remarks,
  status,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into work_orders (work_order,part_number_id,total_mix,created_date,last_updated,remarks,status) values ("${work_order}","${part_number}","${total_mix}","${curr_date}","${curr_date}","${remarks}","${status}");`
      );

      let insertedWorkOrder = {
        id: result.insertId,
        work_order,
        part_number,
        total_mix,
        remarks,
        status,
      };
      resolve(insertedWorkOrder);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a work order
export const editWorkOrder = ({
  id,
  work_order,
  part_number,
  total_mix,
  status,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[res_work_order]] = await db.query(
        `select * from work_orders where work_order_id = ${id};`
      );
      const [result] = await db.query(
        `update work_orders set work_order = "${work_order}", part_number_id = ${part_number}, total_mix = "${total_mix}", remarks = "${remarks}", status = "${status}", last_updated = "${curr_date}" where work_order_id = ${id};`
      );

      let editedWorkOrder = {
        id,
        work_order,
        part_number,
        total_mix,
        status,
        remarks,
      };

      resolve({ Before: res_work_order, After: editedWorkOrder });
    } catch (err) {
      reject(err);
    }
  });
};

//To add a UOM
export const addUOM = ({ description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into unit_of_measurements (description,status,created_date,last_updated) values ("${description}","${status}","${curr_date}","${curr_date}");`
      );
      let insertedUOM = {
        id: result.insertId,
        description,
        status,
      };
      resolve(insertedUOM);
    } catch (err) {
      reject(err);
    }
  });
};

//To get UOM detail for edit
export const getUOMDetails = ({ uom_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[uom]] = await db.query(
        `select description, status from unit_of_measurements where uom_id = ${uom_id};`
      );
      resolve(uom);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a UOM
export const editUOM = ({ uom_id, description, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[uom]] = await db.query(
        `select * from unit_of_measurements where uom_id = ${uom_id};`
      );
      const [result] = await db.query(
        `update unit_of_measurements set description = "${description}", status =  "${status}", last_updated = "${curr_date}" where uom_id = ${uom_id};`
      );
      let editUOM = {
        uom_id,
        description,
        status,
      };
      resolve({
        Before : uom,
        After : editUOM
      })
    } catch (err) {
      reject(err);
    }
  });
};
