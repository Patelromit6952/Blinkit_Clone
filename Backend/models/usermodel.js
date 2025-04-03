import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide name"]
    },
    email:{
        type:String,
        required:[true,"provide email"]
    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type:String,
        default:""
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    shopping_cart:[{
        type:mongoose.Schema.ObjectId,
        ref:"cartproduct"
    }],
    orderhistory:{
        type:mongoose.Schema.ObjectId,
        ref:"order"
    },
    forgot_password_otp:{
        type:String,
        default:""
    },
    forgot_password_expiry:{
        type:String,
        default:""
    },
    role:{
        type:["ADMIN","USER"],
        default:"USER"
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("USer",userSchema)

export default UserModel;