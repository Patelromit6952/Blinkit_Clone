// import React from 'react'
import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast'
import Axios from "../utils/Axios";
import summaryapi from "../common/Summaryapi";
import AxiosToastError from '../utils/AxiosToastError.js'
import {Link,useNavigate} from 'react-router-dom'

export const Register = () => {
    const [showpassword,setshowpassword] = useState(false)
    const navigate = useNavigate()
    const [data,setdata] = useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const handlechange =  (e) => {
        const {name,value} = e.target
        setdata((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const validatevalue = Object.values(data).every(el=>el)

    const handlesubmit = async (e) => {
        e.preventDefault()

        if(data.password !== data.confirmpassword){
            toast.error(
                "password and confirm-password must be same"
            )
            return
        }
   try {
    const  res = await  Axios({
        ...summaryapi.register,
        data:data
    })
    if(res.data.error){
        toast.error(res.data.message)
    }
    if(res.data.success){
        toast.success(res.data.message)
        setdata({
            name:"",
            email:"",
            password:"",
            confirmpassword:""
        })
        navigate('/login')
    }
   } catch (error) {
    AxiosToastError(error)
   }
    
}
  return (
    <section className=" w-full container px-2 mx-auto )">
        <div className="bg-white my-4 w-full max-w-lg mx-auto  rounded p-6">
            <p className="text-center text-2xl font-semibold">Welcome to Blinkit</p>
            <form action="" className="grid gap-1 mt-6" onSubmit={handlesubmit}>
                <div className="grid gap-1 ">
                    <label htmlFor="name" className="ml-2">Name :</label>
                    <input type="text" name="name" autoFocus className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200" value={data.name}
                    onChange={handlechange}
                    placeholder="Enter Your Name"/>
                </div>
                <div className="grid gap-1">
                    <label htmlFor="email" className="ml-2">Email :</label>
                    <input type="email" name="email"  className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200" value={data.email}
                    onChange={handlechange}
                    placeholder="Enter Your Email"/>
                </div>
                <div className="grid gap-1">
                    <label className="ml-2 mt-2" htmlFor="password" >Password :</label>
                    <div className="bg-blue-50 p-2 border rounded flex items-center outline-none focus-within:border-primary-200">
                        <input type={showpassword ? "text" : "password"} name="password"  className="w-full bg-transparent outline-none" value={data.password}
                        onChange={handlechange}
                        placeholder="Enter Your Password"/>
                        <div onClick={()=>setshowpassword(prev=>!prev)} className="cursor-pointer">
                        {
                            !showpassword ? (
                                <FaRegEyeSlash/>
                            ):(
                                <FaRegEye/>
                            )
                        }
                    </div>
                    </div>
                    
                </div>
                <div className="grid gap-1">
                    <label className="ml-2 mt-2" htmlFor="confirmpassword">Confirm-Password :</label>
                    <input type="text" name="confirmpassword"  className="bg-blue-50 p-2 border rounded" value={data.confirmpassword}
                    onChange={handlechange} 
                    placeholder="Enter Your Confirm-Password"/>
                </div>
                <button disabled={!validatevalue} className={`${validatevalue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Register</button>
            </form>
            <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
        </div>
    </section>

)
}
