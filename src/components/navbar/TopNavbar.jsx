import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiFillCaretDown, AiOutlineSearch, AiOutlineUser, AiFillBell, AiFillMessage, AiFillCaretUp, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { LoginContext, SideNavContext } from '../../reactcontext/ReactContext'
import Logout from '../Logout'
import LogoAndName from '../LogoAndName'
import EditPasswordModal from '../../containers/user/EditPasswordModal'

const TopNavbar = ({handlePasswordEdit}) => {
  const {loginInfo} = useContext(LoginContext)
  const [onProfileClick , setonProfileClick ] = useState(false)
  const {toggleMenu, setToggleMenu} = useContext(SideNavContext)
  const profileRef = useRef(null);
  const profileClick = () => {
    setonProfileClick(prev => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setonProfileClick(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const menuButtonClick = () => {
    setToggleMenu(prev => !prev)
  }

  return (
    <div className='w-full m-[1px] p-2 bg-white flex flex-row items-center justify-between'>
      <div className='flex items-center flex-row cursor-pointer' onClick={menuButtonClick}>
        {
          toggleMenu ? <AiOutlineMenuFold fontSize={22}/> :  
          <div className='flex flex-row items-center gap-x-4'>
            <AiOutlineMenuUnfold fontSize={22}/>
            <span className='font-bold hidden md:flex'>
              Rahman Group
            </span>
          </div>
        }
      </div>

      
      
      <div className='p-1 w-1/3 relative ' >
        <input 
          type="text" 
          className='p-2 border-2 border-gray-300 rounded-xl bg-gray-300 px-6 w-full opacity-50  focus:outline-none focus:border-blue-500' 
          placeholder='Search ... ' />
        <div className="absolute left-[13px] top-[28px] transform -translate-y-1/2 opacity-30">
          <AiOutlineSearch />
        </div>
      </div>

      <div className='flex flex-row items-center justify-center gap-x-2 mr-2 p-1 px-3 shadow-sm rounded-lg'>

        <div className='flex flex-row relative items-center justify-center gap-x-2 cursor-pointer' ref={profileRef} onClick={profileClick}>
          <div className='w-8 h-8 rounded-full flex bg-slate-300 items-center justify-center'>
            <AiOutlineUser />
          </div>
          <span className='font-extralight capitalize'>{loginInfo.userDetails.firstName}</span>

          {
            onProfileClick ? 
            <span><AiFillCaretUp fontSize={18}/></span> :
            <span><AiFillCaretDown fontSize={18}/></span>
          }
          

          {
            onProfileClick && 
              <div className='absolute top-10 right-0 w-[175px] flex flex-col items-center justify-center p-1 border-2 border-gray-200 rounded-xl z-50 bg-black'>
                <span className='mt-2 font-semibold text-white capitalize'>{loginInfo.userDetails.firstName + ' ' + loginInfo.userDetails.lastName}</span>
                <span className='mt-2 text-white lowercase'>~{ ' ' + loginInfo.userDetails.role + ' user ~'} </span>
                <span className='mt-2 text-white lowercase' onClick={handlePasswordEdit}>Update Password </span>
                <Logout />
              </div>
          }
        </div> 
      </div>
    </div>
  )
}

export default TopNavbar
