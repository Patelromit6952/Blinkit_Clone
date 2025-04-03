import { Outlet ,useLocation } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import toast , {Toaster} from 'react-hot-toast'
import { useEffect } from "react"
import Fetchuserdeails from "./utils/Fetchuserdetails.js"
import { setUserDetails } from "./store/userslice.js"
import { useDispatch } from "react-redux"
import summaryapi from "./common/Summaryapi.jsx"
import {setAllCategory,  setLoadingCategory ,setAllSubCategory } from './store/productslice.js'
import Axios from "./utils/Axios.js"
import GlobalProvider from "./provider/GlobalProvider.jsx"
import Cartmobile from "./components/Cartmobile.jsx"

function App() {

  const dispatch  = useDispatch()  
  const location = useLocation()

  const fetchuser = async()=>{
    const userdata = await Fetchuserdeails()    
    dispatch(setUserDetails(userdata.data))
  }

  const fetchcategory = async()=>{
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...summaryapi.getcategory,
      })

      const {data:responsedata} = response

      if(responsedata.success){
       dispatch(setAllCategory(responsedata.data.sort((a,b) => a.name.localeCompare(b.name))))
      }

    } catch (error) {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...summaryapi.getsubcategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }
  useEffect(()=>{
    fetchuser()
    fetchcategory()
    fetchSubCategory()
  },[])
  
  return (
    <GlobalProvider> 
    <Header/>
    <main className="min-h-[78vh]">
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    {
        location.pathname !== '/checkout' && (
          <Cartmobile/>
        )
      }
     </GlobalProvider>
  )
}

export default App
