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
        invoice_number : req.body.inputs.invoice_number,
        work_order : req.body.selectedOptions,
        customer : Number(req.body.inputs.customer),
        remarks : req.body.inputs.remarks,
        status : req.body.inputs.status
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
        id : Number(req.body.inputs.invoice_id),
        invoice_number : req.body.inputs.invoice_number,
        work_order : req.body.selectedOptions,
        customer : Number(req.body.inputs.customer),
        status : req.body.inputs.status,
        remarks : req.body.inputs.remarks
    }
    editInvoice(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;