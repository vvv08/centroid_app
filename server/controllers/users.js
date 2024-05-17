import { db } from "../config/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//To get user list
export const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [users] = await db.query("select user_id,name,type from users;");
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

//Add a user
export const addUser = ({ name, password, type }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const [result] = await db.query(`insert into users (name,password,type) values ("${name}","${hashedPassword}","${type}");`)
      let addedUser = {
        id : result.insertId,
        name,
        type
      }
      resolve(addedUser)
    } catch (err) {
      reject(err);
    }
  });
};

//To edit user type
export const editUser = ({id,type}) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [[user]] = await db.query(`select name,type from users where user_id = ${id}`);
            const result = await db.query(`update users set type = "${type}" where user_id = ${id}`);
            let editedUser = {
                id,
                name : user.name,
                type
            }
            resolve({
                Before : user,
                After : editedUser
            })
        }catch(err){
            reject(err)
        }
    })
}

//To delete a user
export const deleteUser = ({id}) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [[user]] = await db.query(`select name,type from users where user_id = ${id}`)
            const result = await db.query(`delete from users where user_id = ${id};`)
            resolve({
                Deleted_User : user
            })
        }catch(err){
            reject(err)
        }
    })
}
