import makeRequest from '../utils/axios';

export const getReports = async ({fromDate,toDate}) => {
    try{
        const result = await makeRequest.get(`/reports?from=${fromDate}&to=${toDate}`,{
            headers: {
                authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        return result.data
    }catch(err){
        console.log("Error: ", err)
        throw err
    }
}