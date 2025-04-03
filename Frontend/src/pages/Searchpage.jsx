import React , {useEffect, useState} from 'react'
import Cartloading from '../components/Cartloading'
import summaryapi from '../common/Summaryapi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Cartproduct from '../components/Cartproduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import nodata from '../assets/nothinghereyet.webp'


const Searchpage = () => {

  const [data,setdata] = useState([])
  const [loading,setloading] = useState(false)
  const loadingArraycard = new Array(10).fill(null)
  const [page,setpage] = useState(1)
  const [totalpage,settotalpage] = useState(1)
  const params = useLocation()
  
  const searchtext = params?.search?.slice(3)

  // console.log(searchtext);
  

  const fetchdata = async () => {
    try {
      setloading(true)
      const res = await Axios({
        ...summaryapi.searchProduct,
        data :{
          search : searchtext,
          page : page
        }
      })
      // console.log(res);
      
      const { data : responseData} = res 
      
      if(responseData.success){
        if(responseData.page == 1){
          setdata(responseData.data)
        }
        else{
          setdata((preve)=>{
            return [
              ...preve,
              responseData.data,
            ]
          })
        }
        settotalpage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setloading(false)
    }
  }

  const handlefetchmore = () => {
    if(totalpage > page) {
      setpage(preve => preve + 1)
    }
  }
  useEffect(()=>{
    fetchdata()
  },[page,searchtext])

  return (
    <section className='bg-white'>
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>
      </div>

        <InfiniteScroll 
        dataLength={data.length}
        hasMore={true}
        next={handlefetchmore}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4 p-4'>
        {
          data.map((p,index)=>{
            return(
              <Cartproduct data={p} key={p._id+"searchproduct"}/>
            )
          })
        }
          {
            loading && (
              loadingArraycard.map((_,index)=>{
                return (
                  <Cartloading key={"loadingsearchpage"+index}/>
                )
              })
            )
          }
      </div>
      </InfiniteScroll>
      {
                //no data 
                !data[0] && !loading && (
                  <div className='flex flex-col justify-center items-center w-full mx-auto'>
                    <img
                      src={nodata} 
                      className='w-full h-full max-w-xs max-h-xs block'
                    />
                    <p className='font-semibold my-2'>No Data found</p>
                  </div>
                )
              }

    </section>
  )
}

export default Searchpage