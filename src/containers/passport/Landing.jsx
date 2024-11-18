import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PassportTableInit from './tables/PassportTableInit'
import { LoginContext } from '../../reactcontext/ReactContext';

const Landing = () => {
  const location = useLocation();
  const { loginInfo } = useContext(LoginContext);
  const navigate=useNavigate()
  useEffect(() => {
    if (!loginInfo.login) {
      navigate("/passport_exp");
    }
  }, [loginInfo]);
  let pathKey = location.pathname.split("/").pop();
  // console.log(pathKey)
  if(pathKey==="passport_exp"){
    pathKey="6_month"
  }
  return (
    <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Passport Expire
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center flex-col justify-center h-full gap-3'>
        <h1 className='text-xl font-semibold'>Passports due to expire within {pathKey}</h1>

        <PassportTableInit />
      </div>

    </div>
  )
}

export default Landing
