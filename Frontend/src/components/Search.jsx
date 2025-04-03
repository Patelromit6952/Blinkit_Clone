import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/Usemobile";

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [ismobile] = useMobile()
  const [issearchpage,setissearchpage] = useState(false)
  const params = useLocation()
  const searchtext = params.search.slice(3)

  useEffect(()=>{
    const issearch = location.pathname === "/search";
    setissearchpage(issearch)
  },[location])

  const redirecttosearchpage = () => {
navigate("/search")
  }
  const redirecttohomepage = () => {
    navigate("/")
      }

  const handleonchange = (e) => {
    const value = e.target.value

    const url = `/search?q=${value}`
    navigate(url)

  }

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12  rounded-lg border overflow-hidden flex items-center   text-neutral-600 bg-slate-50 group focus-within:border-primary-200 ">
        
        <div>
        
            { 
              (ismobile && issearchpage) ? (
                <Link to={"/"} onClick={redirecttohomepage} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
              <FaArrowLeft/>
          </Link>
              ):(
                <button onClick={redirecttohomepage} className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                <IoSearch size={22}/>
              </button>
              )
            }
          
        </div>
        <div className="w-full h-full items-center">
          {
            !issearchpage ? (
              <div onClick={redirecttosearchpage} className="w-full h-full flex items-center">
              <TypeAnimation
                sequence={[
                  'Search "milk"',
                  1000,
                  'Search "bread"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "sugar"',
                  1000,
                  'Search "Beverages"',
                  1000,
                  'Search "rice"',
                  1000,
                  'Search "panner"',
                  1000,
                  'Search "chocolate"',
                  1000,
                ]}  
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            ):(
               <div className="w-full h-full">
                <input 
                    type="text" 
                    placeholder="Search for atta dat and more"
                    className="bg-transparent w-full h-full outline-none"
                    autoFocus={true}
                    onChange={handleonchange}
                    defaultValue={searchtext}  
                  />
               </div>
            )
          }
        </div>
        
    </div>
  )
}

export default Search