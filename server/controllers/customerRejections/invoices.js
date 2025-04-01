import { db } from "../../config/connection.js";

//To get invoices
export const getInvoices = () => { 
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        "select i.invoice_id, i.invoice_number, CONVERT_TZ(i.created_date, '+00:00', '+05:30') as created_date,CONVERT_TZ(i.last_updated, '+00:00', '+05:30') as last_updated, c.name as customer, JSON_ARRAYAGG(w.work_order) as work_order, i.remarks, i.status  from invoices i inner join customers c on i.customer_id = c.customer_id inner join invoice_work_order iw on i.invoice_id = iw.invoice_id inner join work_orders w on iw.work_order_id = w.work_order_id group by i.invoice_id ORDER BY i.created_date DESC;"
      );
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

//To get customers and work orders
export const getDetails = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result1] = await db.query(
        "select customer_id as value, name as label from customers where status != 'inactive';"
      );
      const [result2] = await db.query(
        "select work_order_id as value, work_order as label from work_orders where status != 'inactive';"
      );
      resolve({
        customers: result1,
        work_orders: result2,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To add a invoice
export const addInvoice = ({
  invoice_number,
  work_order,
  customer,
  status,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        `insert into invoices (invoice_number,customer_id,status,remarks,created_date,last_updated) values ("${invoice_number}",${customer},"${status}","${remarks}",NOW(),NOW());`
      );
      let insertedInvoice = {
        id: result.insertId,
        invoice_number,
        work_order : [],
        customer,
        status,
        remarks,
      };
      work_order.map(async ({value}) => {
        const result = await db.query(
          `INSERT INTO invoice_work_order (work_order_id,invoice_id) VALUES (${value},${insertedInvoice.id});`
        );
        //Not getting pushed
        insertedInvoice.work_order.push(value);
      });
      resolve(insertedInvoice);
    } catch (err) {
      reject(err);
    }
  });
};

//To get details for invoice edit
export const getInvoiceDetails = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[invoice]] = await db.query(
        `select i.* , c.status as customer_status, c.name as customer from invoices i inner join customers c on i.customer_id = c.customer_id  where i.invoice_id = ${id};`
      );
      const [invoice_work_order] = await db.query(`select iw.work_order_id as value , w.work_order as label from invoice_work_order iw inner join work_orders w on iw.work_order_id = w.work_order_id where iw.invoice_id = ${id} and w.status != "inactive"`);
      const [customers] = await db.query(
        "select customer_id as value, name as label from customers where status != 'inactive';"
      );
      const [work_orders] = await db.query(
        "select work_order_id as value, work_order as label from work_orders where status != 'inactive';"
      );
      resolve({
        invoice: invoice,
        invoice_work_order : invoice_work_order,
        customers: customers,
        work_orders: work_orders,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//To edit a invoice
export const editInvoice = ({
  id,
  invoice_number,
  work_order,
  customer,
  status,
  remarks,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[invoice]] = await db.query(
        `select * from invoices where invoice_id = ${id};`
      );
      const [result] = await db.query(
        `update invoices set invoice_number = "${invoice_number}", customer_id = ${customer}, status = "${status}",remarks = "${remarks}", last_updated = NOW() where invoice_id = ${id};`
      );
      let editedInvoice = {
        id,
        invoice_number,
        work_order,
        customer,
        status,
        remarks,
      };
      const [result2] = await db.query(`delete from invoice_work_order where invoice_id = ${id} and work_order_id in (select work_order_id from work_orders where status = "active");`)
      
      work_order.map(async ({value}) => {
        const [result3] = await db.query(`insert into invoice_work_order (invoice_id,work_order_id) values (${id},${value})`)
      });
      resolve({
        Before: invoice,
        After: editedInvoice,
      });
    } catch (err) {
      reject(err);
    }
  });
};
