import { db } from "../config/connection.js";

//To fetch data from rejection dashboard
export const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result1 = await db.query(
        "SELECT r.Id , r.total_mix , DATE_FORMAT(r.date, '%d-%m-%Y %H:%i') as date , s.description, DATE_FORMAT(r.production_from ,'%d-%m-%Y %H:%i') as production_from, DATE_FORMAT(r.production_to ,'%d-%m-%Y %H:%i') as production_to ,  m.name as machine , os.operation_description as operation , r.part_number , o.name as operator , i.name as inspector , r.batch_number , d.description as defect , r.production_qty , r.rejection_qty , r.remarks FROM rejection_dashboard r inner join defects d on r.defect_id = d.defect_id inner join operators o on r.operator_id = o.operator_id inner join operations os on r.operation_id = os.operation_id inner join inspectors i on r.inspector_id = i.inspector_id inner join machines m on r.machine_id = m.machine_id inner join shifts s on r.shift_id = s.shift_id"
      );
      const result2 = await db.query(
        "select DATE_FORMAT(max(date), '%d-%m-%Y') as latest_update from rejection_dashboard;"
      );
      //resolve([].concat(result1[0],result2[0]));
      resolve({
        latest: result2[0],
        dashboard: result1[0],
      });
    } catch (err) {
      reject(err);
    }
  });
};

//fetch data for input lists
export const getInputData = () => {
  return new Promise(async (resolve, reject) => {
    try {
       const result1 = await db.query("select * from shifts where status not in ('inactive');");
       const result2 = await db.query("select * from operations where status not in ('inactive');");
       const result3 = await db.query("select * from operators where status not in ('inactive');");
       const result4 = await db.query("select * from inspectors where status not in ('inactive');");
       const result5 = await db.query("select * from defects where status not in ('inactive');");
       const result6 = await db.query("select * from machines where status not in ('inactive');");
       const result7 = await db.query("select * from machine_loss where status not in ('inactive');");
      resolve({
        shifts: result1[0],
        operations: result2[0],
        operators: result3[0],
        inspectors: result4[0],
        defects: result5[0],
        machines: result6[0],
        machine_loss: result7[0],
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Add new entry
export const addEntry = ({
  date,
  shift,
  machine,
  operation,
  operator,
  inspector,
  part_number,
  batch_number,
  defect,
  production_qty,
  rejection_qty,
  remarks,
  production_from,
  production_to,
  total_mix
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        `insert into rejection_dashboard (date,shift_id,machine_id,operation_id,operator_id,inspector_id,defect_id,production_qty,rejection_qty,part_number,batch_number, remarks,production_from,production_to,total_mix) values ("${date}",${shift},${machine},${operation},${operator},${inspector},${defect},${production_qty},${rejection_qty},"${part_number}","${batch_number}","${remarks}","${production_from}","${production_to}",${total_mix});`
      );

      let insertedEntry = {
        id: result[0].insertId,
        date,
        shift,
        machine,
        operation,
        operator,
        inspector,
        part_number,
        batch_number,
        defect,
        production_qty,
        rejection_qty,
        remarks,
        total_mix
      };
      resolve(insertedEntry);
    } catch (err) {
      reject(err);
    }
  });
};

//to delete an entry
export const deleteEntry = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[entry]] = await db.query(
        `select * from rejection_dashboard where Id = ${id}`
      );
      const result = await db.query(
        `delete from rejection_dashboard where Id = ${id}`
      );
      resolve({ status: "success", deletedEntry: entry });
    } catch (err) {
      reject(err);
    }
  });
};

//to get existing values for edit
export const getEntryForEdit = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[result]] = await db.query(
        `select *, DATE_FORMAT(date, '%Y-%m-%dT%H:%i') as date, DATE_FORMAT(production_from, '%Y-%m-%dT%H:%i') as production_from, DATE_FORMAT(production_to, '%Y-%m-%dT%H:%i') as production_to  from rejection_dashboard where Id = ${id};`
      );
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit an entry
export const editEntry = ({
  id,
  date,
  shift,
  machine,
  operator,
  operation,
  inspector,
  part_number,
  batch_number,
  production_qty,
  rejection_qty,
  defect,
  remarks,
  production_from,
  production_to,
  total_mix
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let editedEntry = {
        id,
        date,
        shift,
        machine,
        operator,
        operation,
        inspector,
        part_number,
        batch_number,
        production_qty,
        rejection_qty,
        defect,
        remarks,
        production_from,
        production_to,
        total_mix
      };
      
      const [[entry]] = await db.query(
        `select * from rejection_dashboard where Id = ${id};`
      );

      const result = await db.query(`update rejection_dashboard set date = "${date}", shift_id = ${shift}, machine_id = ${machine}, operator_id = ${operator}, operation_id = ${operation}, inspector_id = ${inspector}, defect_id = ${defect}, part_number = "${part_number}", batch_number = "${batch_number}", total_mix = ${total_mix},production_qty = ${production_qty}, rejection_qty = ${rejection_qty}, remarks = "${remarks}",production_from = "${production_from}",production_to = "${production_to}" where Id = ${id};`);

      resolve({"status" : "Success","before" : entry ,"edited_entry" : editedEntry})
    } catch (err) {
      reject(err);
    }
  });
};
