import express from 'express';
import { getGraphData } from '../controllers/graphs.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

//To get data for graphs
router.get('/',[verifyToken],(req,res) => {
    let filters = {
        from:req.query.from,
        to:req.query.to
    }
    getGraphData(filters).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;