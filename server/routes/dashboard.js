import express from 'express';
import { addEntry, deleteEntry, editEntry, getDashboard, getEntryForEdit, getInputData } from '../controllers/dashboard.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

//fetch data for dashboard
router.get('/', [verifyToken] ,(req,res) => {
    let filterDates = {
        from : req.query.from,
        to:req.query.to
    }
    getDashboard(filterDates).then((result) => {
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
        inspector:Number(req.body.inspector),
        work_order:Number(req.body.work_order),
        production_qty:parseFloat(req.body.production_qty),
        remarks:req.body.remarks,
        production_from:req.body.production_from,
        production_to:req.body.production_to
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
        inspector: Number(req.body.inspector),
        work_order: Number(req.body.work_order),
        production_qty: parseFloat(req.body.production_qty),
        remarks:req.body.remarks,
        production_from:req.body.production_from,
        production_to:req.body.production_to,
    }
    editEntry(edit_entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router