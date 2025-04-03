import Router from 'express'
import { forgotpasswordcontroller, loginusercontroller, logoutcontroller, refreshtoken, registerusercontroller, resetpassword, updateuserdetails, uploaduseravatar, userdetails, verifyemailcontroller, verifyforgotpasswordotp} from '../controllers/usercontroller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js'

const userrouter = Router()

userrouter.post('/register',registerusercontroller);
userrouter.post('/verifyemail',verifyemailcontroller);
userrouter.post('/login',loginusercontroller);
userrouter.get('/logout',auth,logoutcontroller);
userrouter.put('/upload-avatar',auth,upload.single('avatar'),uploaduseravatar);
userrouter.put('/update-user',auth,updateuserdetails)
userrouter.put('/forgot-password',forgotpasswordcontroller)
userrouter.put('/verify-forgot-password-otp',verifyforgotpasswordotp)
userrouter.put('/reset-password', resetpassword)
userrouter.post('/refresh-token',refreshtoken)
userrouter.get('/getuserdetails',auth,userdetails)
export default userrouter;