import React, { useEffect, useState } from 'react'
import Uploadcategorymodels from '../components/Uploadcategorymodels'
import Loading from '../components/Loading'
import Nodata from '../components/Nodata'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { all } from 'axios'

const Category = () => {
  const [openuploadcategory,setopenuploadcategory] = useState(false)
  const [loading,setloding] = useState(false)
  const [data,setdata] = useState([])
  const [openedit,setopenedit] = useState(false)
  const [confirmbox,setconfirmbox] = useState(false)
  const [editdata,seteditdata] = useState({
    name:"",
    image:""
  })
  const [deleteCategory,setdeleteCategory] = useState({
    _id : ""
})

  const allcategory = useSelector(state=>state.product.allCategory)

  const fetchcategory = async()=>{
    try {
      setloding(true)
        const response = await Axios({
            ...summaryapi.getcategory
        })
        const { data : responseData } = response

        if(responseData.success){
            setCategoryData(responseData.data)
        }
    } catch (error) {
        
    }finally{
      setloding(false)
    }
}


  useEffect(()=>{
    setdata(allcategory)
  },[allcategory])

  const handleDeleteCategory = async()=>{
    try {
        const response = await Axios({
          ...summaryapi.deletecategory,
          data:deleteCategory
        })

        const { data : responseData } = response

        if(responseData.success){
            toast.success(responseData.message)
            fetchcategory()
            setconfirmbox(false)
        }
    } catch (error) {
        AxiosToastError(error)
    }
}

  return (
    <section>
        <div className='p-2 font-semibold bg-white shadow-md  flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=> setopenuploadcategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded '>Add Category</button>
        </div>
        {
          !data[0] && !loading && (
           <Nodata/>
          )
        }
       <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 '>
      { data.map((category,index)=>{
            return(
              <div className='w-36 h-57 rounded shadow-md' key={category._id}>
                <img src={category.image} alt={category.name} className='w-full h-57 object-scale-down'/>
                <div className='items-center  h-9 gap-2 flex'>
                  <button onClick={()=>{
                    setopenedit(true)
                    seteditdata(category)
                  }} className='flex-1 bg-green-100 hover:bg-green-100 text-green-600 font-medium py-1 reounded'>Edit</button>
                  <button onClick={()=>{
                     setconfirmbox(true)                    
                     setdeleteCategory(category)
                  }} className='flex-1 bg-red-100 hover:bg-red-100 text-red-600 font-medium py-1 reounded'>Delete</button>
                </div>
              </div>
            )
          })
        }
       </div>
        {
            loading && (
              <Loading/>
            ) 
        }
        {
          openuploadcategory && (
            <Uploadcategorymodels fetchdata={fetchcategory} close={()=>setopenuploadcategory(false)}/>
          )
        }
        {
          openedit && (
            <EditCategory data={editdata} close={()=>setopenedit(false) } fetchdata={fetchcategory}/>
          )
        }
        {
          confirmbox  && (
            <ConfirmBox  close={()=>setconfirmbox(false)} cancel={()=>setconfirmbox(false)} confirm={handleDeleteCategory}/>
          )
        }
       
    </section>
  )
}

export default Category