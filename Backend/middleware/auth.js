import jwt from 'jsonwebtoken'

const auth = async (req,res,next) => {
    try {
       const token  = req.cookies.accesstoken || req?.headers?.authorization?.split(" ")[1]; 

       if(!token){
        return res.status(401).json({
            message:"Provide Token"
        })
    }
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if(!decode){
           return res.status(401).json({
            message:"Unauthorized Access",
            error:true,
            success:false
           })
       }
       
       req.userId = decode._id
       next()

    } catch (error) {
        return res.status(400).json({
            message:"You have not login",
            error:true,
            success:false
        })
    }
}

export default auth;