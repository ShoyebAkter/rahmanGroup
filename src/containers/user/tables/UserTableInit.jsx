import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserTableInit = ({setActiveTab, setSelected}) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/user`)
    .then(res => {
      setLoading(false)
      setData(res.data)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])

  const filteredData = data.filter(item =>
    item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${item.firstName} ${item.lastName} ${item.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const selectUser = idNo => {
    const selected = data.filter( item => item.id === idNo);
    setSelected(selected[0])
    setActiveTab(2)// Select the first profile
  };

  return (
    <div className='w-full p-2 flex flex-col gap-2 overflow-auto'>
      <div>
        <h1 className='text-xl text-center'>List of users</h1>
      </div>

      {
        loading ? "Fetching data" :
        data.length > 0 ? 
        <div className="max-w-4xl mx-auto p-4">
          <input
            type="text"
            placeholder="Search..."   
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <table className="w-full border border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Ref No.</th>
                <th className="border p-2">Full Name</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border p-2">{item.id}</td> 
                  <td className="border p-2">{item.firstName + " " + item.lastName}</td>
                  <td className="border p-2">{item.mobile}</td>
                  <td className="border p-2">
                    <button 
                      className='p-2 bg-blue-500 text-white'
                      onClick={() => selectUser(item.id)}
                    >
                      Explore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        : "User not found"
      }
      
    </div>
  )
}

export default UserTableInit
