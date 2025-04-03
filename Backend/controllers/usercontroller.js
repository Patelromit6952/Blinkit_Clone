import sendemail from "../config/sendmail.js";
import UserModel from "../models/usermodel.js";
import bcrypt from 'bcryptjs'
import verificationemailtemplate from "../utils/verifyemailtemplate.js";
import generateaccesstoken from "../utils/generateaccesstoken.js";
import generaterefreshtoken from "../utils/generaterefreshtoken.js";
import uploadimagecloudinary from "../utils/uploadimagecloudinary.js";
import generateotp from '../utils/generateotp.js'
import forgotpasswordtemplate from "../utils/forgotpasswordtemplate.js";
import jwt from 'jsonwebtoken'

export async function registerusercontroller(req,res){
   try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
       return res.status(400 ).json({
        message:"Provide email,name,password",
        error:true,
        success:false
       })
    }

    const user  = await UserModel.findOne({email})
    if(user){
        return res.status(400 ).json({
            message:"Already registered email ",
            error:true,
            success:false
        })
    }

    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    const payload = {
        name,
        email,
        password:hashPassword
    }

    const newuser = new UserModel(payload)
    const save = await newuser.save()

    const verifyemailurl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
    const verifyemail = await sendemail({
        sendto:email,
        subject:"Verify email fron Blinkit",
        html:verificationemailtemplate({
            name,
            url:verifyemailurl
        })
    })
    
    return res.status(200).json({
        message:"user register successfully",
        error:false,
        success:true
        })

   } catch (error) {
    return res.status(500).json({
        message:error.message,
        error:true,
        success:false
    })
   }
}

export async function verifyemailcontroller(req,res){
    try {
        
        const {code} = req.body;
        const user = await UserModel.findOne({_id : code})

        if(user){
            return res.status(400).json({
            message:"invalid code",
            error:true,
            success:false
            })
        }

        const updateuser = await UserModel.updateOne({_id:code},{
            verify_email:true
        })

        return res.status(400).json({
        message:"Email verified successfully ",
        error:false,
        success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
}

export async function loginusercontroller(req,res){
    try {
        const {email,password} = req.body;
        const userId = req.userid;
        
        if(!password || !email){
            return res.status(400).json({
                message:"Please Enter Email and Password",
                error:true,
                success:false
            })
        }

        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(500).json({
                message:"User Not Registered !",
                error:true,
                success:false
            })
        }
        
        if(user.status !== "Active"){
            return res.status(400).json({
                message:error.message,
                error:true,
                success:false
            })
        }

        const checkpassword = await bcrypt.compare(password,user.password)

        if(!checkpassword){
            return res.status(400).json({
            message:"Check Your Password",
            error:true,
            success:false
            })
        }

        const accesstoken = await generateaccesstoken(user.id)
        const refreshtoken = await generaterefreshtoken(user.id)

        const updateuser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })
        const cookieoption = {
            httpOnly : true,
            secure : true,
            sameSite:"none"
        }
        res.cookie('accesstoken',accesstoken,cookieoption);
        res.cookie('refreshtoken',refreshtoken,cookieoption);

        const removerefreshtoken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token:""
        })

        return res.status(200).json({
        message:"login successfully",
        error:false,
        success:true,
        data:{
            accesstoken,
            refreshtoken
        }
        
        })

    } catch (error) {
        return res.status(500).json({
                message:error.message,
                error:true,
                success:false
            })
    }
}

export async function logoutcontroller (req,res) {
    try {
        const cookieoption = {
            httpOnly : true,
            secure : true,
            sameSite:"none"
        }

        res.clearCookie("accesstoken",cookieoption)
        res.clearCookie("refreshtoken",cookieoption)

        return res.status(200).json({
            message:"Logout Successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export async function uploaduseravatar(req,res){
    try {
        const image = req.file
        const userid = req.userId
        const upload = await uploadimagecloudinary(image)
        console.log(upload+"hi romit");
        
        
        const updateuser = await UserModel.findByIdAndUpdate(userid,{
            avatar:upload.url
        })
        
        return res.status(200).json({
        message:"image uploade successfully",
        error:false,
        success:true,
        data:{
            _id:userid,
            avatar:upload.url
        }
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export async function updateuserdetails(req,res){
    try {
        const userid =  req.userId;
        // console.log(userid);
        
        const {name,email,mobile,password} = req.body;
        let hashpassword =  ""
        if(password){
            const salt = await bcrypt.genSalt(10)
            hashpassword=await bcrypt.hash(password,salt)
        }
        const updateuser = await UserModel.findByIdAndUpdate(userid,{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashpassword}),
        })

        return res.status(200).json({
            message:"Updated successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export async function forgotpasswordcontroller(req,res) {
    try {
        const { email } = req.body 
        if(!email){
            return res.status(500).json({
            message:"please provide email",
            error:true,
            success:false
            })
        }
        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generateotp()
        const expireTime =  new Date(Date.now() + 30 * 10 * 1000) // 5 min
        
        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendemail({
            sendto : email,
            subject : "Forgot password from Binkeyit",
            html : forgotpasswordtemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "check your email",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyforgotpasswordotp(req,res){
    try {
        const { email , otp }  = req.body

        if(!email || !otp){
            return res.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toISOString()

        if(user.forgot_password_expiry < currentTime  ){
            return res.status(400).json({
                message : "Otp is expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })
        
        return res.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function resetpassword(request,response){
    try {
        const { email , newPassword, confirmPassword } = request.body 

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "provide required fields email, newPassword, confirmPassword"
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "newPassword and confirmPassword must be same.",
                error : true,
                success : false,
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return response.json({
            message : "Password updated successfully.",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function refreshtoken(request,response){
    try {
        const refreshtoken = request.cookies.refreshtoken || request?.headers?.authorization?.split(" ")[1] 
        if(!refreshtoken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifytoken = await jwt.verify(refreshtoken,process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifytoken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifytoken?._id

        const newAccessToken = await generateaccesstoken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accesstoken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function userdetails(request,response){
    try {
        const userid  = request.userId
        const user = await UserModel.findById(userid).select('-password -refresh_token')
        // console.log(user);
        
        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something is wrong",
            error : true,
            success : false
        })
    }
    
}