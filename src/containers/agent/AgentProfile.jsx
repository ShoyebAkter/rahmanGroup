import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import AgentWithProfile from './AgentWithProfile';
import ProfilePayment from '../Payment/ProfilePayment';

const AgentProfile = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const agentData = searchParams.get('agentData');
    const [activeTab, setActiveTab] = useState(0);
    const [selectedProfile, setSelectedProfile] = useState({});
    // Parse agentData if needed
    const parsedAgentData = agentData ? JSON.parse(agentData) : null;

    const tabContent = [
      { title: 'Profiles', content: <AgentWithProfile parsedData={parsedAgentData} setSelectedProfile={setSelectedProfile} setActiveTab={setActiveTab}/> },
      { title: 'Payment Details', content: <ProfilePayment setActiveTab={setActiveTab} selectedProfile={selectedProfile} /> }
      //{ title: '', content: <ProfilePayment agentId={agentId} profile={selectedProfile} setActiveTab={setActiveTab} activeTab={activeTab}/> },
    ];

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

        <Link
        to={'/agents'}
        className='text-yellow-700'>
          Agents
        </Link> 

        {' > '} 

        { 
          parsedAgentData.name + " Profiles"
        }

      </div>

      <div className='w-full justify-between flex items-center p-1 mt-2'>
        <Link
          to={'/agents'}
          className='text-yellow-700'
        >
          <AiOutlineArrowLeft size={22} />
        </Link>
        
        <h1 className='text-lg font-bold'>Profiles for {parsedAgentData.name}</h1>
        <div></div>
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

export default AgentProfile
