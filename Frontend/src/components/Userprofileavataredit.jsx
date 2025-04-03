import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import summaryapi from '../common/Summaryapi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userslice'
import { IoClose } from "react-icons/io5"

const Userprofileavataredit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setloading] = useState(false)

    const handlesubmit = (e) => {
        e.preventDefault()
    }

    const handleuploadavatarimage = async(e) => {
        const file = e.target.files[0]
        
        if(!file) return
        
        const formdata = new FormData()
        formdata.append('avatar',file)
        console.log(formdata);
        

        try {
            setloading(true)
            const response = await Axios({
                ...summaryapi.uploadavatar,
                  data:formdata
            })
            const {data:responseData} = response
            dispatch(updatedAvatar(responseData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setloading(false)
        }
    }

  return (
   <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
    <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
      <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
        <IoClose size={20}/>
        </button >
           <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                  user.avatar ? (
                    <img src={user.avatar} alt={user.name} className='w-ful h-full' />
                  ):(
                    <FaRegUserCircle size={65}/>
                  )
                }
              </div>
              <form onSubmit={handlesubmit}>
                <label htmlFor="upload-profile">
                    <div className=' cursor-pointer border border-primary-100 hover:bg-primary-200 px-4 py-2 rounded text-sm my-3'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                </label>
                <input onChange={handleuploadavatarimage} type="file" id="upload-profile" className='hidden' />
              </form>
              
    </div>
   </section>
  )
}

export default Userprofileavataredit