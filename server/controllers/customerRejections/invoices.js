import { db } from "../../config/connection.js";
import { padZero } from "../../validations/validations.js";

//To get current date
const currentDate = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(currentDate.getTime() + istOffset);
const year = currentDate.getFullYear();
const month = padZero(istDate.getMonth() + 1); // Months are zero-based (0 = January)
const day = padZero(istDate.getDate());
const curr_date = `${year}-${month}-${day}`;

//To get invoices
export const getInvoices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await db.query(
        "select i.invoice_id, i.invoice_number, date_format(i.created_date,'%Y-%m-%d') as created_date,date_format(i.last_updated,'%Y-%m-%d') as last_updated, c.name as customer, w.work_order as work_order, i.remarks, i.status  from invoices i inner join customers c on i.customer_id = c.customer_id inner join work_orders w on i.work_order_id = w.work_order_id;"
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
        `insert into invoices (invoice_number,work_order_id,customer_id,status,remarks,created_date,last_updated) values ("${invoice_number}", ${work_order},${customer},"${status}","${remarks}","${curr_date}","${curr_date}");`
      );
      let insertedInvoice = {
        id: result.insertId,
        invoice_number,
        work_order,
        customer,
        status,
        remarks,
      };
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
        `select * from invoices where invoice_id = ${id};`
      );
      const [customers] = await db.query(
        "select customer_id as value, name as label from customers where status != 'inactive';"
      );
      const [work_orders] = await db.query(
        "select work_order_id as value, work_order as label from work_orders where status != 'inactive';"
      );
      resolve({
        invoice: invoice,
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
        `update invoices set invoice_number = "${invoice_number}", work_order_id = ${work_order}, customer_id = ${customer}, status = "${status}",remarks = "${remarks}", last_updated = "${curr_date}" where invoice_id = ${id};`
      );
      let editedInvoice = {
        id,
        invoice_number,
        work_order,
        customer,
        status,
        remarks,
      };
      resolve({
        Before: invoice,
        After: editedInvoice,
      });
    } catch (err) {
      reject(err);
    }
  });
};
