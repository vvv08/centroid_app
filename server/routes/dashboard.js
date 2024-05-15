import express from 'express';
import { addEntry, deleteEntry, editEntry, getDashboard, getEntryForEdit, getInputData } from '../controllers/dashboard.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

//fetch data for dashboard
router.get('/', [verifyToken] ,(req,res) => {
    getDashboard().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//fetch input lists
router.get('/inputLists', [verifyToken] ,(req,res) => {
    getInputData().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({"Message" : "Internal server error", "Error" : err})
    })
})

//To add a new entry
router.post('/addEntry',[verifyToken],(req,res) => {
    let entryInputs = {
        date:req.body.entry_date,
        shift:Number(req.body.shift),
        machine:Number(req.body.machine),
        operation:Number(req.body.operation),
        operator:Number(req.body.operator),
        inspector:Number(req.body.inspector),
        part_number:req.body.part_number,
        batch_number:req.body.batch_number,
        defect:Number(req.body.defect),
        production_qty:parseFloat(req.body.production_qty),
        rejection_qty:parseFloat(req.body.rejection_qty),
        remarks:req.body.remarks,
        production_from:req.body.production_from,
        production_to:req.body.production_to,
        total_mix:parseFloat(req.body.total_mix)
    }
    addEntry(entryInputs).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete an entry
router.post('/deleteEntry',[verifyToken],(req,res) => {
    let entry_id = {
        id:Number(req.body.Id)
    }
    deleteEntry(entry_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To fetch entry data for edit
router.get('/editEntry',[verifyToken],(req,res) => {
    let entry_id = {
        id:Number(req.query.id)
    }
    getEntryForEdit(entry_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit an entry
router.post('/editEntry', [verifyToken], (req,res) => {
    let edit_entry = {
        id:Number(req.body.id),
        date: req.body.entry_date,
        shift: Number(req.body.shift),
        machine: Number(req.body.machine),
        operator: Number(req.body.operator),
        operation: Number(req.body.operation),
        inspector: Number(req.body.inspector),
        part_number: req.body.part_number,
        batch_number: req.body.batch_number,
        production_qty: parseFloat(req.body.production_qty),
        rejection_qty: parseFloat(req.body.rejection_qty),
        defect: Number(req.body.defect),
        remarks:req.body.remarks,
        production_from:req.body.production_from,
        production_to:req.body.production_to,
        total_mix:parseFloat(req.body.total_mix)
    }
    editEntry(edit_entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router