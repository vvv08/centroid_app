import { db } from '../config/connection.js';

//To get user list
export const getUsers = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const [users] = await db.query("select user_id,name,type,status from users;");
            resolve(users)
        }catch(err){
            reject(err)
        }
    })
}