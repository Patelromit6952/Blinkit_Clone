import Axios from "./Axios"
import summaryapi from "../common/Summaryapi"

const fetchUserDetails = async()=>{
    try {
        const response = await Axios({
            ...summaryapi.userdetails
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails