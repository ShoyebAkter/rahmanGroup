import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../reactcontext/ReactContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AddProfile from './form/AddProfile'
import ProfileTableInit from './tables/ProfileTableInit'
import ProfileDetails from './ProfileDetails'
import ProfilePayment from '../Payment/ProfilePayment'

const Landing = () => {
  const [selectedProfile, setSelectedProfile] = useState({})
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const agentData = searchParams.get('agentData');
  // Parse agentData if needed
  const parsedAgentData = agentData ? JSON.parse(agentData) : null;
  
  //const [agentId, setAgentId] = useState(parsedAgentData.id)
  
  // Define tab content
  const tabContent = [
    { title: 'Create Profile', content: <AddProfile setActiveTab={setActiveTab}/> },
    { title: 'Lists Profiles', content: <ProfileTableInit setActiveTab={setActiveTab} setSelectedProfile={setSelectedProfile}/> },
    { title: 'Profile Info', content: <ProfileDetails 
                                          setActiveTab={setActiveTab} 
                                          profile={selectedProfile}
                                          setSelectedProfile={setSelectedProfile} 
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

        { 
          //parsedAgentData.name + " "
        }
        Profiles

      </div>
      <div className='text-lg font-bold'>
        All Profiles
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