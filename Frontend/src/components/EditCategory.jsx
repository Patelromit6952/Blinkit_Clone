import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadimage from '../utils/uploadimage';
import Axios from '../utils/Axios';
import summaryapi from '../common/Summaryapi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const EditCategory = ({close, fetchdata , data : CategoryData}) => {
    const [loading,setloding] = useState(false)
    const [data,setdata] = useState({
      _id:CategoryData._id,
      name:CategoryData.name,
      image:CategoryData.image  
    })

    
    const onhandlechange =(e) => {
        const {name,value} = e.target
        setdata((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const handlesubmit =async (e) => {
        e.preventDefault()
        try {
           setloding(true)
            const response = await Axios({
                ...summaryapi.updatecategory,
                data : data
            })

            const {data:responsedata} = response

            if(responsedata.success){
                toast.success(responsedata.message)
                close()
                fetchdata()
            }
        } catch (error) {
            AxiosToastError(error)          
        }finally{ 
            setloding(false)
        }
    }
    const handleuploadcategoryimage = async(e) => {
        const file = e.target.files[0]
        
        if(!file) return
        const response = await uploadimage(file)         
        setdata((prev)=>{
            return {
                ...prev,
                image : response.data.data.url
            }
        })           
    } 
  return (
     <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
                <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Category</h1>
                <button onClick={close} className='w-fit block ml-auto '>
                    <IoClose size={25}/>
                 </button>
                </div>
                <form className='my-3 grd gap-2' onSubmit={handlesubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name:</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="categoryname" 
                        placeholder='Enter category name'
                        value={data.name}
                        onChange={onhandlechange}
                        className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200
                        outline-none rounded'
                        />
                    </div>
                    <div>
                        <p>Image</p>
                       <div className='flex gap-4 flex-col lg:flex-row items-center '>
                             <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                           {
                            data.image ? (
                            <img alt='category' src={data.image} className='w-full h-full object-scale-down'/>
                            ):(
                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                           }
                        </div>
                        <label htmlFor="uploadcategoryimage">
                        <div className={`
                            ${!data.name ? "bg-gray-300" : "border-primary-200  hover:bg-primary-200 "}
                            px-4 py-2 rounded cursor-pointer border font-medium
                            `}>{
                                loading ? "Loding..." : "Upload image"
                            }
                            </div>
                            <input disabled={!data.name} onChange={handleuploadcategoryimage} type="file"  name="uploadcategoryimage" id="uploadcategoryimage"  className='hidden'/>
                        </label>
                       </div>
                    </div>
                        <button className={`
                        w-full
                            ${data.name && data.image ? "bg-primary-200 ": "bg-gray-300"}
                            py-2 mt-2 rounded font-semibold
                                `}>
                            Update Category
                        </button>
                </form>
                </div>
    
            </section> 
  )
}

export default EditCategory