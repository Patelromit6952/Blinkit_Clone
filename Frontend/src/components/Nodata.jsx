import React from 'react'
import nodataimage from '../assets/nothinghereyet.webp'

const Nodata = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
        <img src={nodataimage} alt="no data"  className='w-36'/>
         <p className='text-neutral-500 '>No Data</p>
    </div>
  )
}

export default Nodata