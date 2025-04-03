import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/IsAdmin.js'

const Adminpermission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <div>
        {        
              isAdmin(user.role) ? children : <p className='text-red-600 bg-red-100 p-4'>Don't have permission</p>
        }    
</div>
  )
}

export default Adminpermission