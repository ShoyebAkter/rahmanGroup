import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import { LoginContext } from '../../../reactcontext/ReactContext'
import axios from 'axios'
import swal from 'sweetalert'
import ProfileTable from './ProfileTable'

const ProfileTableInit = ({setActiveTab, setSelectedProfile}) => {
  
  const apiUrl = process.env.REACT_APP_API_URL
  const [profiles, setProfiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    setSelectedProfile({})

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {
    setLoading(true)
    axios.get(`${apiUrl}/employee`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
  })
    .then(res => {
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setProfiles(res.data)
        }

        setLoading(false)
    })
    .catch(err => {

        swal({
            title: "Error",
            icon: "error",
            text: JSON.stringify(err.message)
        })
        setLoading(false)
    })
  }, [])
  // console.log(profiles)
  return (
    <div className='w-full h-full overflow-auto'>
      {/* <h1 className='text-center text-xl font-light p-4'>List of Computer Accessories {`(${profiles.length})`}</h1> */}
      
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching results ... Please wait</p> :
          profiles.length === 0 && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{"You need to create a profile"}</p>

                 <button 
                  onClick={() => setActiveTab(0)}
                  className="py-4 font-light text-white px-5 border-2 rounded-xl bg-black-gradient font-poppins">
                    Add Employee
                 </button>
              </div>              
            )
      }

      {
        profiles && profiles.length > 0 &&  
        <ProfileTable
          columns={columns} 
          data={profiles} 
          setActiveTab={setActiveTab} 
          setSelectedProfile={setSelectedProfile}
        />
      }
    </div>
  )
}

export default ProfileTableInit
