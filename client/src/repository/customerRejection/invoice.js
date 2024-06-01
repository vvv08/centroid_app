import makeRequest from "../../utils/axios"

export const getInvoices = async () => {
    try{
        const result = await makeRequest.get('/invoice',{
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

//To get details ro add
export const getDetails = async () => {
    try{
        const result = await makeRequest.get('/invoice/details',{
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

//To add a invoice
export const addInvoice = async (invoice) => {
    console.log(invoice)
    try{
        const result = await makeRequest.post('invoice/add',invoice,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log({Added : result.data})
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get details for invoice edit
export const getInvoiceDetails = async (id) => {
    try{
        const result = await makeRequest.get(`/invoice/editDetails?id=${id}`,{
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

//To edit a invoice
export const editInvoice = async (invoice) => {
    try{
        const result = await makeRequest.post('/invoice/edit',invoice,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}