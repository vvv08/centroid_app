import { db } from "../../config/connection.js";
import { padZero } from "../../validations/validations.js";

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

console.log({IST : curr_date, current : currentDate})

export const getCAPADetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {

      const [general] = await db.query(`select c.name as customer, i.invoice_number as invoice_number, i.invoice_id as invoice_id, json_arrayagg(w.work_order) as work_order, json_arrayagg(p.part_number) as part_number, json_arrayagg(p.part_name) as part_name from invoices i inner join invoice_work_order iw on i.invoice_id = iw.invoice_id inner join work_orders w on iw.work_order_id = w.work_order_id inner join part_numbers p on w.part_number_id = p.part_number_id inner join customers c on i.customer_id = c.customer_id where i.invoice_id = ${id} group by iw.invoice_id;`);

      const [issues] = await db.query(
        `select u.description as uom , r.cust_rej_id, i.invoice_number, r.description as problem,  date_format(r.created_date, '%Y-%m-%d') as created_date, date_format(r.last_updated, '%Y-%m-%d') as last_updated , r.rejected_qty from cust_rejection_issues r inner join invoices i on r.invoice_id = i.invoice_id inner join unit_of_measurements u on r.uom_id = u.uom_id where r.invoice_id = ${id};`
      );

      const [containment] = await db.query(
        `select  date_format(c.created_date, '%Y-%m-%d') as created_date, date_format(c.last_updated, '%Y-%m-%d') as last_updated  ,c.containment_id, c.stock_check_supplier, date_format(c.supplier_date, '%Y-%m-%d') as supplier_date, c.stock_check_customer , date_format(c.customer_date, '%Y-%m-%d') as customer_date , c.stock_check_production , date_format(c.production_date, '%Y-%m-%d') as production_date, c.stock_check_transit , date_format(c.transit_date, '%Y-%m-%d') as transit_date, c.remarks , r.description as problem from cust_containment_actions c inner join cust_rejection_issues r on c.cust_rej_id = r.cust_rej_id where c.cust_rej_id in (select cust_rej_id from cust_rejection_issues where invoice_id = ${id} group by cust_rej_id);`
      );

      const [root_causes] = await db.query(
        `select rt.root_id, rt.description as root_cause, rt.remarks ,  date_format(rt.created_date, '%Y-%m-%d') as created_date, date_format(rt.last_updated, '%Y-%m-%d') as last_updated  , r.description as problem from cust_root_causes rt inner join cust_rejection_issues r on rt.cust_rej_id = r.cust_rej_id where rt.cust_rej_id in (select cust_rej_id from cust_rejection_issues where invoice_id = ${id} group by cust_rej_id);`
      );

      const [corrective_actions] = await db.query(
        `select c.corrective_id , c.description as corrective_action ,  date_format(c.created_date, '%Y-%m-%d') as created_date, date_format(c.last_updated, '%Y-%m-%d') as last_updated  , c.remarks , i.name as inspector , rt.description as problem from cust_corrective_actions c inner join cust_rejection_issues rt on c.cust_rej_id = rt.cust_rej_id inner join inspectors i on c.inspector_id = i.inspector_id where c.cust_rej_id in (select cust_rej_id from cust_rejection_issues where invoice_id = ${id} group by cust_rej_id);`
      );

      const [preventive_actions] = await db.query(
        `select p.preventive_id , p.description as preventive_action ,  date_format(p.created_date, '%Y-%m-%d') as created_date, date_format(p.last_updated, '%Y-%m-%d') as last_updated  , p.remarks , i.name as inspector , r.description as problem from cust_preventive_actions p inner join cust_rejection_issues r on p.cust_rej_id = r.cust_rej_id inner join inspectors i on p.inspector_id = i.inspector_id where p.cust_rej_id in (select cust_rej_id from cust_rejection_issues where invoice_id = ${id} group by cust_rej_id);`
      );

      resolve({
        general : general,
        issues: issues,
        root_causes: root_causes,
        containment_actions: containment,
        corrective_actions: corrective_actions,
        preventive_actions: preventive_actions
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To get Invoice details
export const getInvoices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [invoices] = await db.query(
        "select invoice_id as value, invoice_number as label from invoices where status != 'inactive';"
      );
      resolve(invoices);
    } catch (err) {
      reject(err);
    }
  });
};

//To get active UOMs
export const getUOMs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [uom] = await db.query(
        "select uom_id as value, description as label from unit_of_measurements where status != 'inactive';"
      );
      resolve({
        uoms: uom
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Add a issue
export const addIssue = ({ invoice, description, rejected_qty,uom }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into cust_rejection_issues (invoice_id,description,rejected_qty,uom_id,created_date,last_updated) values (${invoice},"${description}",${rejected_qty},${uom},"${curr_date}","${curr_date}");`
      );
      let insertedIssue = {
        id: result.insertId,
        invoice,
        description,
        rejected_qty,
      };
      resolve(insertedIssue);
    } catch (err) {
      reject(err);
    }
  });
};

//To get an issue for edit
export const getIssueForEdit = ({ cust_rej_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[issue]] = await db.query(
        `select r.cust_rej_id, r.description as problem, r.rejected_qty, r.uom_id as uom , u.description as uom_desc , u.status as uom_status from cust_rejection_issues r inner join unit_of_measurements u on r.uom_id = u.uom_id where cust_rej_id = ${cust_rej_id};`
      );
      resolve(issue);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a issue
export const editIssue = ({ cust_rej_id, description, rejected_qty, uom }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[issue]] = await db.query(
        `select * from cust_rejection_issues where cust_rej_id = ${cust_rej_id};`
      );
      const [result] = await db.query(
        `update cust_rejection_issues set description = "${description}" , rejected_qty = ${rejected_qty},uom_id = ${uom} ,last_updated = "${curr_date}" where cust_rej_id = ${cust_rej_id};`
      );
      let editedIssue = {
        cust_rej_id,
        description,
        rejected_qty,
      };
      resolve({
        Before: issue,
        After: editedIssue,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To get issues and root causes for the invoice
export const getIssuesByInvoice = ({ invoice_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [issues] = await db.query(
        `select cust_rej_id as value,description as label from cust_rejection_issues where invoice_id = ${invoice_id};`
      );
      resolve(issues);
    } catch (err) {
      reject(err);
    }
  });
};

//To add a containment action
export const addContainment = ({
  issue,
  stock_check_supplier,
  supplier_date,
  stock_check_customer,
  customer_date,
  stock_check_production,
  production_date,
  stock_check_transit,
  transit_date,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into cust_containment_actions (cust_rej_id,stock_check_supplier,supplier_date,stock_check_customer, customer_date, stock_check_production, production_date, stock_check_transit, transit_date, remarks, created_date, last_updated) values (${issue},"${stock_check_supplier}","${supplier_date}","${stock_check_customer}","${customer_date}","${stock_check_production}","${production_date}","${stock_check_transit}","${transit_date}","${remarks}","${curr_date}","${curr_date}");`
      );
      let insertedContainment = {
        id: result.insertId,
        issue,
        stock_check_supplier,
        supplier_date,
        stock_check_customer,
        customer_date,
        stock_check_production,
        production_date,
        stock_check_transit,
        transit_date,
        remarks,
      };
      resolve(insertedContainment);
    } catch (err) {
      reject(err);
    }
  });
};

//To get containments details for edit
export const getContainmentDetails = ({ containment_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[containment]] = await db.query(
        `select c.containment_id, c.stock_check_supplier, c.supplier_date as supplier_date, c.stock_check_customer , c.customer_date as customer_date , c.stock_check_production , c.production_date as production_date, c.stock_check_transit , c.transit_date as transit_date, c.remarks , r.description as problem from cust_containment_actions c inner join cust_rejection_issues r on c.cust_rej_id = r.cust_rej_id where c.containment_id = ${containment_id}`
      );
      resolve(containment);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a containment
export const editContainment = ({
  containment_id,
  stock_check_supplier,
  supplier_date,
  stock_check_customer,
  customer_date,
  stock_check_production,
  production_date,
  stock_check_transit,
  transit_date,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[containment]] = await db.query(
        `select * from cust_containment_actions where containment_id = ${containment_id}`
      );
      const [result] = await db.query(
        `update cust_containment_actions set stock_check_supplier = "${stock_check_supplier}", supplier_date = "${supplier_date}", stock_check_customer = "${stock_check_customer}", customer_date = "${customer_date}", stock_check_production = "${stock_check_production}", production_date = "${production_date}", stock_check_transit = "${stock_check_transit}", transit_date = "${transit_date}", remarks = "${remarks}", last_updated = ${curr_date} where containment_id = ${containment_id};`
      );
      let editedContainment = {
        containment_id,
        stock_check_supplier,
        supplier_date,
        stock_check_customer,
        customer_date,
        stock_check_production,
        production_date,
        stock_check_transit,
        transit_date,
        remarks,
      };
      resolve({
        Before: containment,
        After: editedContainment,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To delete a containment action
export const deleteContainment = ({containment_id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[containment]] = await db.query(`select * from cust_containment_actions where containment_id = ${containment_id};`)
      const [result] = await db.query(`delete from cust_containment_actions where containment_id = ${containment_id}`)
      resolve(containment)
    }catch(err){
      reject(err)
    }
  })
}

//To get inspectors
export const getInspectorsCAPA = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [inspectors] = await db.query(
        `select inspector_id as value, name as label from inspectors where status != "inactive";`
      );
      resolve(inspectors);
    } catch (err) {
      reject(err);
    }
  });
};

//To add a corrective action
export const addCorrective = ({ issue, inspector, description, remarks }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into cust_corrective_actions (description,inspector_id,cust_rej_id,remarks,created_date,last_updated) values ("${description}",${inspector},${issue},"${remarks}","${curr_date}","${curr_date}");`
      );
      let insertedCorrective = {
        id: result.insertId,
        issue,
        inspector,
        description,
        remarks,
      };
      resolve(insertedCorrective);
    } catch (err) {
      reject(err);
    }
  });
};

//To get corrective action to edit
export const getCorrectiveDetails = ({ corrective_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[corrective]] = await db.query(
        `select c.corrective_id , c.description as corrective_action , c.created_date as created_date , c.last_updated as last_updated , c.remarks , i.name as inspector, i.status as inspector_status, c.inspector_id as inspector_id , rt.description as problem from cust_corrective_actions c inner join cust_rejection_issues rt on c.cust_rej_id = rt.cust_rej_id inner join inspectors i on c.inspector_id = i.inspector_id where c.corrective_id = ${corrective_id};`
      );
      resolve(corrective);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a corrective action
export const editCorrective = ({
  corrective_id,
  inspector,
  description,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[corrective]] = await db.query(
        `select * from cust_corrective_actions where corrective_id = ${corrective_id};`
      );
      const [result] = await db.query(
        `update cust_corrective_actions set inspector_id = ${inspector}, description = "${description}", remarks = "${remarks}", last_updated  = "${curr_date}" where corrective_id = ${corrective_id}`
      );
      let editedCorrectvie = {
        corrective_id,
        inspector,
        description,
        remarks,
      };
      resolve({
        Before: corrective,
        After: editedCorrectvie,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To delete a corrective action
export const deleteCorrectiveAction = ({corrective_id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[corrective_action]] = await db.query(`select * from cust_corrective_actions where corrective_id = ${corrective_id};`);
      const [result] = await db.query(`delete from cust_corrective_actions where corrective_id = ${corrective_id}`)
      resolve(corrective_action)
    }catch(err){
      reject(err)
    }
  })
}

//To add a root cause
export const addRootCause = ({ issue, description, remarks }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into cust_root_causes (cust_rej_id,description,remarks,created_date,last_updated) values (${issue},"${description}","${remarks}","${curr_date}","${curr_date}");`
      );
      let createdRootCause = {
        id: result.insertId,
        issue,
        description,
        remarks,
      };
      resolve(createdRootCause);
    } catch (err) {
      reject(err);
    }
  });
};

//To get Root causes details for edit
export const getRootCausesDetails = ({ root_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[rootCause]] = await db.query(
        `select rt.root_id, rt.description as root_cause, rt.remarks , rt.created_date as created_date , rt.last_updated as last_updated , r.description as problem from cust_root_causes rt inner join cust_rejection_issues r on rt.cust_rej_id = r.cust_rej_id where rt.root_id = ${root_id};`
      );
      resolve(rootCause);
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a root cause
export const editRootCause = ({ root_id, description, remarks }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[root_cause]] = await db.query(
        `select * from cust_root_causes where root_id = ${root_id};`
      );
      const [result] = await db.query(
        `update cust_root_causes set description = "${description}", remarks = "${remarks}", last_updated = "${curr_date}" where root_id = ${root_id};`
      );
      let editedRootCause = {
        root_id,
        description,
        remarks,
      };
      resolve({
        Before: root_cause,
        After: editedRootCause,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To delete a root cause
export const deleteRootCause = ({root_id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[root_cause]] = await db.query(`select * from cust_root_causes where root_id = ${root_id};`)
      const [result] = await db.query(`delete from cust_root_causes where root_id = ${root_id};`)
      resolve(root_cause)
    }catch(err){
      reject(err)
    }
  })
}

//To add a preventive action
export const addPreventiveAction = ({
  issue,
  description,
  inspector,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into cust_preventive_actions (cust_rej_id,description,inspector_id,remarks,created_date,last_updated) values (${issue},"${description}",${inspector},"${remarks}","${curr_date}","${curr_date}");`
      );

      let addedPreventiveAction = {
        id: result.insertId,
        issue,
        description,
        inspector,
        remarks,
      };
      resolve(addedPreventiveAction)
    } catch (err) {
      reject(err);
    }
  });
};

//To get preventive action for edit
export const getPreventiveActionDetail = ({preventive_id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[preventive_action]] = await db.query(`select p.preventive_id , p.description as preventive_action , p.created_date as created_date , p.last_updated as last_updated , p.remarks , i.name as inspector, i.status as inspector_status , r.description as problem , p.inspector_id as inspector_id from cust_preventive_actions p inner join cust_rejection_issues r on p.cust_rej_id = r.cust_rej_id inner join inspectors i on p.inspector_id = i.inspector_id where p.preventive_id = ${preventive_id};`)
      resolve(preventive_action)
    }catch(err){
      reject(err)
    }
  })
}

//To edit a preventive action
export const editPreventiveAction = ({
  preventive_id,
  inspector,
  description,
  remarks
}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[preventive_action]] = await db.query(`select * from cust_preventive_actions where preventive_id = ${preventive_id}`)
      const [result] = await db.query(`update cust_preventive_actions set inspector_id = ${inspector}, description = "${description}",remarks = "${remarks}", last_updated = "${curr_date}" where preventive_id = ${preventive_id}`)
      let editedPreventiveAction = {
        preventive_id,
        inspector,
        description,
        remarks
      }
      resolve({
        Before : preventive_action,
        After : editedPreventiveAction
      })
    }catch(err){
      reject(err)
    }
  })
}

//To delete a preventive action
export const deletePreventiveAction = ({preventive_id}) => {
  return new Promise(async(resolve,reject) => {
    try{
      const [[preventive_action]] = await db.query(`select * from cust_preventive_actions where preventive_id = ${preventive_id};`)
      const [result] = await db.query(`delete from cust_preventive_actions where preventive_id = ${preventive_id};`)
      resolve(preventive_action)
    }catch(err){
      reject(err)
    }
  })
}
