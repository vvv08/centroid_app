import makeRequest from "../utils/axios"

//To get user list
export const getUsers = async () => {
    try{
        const result = await makeRequest.get('/userList',{
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        return result.data;
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To add user
export const addUser = async (user) => {
    try{
        const result = await makeRequest.post('/userList/addUser',user,{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Added User: ", result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To edit a user
export const editUser = async(user) => {
    try{
        const result = await makeRequest.post('/userList/editUser',user,{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a user
export const deletUser = async (id) => {
    try{
        const result = await makeRequest.post('/userList/deleteUser',{
            id:id
        },
    {
        headers:{
            authorization : "Bearer " + localStorage.getItem("token")
        }
    })
    console.log(result.data)
    return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}