import makeRequest from '../../utils/axios';

//To get CAPA details
export const getCAPADetails = async (id) => {
    try{
        const result = await makeRequest.get(`/capa?id=${id}`,{
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

//To get invoice details
export const getInvoicesCAPA = async () => {
    try{
        const result = await makeRequest.get('/capa/invoices',{
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

//To get active UOM
export const getUOMs = async () => {
    try{
        const result = await makeRequest.get('/capa/ActiveUOM',{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}
//To add a issue
export const addIssue = async (issue) => {
    try{
        const result = await makeRequest.post('/capa/issue/add',issue,{
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

//To get issue details for edit
export const getIssueDetails = async (id) => {
    try{
        const result = await makeRequest.get(`/capa/issueDetails?cust_rej_id=${id}`,{
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

//To edit a issue
export const editIssue = async (issue) => {
    try{
        const result = await makeRequest.post('/capa/editIssue',issue,{
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

//To get issues per Invoice
export const getIssuesByInvoice = async (invoice_id) => {
    try{
        const result = await makeRequest.get(`/capa/invoiceIssue?invoice_id=${invoice_id}`,{
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

//To add a containment
export const addContainment = async (containment) => {
    try{
        const result = await makeRequest.post('/capa/addContainment',containment,{
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

//To get containment details for edit
export const getContainmentDetails = async (containment_id) => {
    try{
        const result = await makeRequest.get(`/capa/containmentDetails?containment_id=${containment_id}`,{
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

//To edit a containment
export const editContainment = async (containment) => {
    try{
        const result = await makeRequest.post('/capa/editContainment',containment,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a containment
export const deleteContainment = async (containment_id) => {
    try{
        const result = await makeRequest.post('/capa/deleteContainment',{
            containment_id:containment_id
        },{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Delete: ", result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get inspectors
export const getInspectorsCAPA = async () => {
    try{
        const result = await makeRequest.get('/capa/inspectors',{
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

//To add a corrective action
export const addCorrective = async (corrective) => {
    try{
        const result = await makeRequest.post('/capa/addCorrective',corrective,{
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

//To get corrective detail for edit
export const getCorrectiveDetail = async (corrective_id) => {
    try{
        const result = await makeRequest.get(`/capa/correctiveDetail?corrective_id=${corrective_id}`,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To edit corrective
export const editCorrective = async (corrective) => {
    try{
        const result = await makeRequest.post('/capa/editCorrective',corrective,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a corractive action
export const deleteCorrective = async (corrective_id) => {
    try{
        const result = await makeRequest.post('/capa/deleteCorrective',{
            corrective_id:corrective_id
        },{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Delete: ", result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
} 

//To add a root cause
export const addRootCause = async (root_cause) => {
    try{
        const result = await makeRequest.post('/capa/addRootCause',root_cause,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log(result.data)
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get root cause details for edit
export const getRootCause = async (root_id) => {
    try{
        const result = await makeRequest.get(`/capa/rootCauseDetails?root_id=${root_id}`,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To edit root cause
export const editRootCause = async (root_cause) => {
    try{
        const result = await makeRequest.post('/capa/editRootCause',root_cause,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a root cause
export const deleteRootCause = async (root_id) => {
    try{
        const result = await makeRequest.post('/capa/deleteRootCause',{
            root_id:root_id
        },{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Deleted: ", result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To add preventive action
export const addPreventiveAction = async (preventive_action) => {
    try{
        const result = await makeRequest.post('/capa/addPreventiveAction',preventive_action,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To get preventive action for edit
export const getpreventiveActionDetail = async (preventive_id) => {
    try{
        const result = await makeRequest.get(`/capa/getPreventiveAction?preventive_id=${preventive_id}`,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To edit a preventive action
export const editPreventiveAction = async (preventive_action) => {
    try{
        const result = await makeRequest.post('/capa/editPreventiveAction',preventive_action,{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}

//To delete a preventive action
export const deletePreventiveAction = async (preventive_id) => {
    try{
        const result =await makeRequest.post('/capa/deletePreventiveAction',{
            preventive_id:preventive_id
        },{
            headers:{
                authorization:"Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Deleted: ", result.data)
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}
