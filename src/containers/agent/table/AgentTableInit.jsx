import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import { LoginContext } from '../../../reactcontext/ReactContext'
import axios from 'axios'
import swal from 'sweetalert'
import AgentTable from './AgentTable'

const AgentTableInit = ({agents, setAgents, formData, setFormData, openModal, handleDelete, dLoading, refresh}) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {

    axios.get(`${apiUrl}/agent`, {
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setAgents(res.data)
        }

        setLoading(false)
    })
    .catch(err => {
        console.log(err)
        swal({
            title: "Error",
            icon: "error",
            text: JSON.stringify(err.message)
        })
        setLoading(false)
    })
  }, [refresh])
    

  return (
    <div className='w-full'>
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching Agents ... Please wait</p> :
          (errorMessage && agents.length === 0) && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{errorMessage}</p>

                 <button 
                 onClick={openModal}
                  className="py-4 font-light text-white px-5 border-2 rounded-xl bg-black-gradient font-poppins">
                    Record Agent
                 </button>
              </div>              
            )
      }

      {
        agents && agents.length > 0 &&  
        <AgentTable
          columns={columns} 
          data={agents}
          formData={formData}
          setFormData={setFormData}
          openModal={openModal}
          handleDelete={handleDelete}
          dLoading={dLoading}
        />
      }
    </div>
  )
}

export default AgentTableInit
