import makeRequest from '../utils/axios';

export const getGraphData = async ({fromDate,toDate}) => {
    try{
        const result = await makeRequest.get(`/graphData?from=${fromDate}&to=${toDate}`,{
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