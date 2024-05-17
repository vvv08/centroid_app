import express from 'express';
import { addUser, deleteUser, editUser, getUsers } from '../controllers/users.js';
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

//To add a user
router.post('/addUser',[verifyToken],(req,res) => {
    let user = {
        name : req.body.name,
        password : req.body.password_confirmed,
        type : req.body.type
    }
    addUser(user).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a user
router.post('/editUser',[verifyToken],(req,res) => {
    let user = {
        id : Number(req.body.id),
        type : req.body.type
    }
    editUser(user).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete a user
router.post('/deleteUser',[verifyToken],(req,res) => {
    let user = {
        id:Number(req.body.id)
    }
    deleteUser(user).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router;