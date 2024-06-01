import express from 'express';
import { verifyToken } from '../../config/verify.js';
import { addInvoice, editInvoice, getDetails, getInvoiceDetails, getInvoices } from '../../controllers/customerRejections/invoices.js';

const router = express.Router();

//To get invoices
router.get('/',[verifyToken],(req,res) => {
    getInvoices().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get work orders and customers
router.get('/details',[verifyToken],(req,res) => {
    getDetails().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a invoice
router.post('/add',[verifyToken],(req,res) => {
    let invoice = {
        invoice_number : req.body.invoice_number,
        work_order : Number(req.body.work_order),
        customer : Number(req.body.customer),
        remarks : req.body.remarks,
        status : req.body.status
    }
    addInvoice(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get details of invoice for edit
router.get('/editDetails',[verifyToken],(req,res) => {
    let invoice = {
        id:Number(req.query.id)
    }
    getInvoiceDetails(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a invoice
router.post('/edit',[verifyToken],(req,res) => {
    let invoice = {
        id : Number(req.body.invoice_id),
        invoice_number : req.body.invoice_number,
        work_order : Number(req.body.work_order),
        customer : Number(req.body.customer),
        status : req.body.status,
        remarks : req.body.remarks
    }
    editInvoice(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;