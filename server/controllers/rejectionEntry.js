import { db } from "../config/connection.js";
import { padZero } from "../validations/validations.js";

//To get current date
const currentDate = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(currentDate.getTime() + istOffset);
const year = currentDate.getFullYear();
const month = padZero(istDate.getMonth() + 1); // Months are zero-based (0 = January)
const day = padZero(istDate.getDate());
const curr_date = `${year}-${month}-${day}`;

//To get all active work orders
export const getWorkOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_work_orders] = await db.query(
        `select work_order_id as value, work_order as label from work_orders where status != 'inactive';`
      );
      resolve(res_work_orders);
    } catch (err) {
      reject(err);
    }
  });
};

//To get rejection entries for a work order
export const getRejectionEntry = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_rej_entries] = await db.query(
        `select r.rejection_id, w.work_order as work_order,r.rejection_qty as rejection_qty,r.created_date as created_date,r.last_updated as last_updated,m.name as machine,o.operation_description as operation,op.name as operator,d.description as reason, r.remarks as remarks from rejections r inner join work_orders w on r.work_order_id = w.work_order_id inner join machines m on r.machine_id = m.machine_id inner join operations o on r.operation_id = o.operation_id inner join operators op on r.operator_id = op.operator_id inner join defects d on r.defect_id = d.defect_id where r.work_order_id = ${id};`
      );
      resolve(res_rej_entries);
    } catch (err) {
      reject(err);
    }
  });
};

//To get all master values for dropdown
export const getMasterData = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_operators] = await db.query(
        "select operator_id as value, name as label from operators where status != 'inactive';"
      );
      const [res_operations] = await db.query(
        "select operation_id as value, operation_description as label from operations where status != 'inactive';"
      );
      const [res_reasons] = await db.query(
        "select defect_id as value, description as label from defects where status != 'inactive';"
      );
      const [res_machines] = await db.query(
        "select machine_id as value, name as label from machines where status != 'inactive';"
      );
      const [[res_work_order]] = await db.query(
        `select work_order from work_orders where work_order_id = ${id};`
      );
      resolve({
        operators: res_operators,
        operations: res_operations,
        machines: res_machines,
        reasons: res_reasons,
        work_order: res_work_order,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To add a rejection entry
export const addRejectionEntry = ({
  work_order,
  operation,
  operator,
  machine,
  reason,
  remarks,
  rejection_qty,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into rejections (created_date,last_updated,work_order_id,operation_id,machine_id,operator_id,defect_id,rejection_qty,remarks) values ("${curr_date}","${curr_date}",${work_order},${operation},${machine},${operator},${reason},${rejection_qty},"${remarks}");`
      );
      let insertedEntry = {
        id: result.insertId,
        work_order,
        operation,
        operator,
        machine,
        reason,
        remarks,
        rejection_qty,
      };
      resolve(insertedEntry);
    } catch (err) {
      reject(err);
    }
  });
};

//To get data for edit
export const getRejectionEntryEdit = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [res_operators] = await db.query(
        "select operator_id as value, name as label from operators where status != 'inactive';"
      );
      const [res_operations] = await db.query(
        "select operation_id as value, operation_description as label from operations where status != 'inactive';"
      );
      const [res_reasons] = await db.query(
        "select defect_id as value, description as label from defects where status != 'inactive';"
      );
      const [res_machines] = await db.query(
        "select machine_id as value, name as label from machines where status != 'inactive';"
      );
      const [[res_work_order]] = await db.query(
        `select r.work_order_id , w.work_order as work_order from rejections r inner join work_orders w on r.work_order_id = w.work_order_id where rejection_id = ${id};`
      );
      const [[res_rej_entry]] = await db.query(
        `select * from rejections where rejection_id = ${id}`
      );
      resolve({
        operations: res_operations,
        operators: res_operators,
        machines: res_machines,
        reasons: res_reasons,
        work_order: res_work_order,
        rejection_entry: res_rej_entry,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a rejection entry
export const editRejectionEntry = ({
  id,
  operation,
  operator,
  machine,
  reason,
  remarks,
  rejection_qty,
}) => {
    console.log({
        id,
        operation,
        operator,
        machine,
        reason,
        remarks,
        rejection_qty,
      })
  return new Promise(async (resolve, reject) => {
    try {
      const [[rejection_entry]] = await db.query(
        `select * from rejections where rejection_id = ${id};`
      );
      const [result] = await db.query(
        `update rejections set operation_id = ${operation}, operator_id = ${operator}, machine_id = ${machine}, defect_id = ${reason}, remarks = "${remarks}", rejection_qty = ${rejection_qty} where rejection_id = ${id}`
      );
      let editedEntry = {
        id,
        operation,
        operator,
        machine,
        reason,
        remarks,
        rejection_qty,
      };
      resolve({Before: rejection_entry, After : editedEntry})
    } catch (err) {
      reject(err);
    }
  });
};

//To delete a rejection entry
export const deleteRejectionEntry = ({id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[entry]] = await db.query(`select * from rejections where rejection_id = ${id};`)
      const result = await db.query(`delete from rejections where rejection_id = ${id};`)
      resolve({Delete : entry})
    }catch(err){
      reject(err)
    }
  })
}