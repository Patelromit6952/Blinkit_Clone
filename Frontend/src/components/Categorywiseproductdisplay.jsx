import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import summaryapi from '../common/Summaryapi.jsx'
import Cartloading from './Cartloading.jsx'
import Cartproduct from './Cartproduct.jsx'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import validurlconvert from '../utils/ValidUrlconvert.js'
import { useRef } from 'react'

const Categorywiseproductdisplay = ({id,name}) => {

  const [data,setdata] = useState([])
  const [loading,setloading] = useState(false)
  const containerRef = useRef()
  const subcategorydata = useSelector(state => state.product.allSubCategory)
  const loadingcardnumber = new Array(6).fill(null)

  const fetchcategorywisedata = async()=>{
    try {
      setloading(true)
      const res = await Axios({
        ...summaryapi.getProductByCategory,
        data : {
          id : id
        }
      })
      const {data : responseData} = res
      if(responseData.success){
        setdata(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    fetchcategorywisedata()
  },[])

  const handlescrollright = () => {
    containerRef.current.scrollLeft += 200
  }
  const handlescrollleft = () => {
    containerRef.current.scrollLeft -= 200
  }

  const handleredirectproductlistpage =() =>{
    const subcategory = subcategorydata.find(sub =>{
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${validurlconvert(name)}-${id}/${validurlconvert(subcategory?.name)}-${subcategory?._id}`
    return url
  }
const redirecturl = handleredirectproductlistpage()
  return (
    <div>
        <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
            <Link to={redirecturl} className='text-green-600 hover:text-green-400'>See All</Link>
       </div>
       <div className='relative flex items-center'>
       <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}> 
        {
          loading &&
          loadingcardnumber.map((_,index)=>{
            return (
              <Cartloading key={"categorywiseproductdisplay"+index}/>
            )
          })
        }
        {
          data.map((p,index)=>{            
            return (
              <Cartproduct data={p} key={p._id+"categorywiseproductdisplay"+index} />
            )
          })
        }
      </div>
          <div className='w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between'>
                    <button onClick={handlescrollleft}  className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handlescrollright} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
       </div>
    </div>
  )
}

export default Categorywiseproductdisplay