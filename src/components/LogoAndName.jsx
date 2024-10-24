import React from 'react'
import logo from '../assets/logo.avif'

const LogoAndName = () => {
  return (
    <div className='flex flex-row items-center justify-start gap-x-2 mt-1'>
        <img src={logo} alt="Logo" className='w-8' />
        <span className='text-[12pt] font-serif font-semibold self-end'>Rahman Group</span>
    </div>
  )
}

export default LogoAndName
