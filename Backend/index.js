import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectdb from './config/connectDB.js'
import userrouter from './routes/userroute.js'
import categoryrouter from './routes/categoryroute.js'
import uploadrouter from './routes/upload.js'
import subcategoryRouter from './routes/subcategoryroute.js'
import productRouter from './routes/Productroute.js'
import cartRouter from './routes/cartroute.js'
import addressRouter from './routes/addressroute.js'
import orderRouter from './routes/orderroute.js'

const app = express()
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
// app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = 8000 || process.env.PORT;
app.get("/",(req,res)=>{
    res.json({
        message:"server is running "
    })
})

app.use('/api/user',userrouter);
app.use('/api/category',categoryrouter)
app.use('/api/file',uploadrouter)
app.use('/api/subcategory',subcategoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running")
        connectdb();
    }) 
})
