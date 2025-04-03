import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRegUserCircle} from "react-icons/fa"
import Userprofileavataredit from '../components/Userprofileavataredit'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { setUserDetails } from '../store/userslice'
import fetchUserDetails from '../utils/Fetchuserdetails'

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
  const [userdata,setuserdata] = useState({
    name:user.name,
    email:user.email,
    mobile:user.mobile
  }) 
  
  const [loading,setloading] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    setuserdata({
      name:user.name,
      email:user.email,
      mobile:user.mobile
    })
  },[user])

  const handleonchange = (e) => {
    
    const {name,value} = e.target
    setuserdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handlesubmit = async(e) => {
    e.preventDefault()
    try {
      setloading(true)
      const response = await Axios({
        ...summaryapi.updateuser,
        data:userdata
      })
      console.log(response);
      
      const {data:responseData} = response
      if(responseData.success){
        toast.success(responseData.message)

        const userdata = await fetchUserDetails()    
        dispatch(setUserDetails(userdata.data))

      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setloading(false)
    }
  }
  return (
    <div className='p-4'>
      <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img src={user.avatar} alt={user.name} className='w-ful h-full' />
          ):(
            <FaRegUserCircle size={65}/>
          )
        }
      </div>
      <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>

       
       {
        openProfileAvatarEdit && (
          <Userprofileavataredit close={()=>setProfileAvatarEdit(false)}/>
        )
      }
      <form className='mt-4 grid gap-4' onSubmit={handlesubmit}>
        <div className='grid'>
          <label htmlFor='name'>Name:</label>
          <input 
            type="text" 
            id='name'
            placeholder='Enter Your Name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userdata.name}
            name='name'
            onChange={handleonchange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor='emali'>Email:</label>
          <input 
            type="Email" 
            id='email'
            placeholder='Enter Your Email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userdata.email}
            name='email'
            onChange={handleonchange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor='mobile'>Mobile:</label>
          <input 
            type="text" 
            id='mobile'
            placeholder='Enter Your Mobile'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userdata.mobile}
            name='mobile'
            onChange={handleonchange}
            required
          />
        </div>
        <button className='border px-4 py-2 font-semibold rounded hover:bg-primary-200'>
          {
            loading ? "Loading...":"Submit"
          }
          </button>
        
      </form>
    </div>
  )
}

export default Profile