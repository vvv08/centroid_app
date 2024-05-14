import express from 'express';
import { getUsers } from '../controllers/users.js';
import { verifyToken } from '../config/verify.js'

const router = express.Router();

//To get user list
router.get('/',[verifyToken],(req,res) => {
    getUsers().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;