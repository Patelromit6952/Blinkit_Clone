import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import Axios from "../utils/Axios"
import summaryapi from "../common/Summaryapi"
import toast from "react-hot-toast"
import axiostoasterror from "../utils/AxiosToastError"


const Forgotpasswordotp = () => {

  const [data,setdata] = useState({
    email:""
  })
  const navigate = useNavigate()

  const handlechange =(e) => {
    const {name,value} = e.target
    setdata((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
  }

  const validatevalue = Object.values(data).every(el=>el)

  const handlesubmit = async(e) => {
    e.preventDefault()

    try {
        const response = await Axios({
            ...summaryapi.forgotpassword,
            data:data
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.success(response.data.message)
            navigate("/verifyotp",{
                state:data
            })
            setdata({
                email:""
            })
        }
    } catch (error) {
        axiostoasterror(error)
    }
  }

  return (
    <section className='w-full container mx-auto px-2'>
    <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-center  text-lg'>Forgot Password </p>
        <form className='grid gap-4 py-4' onSubmit={handlesubmit}>
            <div className='grid gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                    type='email'
                    id='email'
                    className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                    name='email'
                    value={data.email}
                    onChange={handlechange}
                    placeholder='Enter your email'
                />
            </div>
     
            <button disabled={!validatevalue} className={` ${validatevalue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send OTP</button>

        </form>

        <p>
            Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
    </div>
</section>
  )
}

export default Forgotpasswordotp