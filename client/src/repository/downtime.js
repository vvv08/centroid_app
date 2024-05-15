import makeRequest from "../utils/axios"

//To fetch downtime data
export const getDowntimeData = async () => {
    try{
        const result = await makeRequest.get('/downtime',{
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

//To delete a downtime
export const deleteDowntime = async (id) => {
    try{
        const result = await makeRequest.post('/downtime/delete',{
            id:id
        },{
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

//To add a downtime
export const addDowntime = async (entry) => {
    try{
        const result = await makeRequest.post('/downtime/add',entry,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Added Entry: ", result.data)
    }catch(err){
        console.log("Error:",err)
        throw err
    }
}

//To get downtime entry for edit
export const getDowntimeEntry = async (id) => {
    try{
        const result = await makeRequest.get(`/downtime/edit?id=${id}`,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error:",err)
        throw err
    }
}

//To edit downtime
export const editDowntime = async (entry) => {
    try{
        const result = await makeRequest.post(`/downtime/edit`,entry,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error:",err)
        throw err
    }
}