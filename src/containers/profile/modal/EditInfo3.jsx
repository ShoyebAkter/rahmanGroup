import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function EditInfo3({ profileInit, setProfileInit, isInfo3Open, setIsInfo3Open }) {
  const overlayClass = isInfo3Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isInfo3Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  const [formData, setFormData] = useState({
    id: profileInit?.EmergencyContacts[0].id,
    fullName: profileInit?.EmergencyContacts[0].fullName,
    mobile: profileInit?.EmergencyContacts[0].mobile,
    telephone: profileInit.EmergencyContacts[0].telephone,
  })

  const updateProfile = () => {
    setLoading(true)
    axios.put(`${apiUrl}/employee/updateEmergencyContact`, formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.message){
          setProfileInit({
            ...profileInit,
            EmergencyContacts: [
              {
                id: profileInit.EmergencyContacts[0].id, // Assuming you want to keep the same ID
                fullName: formData.fullName,
                mobile: formData.mobile,
                telephone: formData.telephone,
                // You may need to copy other properties as well, depending on your data structure
              }
            ]
          });   

          swal({
              icon:"success",
              title:"Update",
              text:"profile Info Updated Successfully!",
              buttons:false,
              timer: "2000"
          })
          
          setIsInfo3Open(false)

            
        }else{
            
            swal({
                icon:"error",
                title:"Oops!",
                text:result.data.error,
            })
        }
     
      
    }).catch(err => {
      setLoading(false)
      swal({
        icon:"error",
        title:"Oops!",
        text:err.response.data.error,
      })
    })
  }

  return (
    <div className='text-black'>
        
      <div className={overlayClass} onClick={() => setIsInfo3Open(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsInfo3Open(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Emergency Contact Info</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Full Name</label>
              <input type="text" value={formData.fullName} className={formClass}
                onChange={e => setFormData({...formData, fullName:e.target.value})} 
              />
              <label htmlFor="" className='mt-4'>Mobile</label>
              <input type="text" value={formData.mobile} className={formClass}
                onChange={e => setFormData({...formData, mobile:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Telephone</label>
              <input type="text" value={formData.telephone} className={formClass}
                onChange={e => setFormData({...formData, telephone:e.target.value})} 
              />

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => updateProfile()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditInfo3;