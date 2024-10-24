import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COLUMNS } from './table/columnsForProfiles'
import { LoginContext } from '../../reactcontext/ReactContext'
import axios from 'axios'
import ProfileTable from './table/ProfileTable'
import { AiOutlinePlus } from 'react-icons/ai'

const AgentWithProfile = ({parsedData, setSelectedProfile, setActiveTab}) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [errorMessage, setErrorMessage] = useState('')
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {

    axios.get(`${apiUrl}/employee/getOnly/${parsedData.id}`, {
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        setProfile(res.data)
        console.log(res.data)

        setLoading(false)
    })
    .catch(err => {
        console.log(err)
        setLoading(false)
    })
  }, [])
    

  return (
    <div className='w-full h-full '>

      <div className='flex flex-wrap justify-center items-center'>

        <h1 className='text-center text-xl font-light p-2 flex-1'>List of Profiles ({profile.length})</h1>
        <Link 
          to={"/profile"}
          className='py-2 bg-slate-200 shadow-xl px-3 rounded-md flex items-center gap-1'
        ><AiOutlinePlus size={18}/> Add Profile</Link>
      </div>
      
      
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching Agents ... Please wait</p> :
          (errorMessage && profile.length === 0) && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{errorMessage}</p>

            
              </div>              
            )
      }

      {
        profile && profile.length > 0 &&  
        <ProfileTable 
            columns={columns}
            data={profile}
            setSelectedProfile={setSelectedProfile}
            setActiveTab={setActiveTab}
        />
      }
    </div>
  )
}

export default AgentWithProfile
