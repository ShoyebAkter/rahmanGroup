import { Routes, Route, } from 'react-router-dom'
import { Home, Login, NotFound, Welcome } from './containers';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginContext } from './reactcontext/ReactContext'
import swal from 'sweetalert';

function App() {
  const [loginInfo, setLoginInfo] = useState({
    userDetails: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
    },
    login: false
  })

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${apiUrl}/auth/authenticatedUser`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    })
    .then(res => { 
      setLoading(false)
      setLoginInfo({
        ...loginInfo,
        userDetails: {
          id: res.data.loginInfo.userId,
          email: res.data.loginInfo.email,
          firstName: res.data.loginInfo.User.firstName,
          lastName: res.data.loginInfo.User.lastName,
          role: res.data.loginInfo.UserRole.roleName
        },
        login: true
      })
    })
    .catch(err => {
      setLoading(false)
      console.log(err.response.data.error)
    })
  }, [])
  // console.log(loginInfo)

  if(!loading){
    return (
      <LoginContext.Provider value={{loginInfo, setLoginInfo}}>
        <div className="w-full h-full flex flex-col items-center justify-center bg-dimWhite font-poppins">
            <Routes>
            <Route path='/' element={<Welcome />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Home />}/>
            </Routes>
        </div>
      </LoginContext.Provider>
    );
  }else{
    (
      <div className='text-3xl text-black'>Loading... Please Wait</div>
    )
  }
  
}

export default App;
