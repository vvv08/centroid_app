import express from 'express';
import { getReports } from '../controllers/reports.js';
import { verifyToken } from '../config/verify.js'

const router = express.Router();

//To fetch all reports
router.get('/',[verifyToken],(req,res) => {
    let filterDate = {
        from:req.query.from,
        to:req.query.to
    }
    getReports(filterDate).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;