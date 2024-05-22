import { db } from "../config/connection.js";

//To fetch data from rejection dashboard
export const getDashboard = ({ from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result1 = await db.query(
        `SELECT
        r.Id as Id, 
        date_format(r.date,'%Y-%m-%d') as date,
        s.description AS shift,
        i.name AS inspector,
        r.remarks,
        r.production_qty,
        date_format(r.production_from,'%Y-%m-%d') as production_from,
        date_format(r.production_to,'%Y-%m-%d') as production_to,
        JSON_ARRAYAGG( d.description) AS reasons,
        w.work_order,
        w.total_mix,
        p.part_number,
        JSON_ARRAYAGG(rs.rejection_qty) AS rejection_qty,
        round(SUM(rs.rejection_qty) * p.part_cost) AS total_cost,
        JSON_ARRAYAGG( m.name) AS machines,
        JSON_ARRAYAGG( o.name) AS operators,
        JSON_ARRAYAGG( os.operation_description) AS operations
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        rejections rs ON r.work_order_id = rs.work_order_id
    LEFT JOIN 
        defects d ON d.defect_id = rs.defect_id
    LEFT JOIN 
        work_orders w ON r.work_order_id = w.work_order_id
    LEFT JOIN 
        machines m ON rs.machine_id = m.machine_id
    LEFT JOIN 
        operators o ON rs.operator_id = o.operator_id
    LEFT JOIN 
        operations os ON rs.operation_id = os.operation_id
    LEFT JOIN 
        shifts s ON r.shift_id = s.shift_id
    LEFT JOIN 
        inspectors i ON r.inspector_id = i.inspector_id
    LEFT JOIN 
	      part_numbers p ON w.part_number_id = p.part_number_id
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        r.date, s.description, i.name, r.remarks, r.production_qty, r.production_from, r.production_to, w.work_order,p.part_number_id
        ;`
      );
      const result2 = await db.query(
        "select DATE_FORMAT(max(date), '%Y-%m-%d') as latest_update from rejection_dashboard;"
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
      const result1 = await db.query(
        "select * from shifts where status not in ('inactive');"
      );
      const result2 = await db.query(
        "select * from operations where status not in ('inactive');"
      );
      const result3 = await db.query(
        "select * from operators where status not in ('inactive');"
      );
      const result4 = await db.query(
        "select * from inspectors where status not in ('inactive');"
      );
      const result5 = await db.query(
        "select * from defects where status not in ('inactive');"
      );
      const result6 = await db.query(
        "select * from machines where status not in ('inactive');"
      );
      const result7 = await db.query(
        "select * from machine_loss where status not in ('inactive');"
      );
      const [result8] = await db.query(
        "select work_order_id as value, work_order as label from work_orders where status not in ('inactive') and work_order_id not in (select work_order_id from rejection_dashboard group by work_order_id);"
      );
      resolve({
        shifts: result1[0],
        operations: result2[0],
        operators: result3[0],
        inspectors: result4[0],
        defects: result5[0],
        machines: result6[0],
        machine_loss: result7[0],
        work_orders: result8,
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
  inspector,
  work_order,
  production_qty,
  remarks,
  production_from,
  production_to,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        `insert into rejection_dashboard (date,shift_id,inspector_id,production_qty,work_order_id, remarks,production_from,production_to) values ("${date}",${shift},${inspector},${production_qty},${work_order},"${remarks}","${production_from}","${production_to}");`
      );

      let insertedEntry = {
        id: result[0].insertId,
        date,
        shift,
        inspector,
        work_order,
        production_qty,
        remarks,
        production_from,
        production_to,
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
  inspector,
  work_order,
  production_qty,
  remarks,
  production_from,
  production_to,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let editedEntry = {
        id,
        date,
        shift,
        inspector,
        work_order,
        production_qty,
        remarks,
        production_from,
        production_to
      };

      const [[entry]] = await db.query(
        `select * from rejection_dashboard where Id = ${id};`
      );

      const result = await db.query(
        `update rejection_dashboard set date = "${date}", shift_id = ${shift}, inspector_id = ${inspector}, work_order_id = ${work_order},production_qty = ${production_qty},remarks = "${remarks}",production_from = "${production_from}",production_to = "${production_to}" where Id = ${id};`
      );

      resolve({ status: "Success", before: entry, edited_entry: editedEntry });
    } catch (err) {
      reject(err);
    }
  });
};
