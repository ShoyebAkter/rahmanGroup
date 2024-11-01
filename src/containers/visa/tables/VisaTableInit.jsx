import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import { LoginContext } from '../../../reactcontext/ReactContext'
import axios from 'axios'
import swal from 'sweetalert'
import VisaTable from './VisaTable'

const VisaTableInit = ({pathKey}) => {
  
  const apiUrl = process.env.REACT_APP_API_URL
  const [visas, setVisas] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {

    axios.get(`${apiUrl}/employee/visaExpire`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setVisas(res.data.visas)
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
    
// console.log(visas)
  return (
    <div className='w-full h-full overflow-auto'>
    
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching results ... Please wait</p> :
        typeof visas === "undefined" && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{"there are no any expiry visas"}</p>
              </div>              
            )
      }

      {
        typeof visas === "object" &&  
        <VisaTable
          columns={columns} 
          data={visas} 
          pathKey={pathKey}
        />
      }
    </div>
  )
}

export default VisaTableInit
