import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PaymentTableInit from './tables/PaymentTableInit'
import { LoginContext } from '../../reactcontext/ReactContext';

const Landing = () => {
  const { loginInfo } = useContext(LoginContext);
  const navigate=useNavigate()
  useEffect(() => {
    if (!loginInfo.login) {
      navigate("/payments");
    }
  }, [loginInfo]);
  return (
    <div className='w-full bg-gray-50 flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start ml-10 mt-10'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Payments
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center flex-col justify-center h-full gap-3'>
        <h1 className='text-xl font-semibold'>List of General Payments</h1>
        
        <PaymentTableInit />
      </div>

    </div>
  )
}

export default Landing
