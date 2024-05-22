import makeRequest from "../utils/axios";

//To get work orders
export const getWorkOrders = async () => {
    try{
        const result = await makeRequest.get('/rejectionEntry',{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get rejection entries for a work order
export const getRejectionEntry = async ({work_order}) => {
    try{
        const result = await makeRequest.get(`/rejectionEntry/entries?id=${work_order}`,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get all master data
export const getMasterData = async (id) => {
    try{
        const result = await makeRequest.get(`/rejectionEntry/master?work_order=${id}`,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To add a rejection entry
export const addRejectionEntry = async (entry) => {
    try{
        const result = await makeRequest.post('/rejectionEntry/add',entry,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get data for edit
export const getRejectionEntryEdit = async (id) => {
    try{
        const result = await makeRequest.get(`/rejectionEntry/editData?id=${id}`,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To edit a rejection entry
export const editRejectionEntry = async (rejection) => {
    try{
        const result = await makeRequest.post('/rejectionEntry/edit',rejection,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a rejection entry
export const deleteRejectionEntry = async (id) => {
    try{
        const result = await makeRequest.post('/rejectionEntry/delete',{
            id:id
        },{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}