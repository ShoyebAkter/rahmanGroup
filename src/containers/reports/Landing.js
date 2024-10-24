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

    !loginInfo.login && navigate("/")
    
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

      <div className='w-full flex flex-wrap p-2 py-4 gap-y-10 gap-x-1 justify-evenly'>
        {
          reports.map(item => (
            <Panel title={item.title}>
              <div className='w-full flex flex-col items-start p-2 gap-4 text-[12pt] text-blue-800'>
                {
                  item.components.map((value, key) => (
                    <div className='border-b-[3px] w-full'>
                      <Link to={`/reports/${value}`}>{(key+1) + '. ' + value}</Link>
                    </div>
                  ))
                }
              </div>
            </Panel>
          ))
        }
      </div>
    </div>
  )
}

export default Landing