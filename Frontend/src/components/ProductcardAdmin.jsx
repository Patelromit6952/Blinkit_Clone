import React, { useState } from 'react'
import Editproductdmin from './Editproductdmin'
import Deleteproductadmin from './Deleteproductadmin'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import toast from 'react-hot-toast'

const ProductcardAdmin = ({data,fetchProductData}) => {
  const [editopen,seteditopen] = useState(false)
  const [deleteopen,setdeleteopen] = useState(false)
  const handleproductedit = async ()=>{
      seteditopen(true)
    }
    const handledeleteproduct = async () =>{
      setdeleteopen(true)
    }
    const handledelete = async () => {
      try {
        const res = Axios({
          ...summaryapi.deleteProduct,
          data:{
            _id : data._id
          }
        })
        const {data : responseData} = res 
         if(responseData.success){
          toast.success(responseData.message)
            if(fetchProductData){
              fetchProductData()
              setdeleteopen(false)
            }
         }

      } catch (error) {
        AxiosToastError(error)
      }
    }
  return (
    <div className='w-full p-3 bg-white rounded'>
        <div>
            <img src={data?.image[0]} alt={data?.name}  className='w-full h-full object-scale-down'/>
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-2'>
          <button onClick={handleproductedit} className='border px-1 py-2 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200'>Edit</button>
          <button onClick={handledeleteproduct} className='border px-1 py-2 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200'>Delete</button>
        </div>
        {
          editopen && (<Editproductdmin fetchProductData={fetchProductData} data={data} close={()=>seteditopen(false)}/>)
        }
        { 
            deleteopen && (<Deleteproductadmin data={data}   Delete={handledelete} close={()=>setdeleteopen(false)} cancel={()=>setdeleteopen(false)}/>)
        }
    </div>
  )
}

export default ProductcardAdmin