import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../config/connection.js'
import 'dotenv/config';

//login
export const login = (user) => {
    return new Promise(async (resolve,reject) => {
        try{
            const [result] = await db.query(`SELECT * FROM users WHERE name = "${user.username}";`)
            if(result ===  null || result.length === 0 ) reject("User not found");
            let hpass = result[0].password
            let isPasswordCorrect = await bcrypt.compare(user.password,hpass)
            if(!isPasswordCorrect) reject("Incorrect Password")
            let token = jwt.sign({Id:result[0].user_id, user: user.username, type: result[0].type},process.env.SECRETE_KEY,{expiresIn:'12h'})
            resolve(token)
        }catch(err){
            reject(err)
        }
    })
}