import Axios from '../utils/Axios.js'
import summaryapi from '../common/Summaryapi.jsx'


const uploadimage =async (image) => {
    try {
        const formData = new FormData()
        formData.append('image',image)
        const response = await Axios({
            ...summaryapi.uploadiamge,
            data:formData
        })
        return response
    } catch (error) {
        
    }
}

export default uploadimage