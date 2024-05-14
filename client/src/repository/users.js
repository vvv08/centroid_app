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