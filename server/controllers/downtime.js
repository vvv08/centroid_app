import { db } from "../config/connection.js";

//To get downtime data
export const getDowntimeData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [dashboard] = await db.query(
        "select d.downtime_id as id,DATE_FORMAT(d.date, '%d-%m-%Y %H:%i') as date, DATE_FORMAT(d.idle_from, '%d-%m-%Y %H:%i') as idle_from,DATE_FORMAT(d.idle_to, '%d-%m-%Y %H:%i') as idle_to,ml.description as machine_loss,m.name as machine,i.name as inspector , d.remarks from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id inner join machines m on d.machine_id = m.machine_id inner join inspectors i on d.inspector_id = i.inspector_id;"
      );
      const [latest] = await db.query(
        "select DATE_FORMAT(max(date), '%d-%m-%Y') as latest_update from downtime_dashboard ;"
      );
      resolve({
        dashboard: dashboard,
        latest: latest,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To delete downtime
export const deleteDowntime = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[entry]] = await db.query(
        `select * from downtime_dashboard where downtime_id = ${id};`
      );
      const [result] = await db.query(
        `delete from downtime_dashboard where downtime_id = ${id};`
      );
      resolve(entry);
    } catch (err) {
      reject(err);
    }
  });
};

//To add a downtime entry
export const addDowntime = ({
  entry_date,
  idle_from,
  idle_to,
  machine,
  machine_loss,
  remarks,
  inspector,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        `insert into downtime_dashboard (date,machine_id,machine_loss_id,idle_from,idle_to,remarks,inspector_id) values ("${entry_date}",${machine},${machine_loss},"${idle_from}","${idle_to}","${remarks}",${inspector});`
      );
      let insertedEntry = {
        id: result[0].insertId,
        entry_date,
        machine,
        idle_from,
        idle_to,
        machine_loss,
        remarks,
        inspector,
      };
      resolve(insertedEntry);
    } catch (err) {
      reject(err);
    }
  });
};

//To get entry for downtime edit
export const getDowntimeEntry = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[entry]] = await db.query(
        `select *, DATE_FORMAT(date, '%Y-%m-%dT%H:%i') as date, DATE_FORMAT(idle_from, '%Y-%m-%dT%H:%i') as idle_time_from, DATE_FORMAT(idle_to, '%Y-%m-%dT%H:%i') as idle_time_to  from downtime_dashboard where downtime_id = ${id};`
      );
      resolve(entry);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit entry
export const editDowntimeEntry = ({
  id,
  entry_date,
  idle_from,
  idle_to,
  machine,
  machine_loss,
  remarks,
  inspector,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[entry]] = await db.query(
        `select *, DATE_FORMAT(date, '%Y-%m-%dT%H:%i') as date, DATE_FORMAT(idle_from, '%Y-%m-%dT%H:%i') as idle_time_from, DATE_FORMAT(idle_to, '%Y-%m-%dT%H:%i') as idle_time_to  from downtime_dashboard where downtime_id = ${id};`
      );

      const result = await db.query(
        `update downtime_dashboard set date = "${entry_date}" , machine_id = ${machine} , machine_loss_id = ${machine_loss},remarks = "${remarks}",idle_from = "${idle_from}",idle_to = "${idle_to}",inspector_id = ${inspector} where downtime_id = ${id}`
      );

      let editedEntry = {
        id,
        entry_date,
        idle_from,
        idle_to,
        machine,
        machine_loss,
        remarks,
        inspector,
      };

      resolve({
        before : entry,
        after : editedEntry
      })
    } catch (err) {
      reject(err);
    }
  });
};
