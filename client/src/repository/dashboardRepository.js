import makeRequest from "../utils/axios"

//API to get data for dashboard
export const getDashboard = async ({fromDate,toDate}) => {
    try{
        const result = await makeRequest.get(`/?from=${fromDate}&to=${toDate}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
        console.log(result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//API to get input lists
export const getInputData = async () => {
  try{
    const result = await makeRequest.get('/inputLists',{
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
    return result.data
  }catch(err){
    console.log("Error: ", err.response.data.Error)
    throw err
  }
}

//API to add a new entry
export const addEntry = async (inputs) => {
  try{
    const result = await makeRequest.post('/addEntry',inputs,{
      headers : {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    console.log("Inserted entry: ", result.data)
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//API to delete an entry
export const deletedEntry = async (entry_id) => {
  try{
    const result = await makeRequest.post('/deleteEntry',
    {
      Id:entry_id
    }
    ,{
      headers : {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    console.log("Deleted entry: ", result.data.deletedEntry)
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//API to get entry details for edit
export const getEntryForEdit = async (id) => {
  try{
    const result = await makeRequest.get(`/editEntry?id=${id}`,{
      headers : {
        authorization : "Bearer " + localStorage.getItem("token")
      }
    })
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}

//API to edit an entry
export const editEntry = async (inputs) => {
  try{
    const result = await makeRequest.post('/editEntry', inputs, {
      headers : {
        authorization : "Bearer " + localStorage.getItem("token")
      }
    })
    console.log({"Before" : result.data.before, "After" : result.data.edited_entry})
    return result.data
  }catch(err){
    console.log("Error: ", err)
    throw err
  }
}