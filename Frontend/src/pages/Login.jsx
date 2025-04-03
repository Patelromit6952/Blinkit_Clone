/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Axios from "../utils/Axios";
import summaryapi from "../common/Summaryapi";
import axiostoasterror from '../utils/AxiosToastError.js'
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/Fetchuserdetails.js";
import {useDispatch} from 'react-redux'
import { setUserDetails } from "../store/userslice.js";

const Login = () => {
    const [data,setdata] = useState({
        email:"",
        password:"",
    })

  const [showpassword,setshowpassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

 try {
  const  response = await  Axios({
      ...summaryapi.login,
       data : data
  })
  if(response.data.error){
    toast.error(response.data.message)
  }
  if(response.data.success){
    
    toast.success(response.data.message)
        // console.log(response.data.data);
        
    localStorage.setItem('accesstoken',response.data.data.accesstoken)
    localStorage.setItem('refreshtoken',response.data.data.refreshtoken)
    
    const userdetails = await fetchUserDetails()
    dispatch(setUserDetails(userdetails.data))

    setdata({
        email:"",
        password:""
       })
       navigate("/")
    }
 } catch (error) {
    axiostoasterror(error)
 }
 
 
}
return (
  <section className=" w-full container px-2 mx-auto )">
      <div className="bg-white my-4 w-full max-w-lg mx-auto  rounded p-6">
          <p className="text-center text-2xl font-semibold">Login to Blinkit</p>
          <form action="" className="grid gap-1 mt-6" onSubmit={handlesubmit}>
              
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
                  <Link to={"/forgotpassword"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
              </div>
              
              <button disabled={!validatevalue} className={`${validatevalue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Login</button>
          </form>
          <p>
            Don't have account?
             <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
          </p>
      </div>
  </section>

)
}

export default Login