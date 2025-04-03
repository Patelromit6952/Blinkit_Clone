import uploadimageclodinary from "../utils/uploadimagecloudinary.js"

const uploadimage = async(req,res) => {
    try {
        const file = req.file
        
        const uploadimage = await  uploadimageclodinary(file)
        console.log(uploadimage);
        
        return res.status(200).json({
            message:"upload done",
            data:uploadimage,
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error ,
            error:true,
            success:false
        })
    }
}

export default uploadimage