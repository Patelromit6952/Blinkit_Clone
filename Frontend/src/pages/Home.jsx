import React from 'react'
import bannner from '../assets/banner.jpg'
import mobibanner from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import validurlconvert from '../utils/ValidUrlconvert'
import {Link, useNavigate} from 'react-router-dom'
import Categorywiseproductdisplay from '../components/Categorywiseproductdisplay'

export const Home = () => {
  const loadingCategory =  useSelector(state => state.product.lodingCategory)
  const categorydata = useSelector(state => state.product.allCategory)
  const subcategorydata = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()
  
  const handleRedirectProductListpage = (id,cat)=>{
    const subcategory = subcategorydata.find(sub =>{
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${validurlconvert(cat)}-${id}/${validurlconvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
}

  return (
   <section className='bg-white'>
    <div className='container mx-auto'>
      <div className={`w-full min-h-48 bg-blue-100 rounded ${!bannner && `animate-pulse my-2 `}`}>
          <img src={bannner} alt="banner" className='w-full h-full hidden lg:block' />
          <img src={mobibanner} alt="banner" className='w-full h-full  lg:hidden' />
      </div>
    </div>

    <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
      {
        loadingCategory ? (
          new Array(10).fill(null).map((c,index)=>{
            return (
              <div key ={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow  animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            )
          })
        ):(
          categorydata.map((cat,index)=>{
            return (
              <div className='w-full h-full ' key={cat._id+"displayCategory"} onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                <div>
                  <img src={cat.image} alt="" className='w-full h-full object-scale-down'/>
                </div>
              </div>
            )
          })
        )
      }
    </div>

      {
        categorydata?.map((c,index)=>{          
          return (
            <Categorywiseproductdisplay key={c?._id+"categorywiseproduct"} id={c?._id} name={c?.name}/>
          )
        })
      }
   </section>

)
}
export default Home