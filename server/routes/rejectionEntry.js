import express from 'express';
import { addRejectionEntry, deleteRejectionEntry, editRejectionEntry, getMasterData, getRejectionEntry, getRejectionEntryEdit, getWorkOrders } from '../controllers/rejectionEntry.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

//To get active work orders
router.get('/',[verifyToken],(req,res) => {
    getWorkOrders().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get rejection entries for a work order
router.get('/entries',[verifyToken],(req,res) => {
    let work_order = {
        id:Number(req.query.id)
    }
    getRejectionEntry(work_order).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get master data
router.get('/master',[verifyToken],(req,res) => {
    let work_order = {
        id:req.query.work_order
    }
    getMasterData(work_order).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a rejection entry
router.post('/add',[verifyToken],(req,res) => {
    let entry = {
        work_order:Number(req.body.work_order),
        operation:Number(req.body.operation),
        machine:Number(req.body.machine),
        operator:Number(req.body.operator),
        rejection_qty:parseFloat(req.body.rejection_qty),
        remarks:req.body.remarks,
        reason:Number(req.body.reason)
    }
    addRejectionEntry(entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get data for rejection entry edit
router.get('/editData',[verifyToken],(req,res) => {
    let rejection = {
        id:Number(req.query.id)
    }
    getRejectionEntryEdit(rejection).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a rejection entry
router.post('/edit',[verifyToken],(req,res) => {
    let rejection = {
        id:Number(req.body.id),
        operation:Number(req.body.operation),
        operator:Number(req.body.operator),
        machine:Number(req.body.machine),
        reason:Number(req.body.reason),
        remarks:req.body.remarks,
        rejection_qty:parseFloat(req.body.rejection_qty)
    }
    console.log("Routes",rejection)
    editRejectionEntry(rejection).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})


//To delete a rejection entry
router.post('/delete',[verifyToken],(req,res) => {
    let rejection = {
        id:Number(req.body.id)
    }
    deleteRejectionEntry(rejection).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})
export default router