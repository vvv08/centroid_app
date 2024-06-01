import { db } from "../../config/connection.js"
import { padZero } from "../../validations/validations.js";

//To get current date
const currentDate = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(currentDate.getTime() + istOffset);
const year = currentDate.getFullYear();
const month = padZero(istDate.getMonth() + 1); // Months are zero-based (0 = January)
const day = padZero(istDate.getDate());
const curr_date = `${year}-${month}-${day}`;

//To get all customers
export const getCustomers = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const [customers] = await db.query("select * , created_date as created_date, last_updated as last_updated from customers;")
            resolve(customers)
        }catch(err){
            reject(err)
        }
    })
}

//To add a customer
export const addCustomer = ({
    name,
    status,
    remarks
}) => {
    return new Promise (async(resolve,reject) => {
        try{
            const [result] = await db.query(`insert into customers (name,status,remarks,created_date,last_updated) values ("${name}","${status}","${remarks}","${curr_date}","${curr_date}");`)
            let insertedCustomer = {
                id: result.insertId,
                name,
                status,
                remarks
            }
            resolve(insertedCustomer)
        }catch(err){
            reject(err)
        }
    })
}


//To get a customer detail
export const getCustomerDetail = ({id}) => {
    return new Promise (async(resolve,reject) => {
        try{
            const [[customer]] = await db.query(`select * from customers where customer_id = ${id};`)
            resolve(customer)
        }catch(err){
            reject(err)
        }
    })
}
//To edit a customer
export const editCustomer = ({
    id,
    name,
    status,
    remarks
}) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [customer] = await db.query(`select * from customers where customer_id = ${id};`)
            const [result] = await db.query(`update customers set name = "${name}",status = "${status}", remarks = "${remarks}", last_updated = "${curr_date}" where customer_id = ${id};`)
            let editedCustomer = {
                id,
                name,
                status,
                remarks 
            }
            resolve({
                Before : customer,
                After : editedCustomer
            })
        }catch(err){
            reject(err)
        }
    })
}