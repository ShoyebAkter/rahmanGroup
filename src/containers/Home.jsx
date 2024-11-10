import React, { useContext, useEffect, useState } from 'react'
import { LoginContext, SideNavContext } from '../reactcontext/ReactContext'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { LogoAndName, SideNavbar, TopNavbar } from '../components'
import { NotFound, Dashboard, VisaLanding, PassportLanding, ProfileLanding, AgentLanding, PaymentLanding, ReportLanding, UserLanding} from '.'
import ProfileAdd from '../components/ProfileAdd'
import AgentProfile from './agent/AgentProfile'
import ExpiredPassports from './reports/passport/ExpiredPassports'
import DueToExpire from './reports/passport/DueToExpire'
import ExpiredVisa from './reports/visa/ExpiredVisa'
import DueToExpireV from './reports/visa/DueToExpire'
import AgentWithProfiles from './reports/payments/AgentWithProfiles'
import Balances from './reports/payments/Balances'
import PaymentHistory from './reports/payments/PaymentHistory'
import EditPasswordModal from './user/EditPasswordModal'

const Landing = () => {
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handlePasswordEdit = () => {
    setShowPasswordModal(true);
  };
  
  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
  };

  useEffect(() => {
    if(!loginInfo.login){
        navigate('/')
    }
  }, [loginInfo])

  return (
    <SideNavContext.Provider value={{toggleMenu, setToggleMenu}}>
      <div className='md:hidden flex py-[4px]'>
        <LogoAndName />
      </div>
      <div className='w-full h-full flex flex-row p-[1px] bg-dimWhite flex-1 overflow-hidden'>

        {/* side navbar */}
        {
          toggleMenu && <SideNavbar />
        }
        
        
        {/* main container */}
        <div className='w-full h-full bg-white flex flex-col'>
          
          {/* top nav */}
          <TopNavbar 
            handlePasswordEdit={handlePasswordEdit}
          />

          <div className='w-full h-full m-1 white rounded-md shadow-sm px-[10  px] pt-[20px] relative flex items-start justify-center'>
           <Routes>
            <Route path='/users' element={<UserLanding/>} /> 
            <Route path='/reports/Payment History' element={<PaymentHistory/>} /> 
            <Route path='/reports/Balances' element={<Balances/>} /> 
            <Route path='/reports/Agent with Profiles' element={<AgentWithProfiles/>} /> 
            <Route path='/reports/Visa Due to Expire' element={<DueToExpireV/>} /> 
            <Route path='/reports/Expired Visas' element={<ExpiredVisa/>} /> 
            <Route path='/reports/Passports Due to Expire' element={<DueToExpire/>} />  
            <Route path='/reports/expired passports' element={<ExpiredPassports/>} />
            <Route path='/reports' element={<ReportLanding/>} />
            <Route path='/passport_exp' element={<PassportLanding/>} />
            <Route path='/1_month' element={<PassportLanding/>} />
            <Route path='/3_month' element={<PassportLanding/>} />
            <Route path='/6_month' element={<PassportLanding/>} />
            <Route path='/pass_expired' element={<PassportLanding/>} />
            <Route path='/visa_exp' element={<VisaLanding/>} />
            <Route path='/30_days' element={<VisaLanding/>} />
            <Route path='/60_days' element={<VisaLanding/>} />
            <Route path='/90_days' element={<VisaLanding/>} />
            <Route path='/expired' element={<VisaLanding/>} />
            <Route path='/agents' element={<AgentLanding/>} />
            <Route path='/add_profile' element={<ProfileAdd/>} />
            <Route path='/agentProfile' element={<AgentProfile/>} />
            <Route path='/payments' element={<PaymentLanding/>} />
            <Route path='/profile' element={<ProfileLanding/>} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<NotFound/>}/>
           </Routes>
          </div>
        </div>
        {showPasswordModal && <EditPasswordModal user={{id:loginInfo.userDetails.id}} onCancel={handlePasswordCancel} />}
      </div>
    </SideNavContext.Provider>
  )
}

export default Landing
