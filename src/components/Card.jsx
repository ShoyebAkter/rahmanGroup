import React from 'react'

const Card = ({title, children}) => {
  return (
    <div className='min-w-[275px] flex flex-col shadow-md rounded-sm'>
        <h1 className="text-xl font-bold w-full p-3 bg-gray-800 text-white rounded-md">{title}</h1>
        <div className='p-2'>
            {children}
        </div>
    </div>
  )
}

export default Card
