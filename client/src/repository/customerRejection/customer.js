import makeRequest from "../../utils/axios"

//To get customers
export const getCustomers = async () => {
    try{
        const result = await makeRequest.get('/customer',{
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

//To add a customer
export const addCustomer = async (customer) => {
    try{
        const result = await makeRequest.post('customer/add',customer,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log({"Added Customer" : result.data})
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get customer details
export const getCustomerDetail = async (id) => {
    try{
        const result = await makeRequest.get(`customer/customerDetail?id=${id}`,{
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

//To edit a customer
export const editCustomer = async (customer) => {
    try{
        const result = await makeRequest.post('/customer/edit', customer , {
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