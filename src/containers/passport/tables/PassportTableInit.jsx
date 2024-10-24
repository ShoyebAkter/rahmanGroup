import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import { LoginContext } from '../../../reactcontext/ReactContext'
import axios from 'axios'
import swal from 'sweetalert'
import PassportTable from './PassportTable'

const PassportTableInit = () => {
  
  const apiUrl = process.env.REACT_APP_API_URL
  const [passports, setpassports] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {

    axios.get(`${apiUrl}/employee/passportExpire`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        console.log()
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setpassports(res.data.passports)
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
    <div className='w-full h-full overflow-auto'>
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching data... Please wait</p> :
          typeof passports === "undefined" && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{"there are no any expiry passports"}</p>
              </div>              
            )
      }

      {
        typeof passports === "object" &&  
        <PassportTable
          columns={columns} 
          data={passports} 
        />
      }
    </div>
  )
}

export default PassportTableInit
