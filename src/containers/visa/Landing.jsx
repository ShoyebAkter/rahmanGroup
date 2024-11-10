import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import VisaTableInit from './tables/VisaTableInit'

const Landing = () => {
  const location = useLocation();
  let pathKey = location.pathname.split("/").pop();
  // console.log(pathKey)
  if(pathKey==="visa_exp"){
    pathKey="90_days"
  }
  // console.log(pathKey)
  return (
    <div className='w-full bg-gray-50 flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Visa Expire
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center flex-col justify-center overflow-auto h-full gap-3'>
        <h1 className='text-xl font-semibold'>Visas due to expire within {pathKey}</h1>

        <VisaTableInit pathKey={pathKey} />
      </div>

    </div>
  )
}

export default Landing
