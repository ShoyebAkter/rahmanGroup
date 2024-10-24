import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProfile from '../containers/profile/form/AddProfile'
import axios from 'axios'
import swal from 'sweetalert'

const ProfileAdd = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [agents, setAgents] = useState([])

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
  }, [])

  return (
    <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 
        Quick profile
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center flex-col justify-center h-full gap-3'>
        <AddProfile agents={agents} />
      </div>

    </div>
  )
}

export default ProfileAdd
