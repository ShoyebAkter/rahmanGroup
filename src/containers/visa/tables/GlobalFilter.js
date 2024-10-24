import React from 'react'

const GlobalFilter = ({ filter, setFilter , placeholderText }) => {
  return (
    <div className='p-5 self-end'>
        <input 
            type="text" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className='border-2 p-2 text-center border-black'  
            placeholder={placeholderText}
        />
    </div>
  )
}

export default GlobalFilter
