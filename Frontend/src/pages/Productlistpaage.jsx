import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios.js'
import summaryapi from '../common/Summaryapi.jsx'
import { Link, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError.js'
import Loading from '../components/Loading.jsx'
import Cartproduct from '../components/Cartproduct.jsx'
import validurlconvert from '../utils/ValidUrlconvert.js'

const Productlistpaage = () => {

  const [data,setdata] = useState([])
  const [page,setpage]  = useState(1)
  const [loading,setloading] = useState(false)
  const [totalpagecount,settotalpagecount] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCategory, setDisplaySubCategory] = useState([])
  
  const subcategory = params?.subcategory?.split("-")
  const subcategoryname = subcategory?.slice(0, subcategory?.length - 1)?.join(" ")

  const categoryId = params.category?.split("-").slice(-1)[0]
  const subCategoryId = params.subcategory?.split("-").slice(-1)[0]
    
  const fetchproductdata = async() =>{
  
    try {
      setloading(true)    
      
      const res = await Axios({
        ...summaryapi.getproductbycategoryandsubcategory,
        data: {
          categoryId : categoryId,
          subCategoryId : subCategoryId,
          page: page,
          limit: 8,
        }
      })      
      const {data : responseData} = res

      if(responseData.success){
        if(responseData.page == 1){
          setdata(responseData.data)
        }else{
          setdata([...data, ...responseData.data])
        }
        settotalpagecount(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setloading(false)
    }
  }

  useEffect(()=>{
    fetchproductdata()
  },[params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
    <div className='container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
      {/**sub category **/}
      <div className=' min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
        {
          DisplaySubCategory.map((s, index) => {
             const link = `/${validurlconvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validurlconvert(s.name)}-${s._id}`
            return (              
              <Link to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                hover:bg-green-100 cursor-pointer
                ${subCategoryId === s._id ? "bg-green-100" : ""}
              `}
              >
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                  <img
                    src={s.image}
                    alt='subCategory'
                    className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                  />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            )
          })
        }
      </div>


      {/**Product **/}
      <div className='sticky top-20'>
        <div className='bg-white shadow-md p-4 z-10'>
          <h3 className='font-semibold'>{subcategoryname}</h3>
        </div>
        <div>

         <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
          <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
              {
                data.map((p, index) => {
                  return (
                    <Cartproduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  )
                })
              }
            </div>
            {
            loading && (
              <Loading />
            )
          }
         </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Productlistpaage