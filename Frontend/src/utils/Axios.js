import axios from 'axios';
import summaryapi, { baseURL } from '../common/Summaryapi';

const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true
}) 

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accesstoken') 
               
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originrequest = error.config

        if(error.response.status === 401 && !originrequest.retry){
            originrequest.retry = true

            const refreshtoken = localStorage.getItem("refreshtoken")            
            if(refreshtoken){
                const newaccesstoken = await refreshaccesstoken(refreshtoken)
                if(newaccesstoken){
                    originrequest.headers.Authorization = `Bearer ${newaccesstoken}`
                    return Axios(originrequest)
                }
            }
        }
        return Promise.reject(error)
    }
)

const refreshaccesstoken = async (refreshtoken) =>{
    try {
        const response = await Axios({
            ...summaryapi.refreshtoken,
            headers:{
                Authorization:`Bearer ${refreshtoken}`
            }
    })
    const accesstoken = response.data.data.accesstoken
    localStorage.setItem('accesstoken',accesstoken)
    return accesstoken
    } catch (error) {
        console.log(error);
        
    }
}

export default Axios
