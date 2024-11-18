import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../reactcontext/ReactContext'
import { Link, useNavigate } from 'react-router-dom'
import { Panel } from '../../components'

const Landing = () => {
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()

  const reports = [
    { id:1, title: 'Report List', components: [
        'Expired Passports',
        'Expired Visas',
        'Passports due to expire',
        'Visa due to expire',
        'Agent with Profiles',
        'Payment History', 
        'Balances', 
    ]},
  ]

  useEffect(() => {

    !loginInfo.login && navigate("/reports")
    
  }, [loginInfo])
  
  return (
   <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Reports
      </div>

      <div className="w-full flex flex-wrap p-4 gap-y-6 gap-x-4 justify-evenly">
      {reports.map(item => (
        <Panel key={item.id} title={item.title}>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {item.components.map((value, key) => (
              <div
                key={key}
                className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow duration-200"
              >
                <Link
                  to={`/reports/${value}`}
                  className="text-blue-800 font-semibold"
                >
                  {(key + 1) + '. ' + value}
                </Link>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </div>
    </div>
  )
}

export default Landing