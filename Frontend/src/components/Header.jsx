import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/Usemobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { useEffect, useState } from 'react';
import Usermenu from './Usermenu';
import DisplayPriceInRupees from '../utils/Displaypriceinrupee.js'
import DisplayCartItem from './DisplayCartItem.jsx';

const Header = () => {

  const  [ismobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const issearchpage = location.pathname === "/search"
  const user = useSelector((state)=>state?.user)
  const [openusermenu,setopenusermenu] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)
  const [totalprice,settotalprice]  = useState(0)
  const [totalqty,settotalqty] = useState(0)
  const [openCarSection,setopenCartSection] = useState(false)
  

  const redirecttologinpage =  () => {
    navigate("/login")
  }

  const handlecloseusermenu = ()=>{
    setopenusermenu(false)
  }

  const handlemobileuser = () => {
    if(!user._id){
      navigate("/login")
      return 
    }
    navigate("/user")
  }

  useEffect(()=>{
    const qty = cartItem.reduce((preve,curr)=>{
      return preve + curr.quantity
    },0)
    settotalqty(qty)
    const price = cartItem.reduce((preve,curr)=>{
      return preve + (curr.productId.price * curr.quantity) 
    },0)
    settotalprice(price)
  },[cartItem])
  return (
    <header className='h-24 lg:h-20 lg:shadow-md z-40 bg-white sticky top-0 flex  flex-col justify-center gap-1'>
      {
        !(issearchpage && ismobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>

          {/* logo */}
          <div className='h-full'>
            <Link to={"/"} className='h-full flex justify-center items-center'>
                        <img 
                        src={logo}
                        width={170}
                        height={60}
                        alt='logo'
                        className='hidden'
                    />
                      <img 
                        src={logo}
                        width={140}
                        height={50}
                        alt='logo'
                        className='lg:block'
                    />
               </Link>
            </div>

        {/* Search  */}
        <div className='hidden lg:block'>
            <Search/>
        </div>

        {/* login and my cart */}

        <div className=''>

          {/* user icon for mobile */}
          <button className='text-neutral-600 lg:hidden' onClick={handlemobileuser}>
            <FaRegUserCircle size={30}/>
          </button>

          {/* desktop */}

          <div className='hidden lg:flex items-center gap-10'>
            {
              user?._id ? (
                <div className='relative'>
                    <div onClick={()=>setopenusermenu(prev=>!prev )} className='flex select-none items-center gap-1 cursor-pointer'>
                      <p>Account</p>
                      {
                        openusermenu ? (
                          <GoTriangleUp size={25}/>
                        ):(
                          <GoTriangleDown size={25}/>
                        )
                      }
                    </div>
                    {
                      openusermenu && (
                        <div className='absolute right-0 top-12'>
                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                          <Usermenu close={handlecloseusermenu}/>
                        </div>
                    </div>
                      ) 
                    }
                   
                </div>
              ):(
                <button onClick={redirecttologinpage} className='text-lg px-2 '>Login</button>
              )
            }
            <button onClick={()=>setopenCartSection(true)} className='flex items-center gap-2 bg-green-700 hover:bg-green-800 px-3 py-3 rounded text-white'>
              <div className='animate-bounce'>
                <BsCart4 size={26}/>
              </div>
              <div className='font-sm'>
                {
                  cartItem[0] ? (
                    <div><p>{totalqty} Items</p>
                    <p>{DisplayPriceInRupees(totalprice)}</p></div>
                  ) : (
                    <p>My Cart</p>
                  )
                }
               
              </div>
            </button>
          </div>
        </div>
        </div>
        )
      }
        <div className='container mx-auto px-2 lg:hidden'>
          <Search/>
        </div>
        {
          openCarSection && (
            <DisplayCartItem close={()=>setopenCartSection(false)}/>
          )
        }
    </header>
  )
}
export default Header