// import React from 'react'
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Axios from "../utils/Axios";
import summaryapi from "../common/Summaryapi";
import axiostoasterror from '../utils/AxiosToastError.js'
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Resetpassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setdata] = useState({
        email:"",
        newPassword:"",
        confirmPassword:""
    })
    const [showpassword,setshowpassword] = useState(false);
    const [showconfirmpassword,setshowconfirmpassword] = useState(false);

    const validatevalue = Object.values(data).every(el=>el)
    
    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }
        if(location?.state?.email){
            setdata((prev)=>{
                return {
                    ...prev,
                    email:location?.state?.email
                }
            })
        }
    },[])

    const handlechange =  (e) => {
        const {name,value} = e.target
        setdata((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }


  const handlesubmit = async (e) => {
        e.preventDefault()
        if(data.newpassword !== data.confirmpassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
          }
        try {
        const  response = await Axios({
            ...summaryapi.resetpassword,
            data:data
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setdata({
                email:"",
                newpassword:"",
                confirmpassword:""
            })    
        }
        } catch (error) {
            axiostoasterror(error)
        }
        
        
}
  return (
    <section className=" w-full container px-2 mx-auto )">
    <div className="bg-white my-4 w-full max-w-lg mx-auto  rounded p-6">
        <p className="text-center text-2xl font-semibold">Reset Password</p>
        <form action="" className="grid gap-1 mt-6" onSubmit={handlesubmit}>
        <div className="grid gap-1">
                <label htmlFor="email" className="ml-2">Email :</label>
                <input type="text" name="email"  className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200" value={data.email}
                onChange={handlechange}
                placeholder="enter your email"/>
            </div>
            <div className="grid gap-1">
                <label className="ml-2 mt-2" htmlFor="newPassword" >Password :</label>
                <div className="bg-blue-50 p-2 border rounded flex items-center outline-none focus-within:border-primary-200">
                    <input type={showpassword ? "text" : "password"} name="newPassword"  className="w-full bg-transparent outline-none"
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
           
            <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showconfirmpassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none bg-transparent'
                                name='confirmPassword'
                                onChange={handlechange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setshowconfirmpassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showconfirmpassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
             
            <button disabled={!validatevalue} className={`${validatevalue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Reset-Password</button>
        </form>
    </div>
</section>
  )
}

export default Resetpassword