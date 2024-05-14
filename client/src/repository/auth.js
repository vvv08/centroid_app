import makeRequest from "../utils/axios"

//Login
export const login = async (user) => {
    try{
        const result = await makeRequest.post('/login', user);
        return result.data
    }catch(err){
        console.log({"Message": err.response.data ,"Error: " : err.message})
        throw err.response.data
    }
}