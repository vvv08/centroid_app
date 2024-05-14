import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        try{
            console.log(jwt.verify(token,process.env.SECRETE_KEY))
            next();
        }catch(err){
            res.status(401).json({status: "authenticationError", message : "Authentication failed"})
        }
    }else{
        res.status(401).json({status: "authenticationError", message : "Authentication failed"})
    }
}