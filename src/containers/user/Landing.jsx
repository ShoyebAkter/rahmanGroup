import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../reactcontext/ReactContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AddUser from './form/AddUser'
import UserTableInit from './tables/UserTableInit'
import UserDetails from './UserDetails'

const Landing = () => {
  const [selected, setSelected] = useState({})
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1);
  
  // Define tab content
  const tabContent = [
    { title: 'Create User', content: <AddUser setActiveTab={setActiveTab}/> },
    { title: 'Lists Users', content: <UserTableInit setActiveTab={setActiveTab} setSelected={setSelected}/> },
    { title: 'User Info', content: <UserDetails 
                                          setActiveTab={setActiveTab} 
                                          user={selected}
                                          setSelected={setSelected} 
                                        />
      
    },
    //{ title: '', content: <ProfilePayment agentId={agentId} profile={selectedProfile} setActiveTab={setActiveTab} activeTab={activeTab}/> },
  ];

  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
   <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Users

      </div>
      <div className='text-lg font-bold'>
        Users
      </div>
      {/* Render tab buttons */}
      <div className='w-full flex flex-wrap justify-evenly mt-3 border-b-2 border-b-gray-300 rounded-lg bg-gray-100 p-2'>
        {tabContent.map((tab, index) => (
          <>
            {tab.title.length > 0 &&
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={activeTab === index ? 'border-2 border-black md:text-[14pt] text-[11pt] bg-gray-300 px-4  text-black p-2 rounded-2xl m-1':
                'border-2 shadow-lg border-white rounded-2xl md:p-3 p-1'}
              >
                {tab.title}
              </button>
            } 
           
          </>
         
        ))}
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center justify-center h-full'>
        {tabContent[activeTab].content}
      </div>

    </div>
  )
}

export default Landing