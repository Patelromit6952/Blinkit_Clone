import React, { useEffect, useState } from 'react'
import Uploadsubcategory from '../components/Uploadsubcategorymodels'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import Displaytable from '../components/Displaytable'
import { createColumnHelper } from '@tanstack/react-table'
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import Editsubcategory from '../components/Editsubcategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import Viewimage from '../components/Viewimage'

const Subcategory = ({close}) => {
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
      _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)


  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...summaryapi.getsubcategory
        })
        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
       AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='w-8 h-8 cursor-pointer'
                onClick={()=>{
                  setImageURL(row.original.image)
                }}      
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
       cell : ({row})=>{
        return(
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
       }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              <button onClick={()=>{
                  setOpenEdit(true)
                  setEditData(row.original)
              }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                  <HiPencil size={20}/>
              </button>
              <button onClick={()=>{
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                  <MdDelete  size={20}/>
              </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async()=>{
      try {
          const response = await Axios({
              ...summaryapi.deletesubcategory,
              data : deleteSubCategory
          })

          const { data : responseData } = response

          if(responseData.success){
             toast.success(responseData.message)
             fetchSubCategory()
             setOpenDeleteConfirmBox(false)
             setDeleteSubCategory({_id : ""})
          }
      } catch (error) {
        AxiosToastError(error)
      }
  }
  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add SubCategory</button>
        </div>

        <div className='overflow-auto w-full max-w-[95vw]'>
            <Displaytable
                data={data}
                column={column}
            />
        </div>


        {
          openAddSubCategory && (
            <Uploadsubcategory 
              close={()=>setOpenAddSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          ImageURL &&
          <Viewimage url={ImageURL} close={()=>setImageURL("")}/>
        }

        {
          openEdit && 
          <Editsubcategory 
            data={editData} 
            close={()=>setOpenEdit(false)}
            fetchData={fetchSubCategory}
          />
        }

        {
          openDeleteConfirmBox && (
            <ConfirmBox 
              cancel={()=>setOpenDeleteConfirmBox(false)}
              close={()=>setOpenDeleteConfirmBox(false)}
              confirm={handleDeleteSubCategory}
            />
          )
        }
    </section>
  )
}

export default Subcategory