import express from 'express';
import { addCustomer, editCustomer, getCustomerDetail, getCustomers } from '../../controllers/customerRejections/customers.js';
import { verifyToken } from '../../config/verify.js'

const router = express.Router();

//To get customers
router.get('/',[verifyToken],(req,res) => {
    getCustomers().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a customer
router.post('/add',[verifyToken],(req,res) => {
    let customer = {
        name : req.body.name,
        remarks : req.body.remarks,
        status : req.body.status
    }
    addCustomer(customer).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get customer details
router.get('/customerDetail',[verifyToken],(req,res) => {
    let customer = {
        id:Number(req.query.id)
    }
    getCustomerDetail(customer).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a customer
router.post('/edit',[verifyToken],(req,res) => {
    let customer = {
        id:Number(req.body.customer_id),
        name:req.body.name,
        status:req.body.status,
        remarks:req.body.remarks
    }
    editCustomer(customer).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router