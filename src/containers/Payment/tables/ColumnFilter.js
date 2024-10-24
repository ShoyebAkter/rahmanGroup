import React from 'react'

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <div className='py-2'>
        <input 
            type="text" 
            value={filterValue} 
            onChange={(e) => setFilter(e.target.value)} 
            className='border-2 text-center w-2/3 border-black'  
            placeholder='filter'
        />
    </div>
  )
}

export default ColumnFilter
