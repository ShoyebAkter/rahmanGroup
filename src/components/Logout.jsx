import React, { useContext } from 'react'
import { LoginContext } from '../reactcontext/ReactContext'
import {AiOutlineLogout} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { loginInfo, setLoginInfo } = useContext(LoginContext)
    const navigate=useNavigate()
    const logout = () => {
        setLoginInfo({
            ...loginInfo,
            userDetails: {
            id: '',
            email: "",
            firstName: "",
            lastName: "",
            role: ""
            },
            login: false
        })
    localStorage.removeItem('loginToken');
    navigate("/login")
  }
  return (
    <div>
       <button className='text-red-500 shadow-lg rounded-lg px-3 py-1 flex items-center gap-x-2 mt-5' onClick={logout}>
            <AiOutlineLogout fontSize={28}/>
            Logout
        </button>
    </div>
  )
}

export default Logout
