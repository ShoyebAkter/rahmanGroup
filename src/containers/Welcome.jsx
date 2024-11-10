import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../reactcontext/ReactContext'
import landingImg from '../assets/landing page.jpg'
import { Logout } from '../components'


const Welcome = () => {
  const { loginInfo, } = useContext(LoginContext)

  return (
    <div className='w-full h-full flex'>
      <img src={landingImg} alt="landing Img" className='w-full h-[100vh]' />
      
      <div className='absolute  h-full w-full flex flex-row justify-center bg-black bg-opacity-40'>
        <div className='md:text-[18pt] text-[16pt] my-[15px] mx-6'>
          {
            !loginInfo.login ? 
              <div>
                <div>
                  <h1 className='text-white text-4xl'>Hi! ~Rahman Group~</h1>
                </div>
                <div className='m-5 animate-pulse shadow-xl rounded-2xl bg-transparent p-4 flex items-center justify-center gap-4'>
                  <Link to={'/login'} className='bg-blue-600 text-dimWhite p-2 px-4 rounded-lg shadow-xl'>Login</Link>
                  {/*<Link to={'/register'} className='bg-yellow-500 p-2 px-4 rounded-lg shadow-xl'>Register</Link>*/}
                </div>
              </div> 
              : <div className='text-dimWhite p-3 flex flex-col gap-y-3'>
                <p>
                  Welcome {' - '}
                  <span className='font-bold'>
                    {loginInfo.userDetails.firstName}
                  </span>
                </p>

                <Link to={'/dashboard'} className='text-yellow-400 opacity-50 shadow-lg rounded-lg border-2 border-x-yellow-300 border-y-white px-3 py-1'>
                  Get Started
                </Link>

                <Logout />

              </div>
          }
        </div>
      </div>
      
    </div>
  )
}

export default Welcome
