import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "please provide mongodb uri in .env file"
    )
}

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            maxPoolSize: 50,  
        })
        console.log("connection successful");
        
    } catch (error) {
        console.log("monogo connect error ",error);
        process.exit(1);        
    }
}

export default connectdb