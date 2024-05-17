import express from 'express';
import { addDowntime, deleteDowntime, editDowntimeEntry, getDowntimeData, getDowntimeEntry } from '../controllers/downtime.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

//To fetch downtime data
router.get('/',[verifyToken],(req,res) => {
    let filterDates = {
        to : req.query.to,
        from : req.query.from
    }
    getDowntimeData(filterDates).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete a downtime entry
router.post('/delete',[verifyToken],(req,res) => {
    let downtime = {
        id:Number(req.body.id)
    }
    deleteDowntime(downtime).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a downtime entry
router.post('/add',[verifyToken],(req,res) => {
    let entry = {
        entry_date:req.body.entry_date,
        machine:Number(req.body.machine),
        machine_loss:Number(req.body.machine_loss),
        idle_from:req.body.idle_time_from,
        idle_to:req.body.idle_time_to,
        remarks:req.body.remarks,
        inspector:Number(req.body.inspector)
    }
    addDowntime(entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get entry for downtime edit
router.get('/edit',[verifyToken],(req,res) => {
    console.log(req.query)
    let entry = {
        id:Number(req.query.id)
    }
    getDowntimeEntry(entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit downtime
router.post('/edit',[verifyToken],(req,res) => {
    let entry = {
        id : Number(req.body.id),
        entry_date : req.body.entry_date,
        idle_from : req.body.idle_time_from,
        idle_to : req.body.idle_time_to,
        remarks : req.body.remarks,
        inspector : req.body.inspector,
        machine : req.body.machine,
        machine_loss : req.body.machine_loss
    }
    editDowntimeEntry(entry).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;