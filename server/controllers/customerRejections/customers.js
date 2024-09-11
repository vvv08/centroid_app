import { db } from "../../config/connection.js"

//To get all customers
export const getCustomers = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const [customers] = await db.query("select * , CONVERT_TZ(created_date, '+00:00', '+05:30') as created_date, CONVERT_TZ(last_updated, '+00:00', '+05:30') as last_updated from customers;")
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
            const [result] = await db.query(`insert into customers (name,status,remarks,created_date,last_updated) values ("${name}","${status}","${remarks}",NOW(),NOW());`)
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
            const [result] = await db.query(`update customers set name = "${name}",status = "${status}", remarks = "${remarks}", last_updated = NOW() where customer_id = ${id};`)
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