import React from 'react'
import Usermenu from '../components/Usermenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  
  return (
    <div>
        <section className='bg-white'>
          <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
            <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r '>
              <Usermenu/> 
            </div>
            <div className='bg-white min-h-[75vh]'>
              <Outlet/> 
            </div>
            </div>
        </section>
    </div>
  )
}

export default Dashboard 