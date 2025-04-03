import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import {logout} from '../store/userslice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/IsAdmin'

const Usermenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    
    const handlelogout = async () =>{
        try {
            const response = await Axios({
                ...summaryapi.logout
            })
            
            if(response.data.success){
                if(close){
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleclose = () =>{
        if(close)
            close()
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>

        <div className='text-sm flex items-center gap-2'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='font-medium text-red-500'>{user.role == "ADMIN" ? "(Admin)" : ""}</span></span> 
            <Link onClick={handleclose} to={"/dashboard/profile"}  className='hover:text-primary-200'><HiOutlineExternalLink size={15}/></Link></div>
        <Divider/> 
        <div className='text-sm grid gap-2'>
        {
            isAdmin(user.role) && (
                <>
                <Link onClick={handleclose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Category</Link>
                <Link onClick={handleclose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>SubCategory</Link>
                <Link onClick={handleclose} to={"/dashboard/uploadproducts"} className='px-2 hover:bg-orange-200 py-1'>Upload Product</Link>
                <Link onClick={handleclose} to={"/dashboard/products"} className='px-2 hover:bg-orange-200 py-1'>Products</Link>
                </>
            )
        }
        
        <Link onClick={handleclose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>My Address</Link>
        <Link onClick={handleclose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1 '>My Order</Link>
        <button onClick={handlelogout} className='text-left px-2 hover:bg-orange-200 py-1'>Log Out</button>
        </div>
    </div>
  )
}

export default Usermenu