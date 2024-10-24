import React, { useContext } from 'react'
import { LoginContext } from '../reactcontext/ReactContext'
import {AiOutlineLogout} from 'react-icons/ai'

const Logout = () => {
    const { loginInfo, setLoginInfo } = useContext(LoginContext)

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
    localStorage.removeItem('loginToken')
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
