import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function EditInfo4({ profileInit, setProfileInit, isInfo4Open, setIsInfo4Open }) {
  const overlayClass = isInfo4Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isInfo4Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  const [formData, setFormData] = useState({
    id: profileInit?.Health.id,
    bloodGroup: profileInit?.Health.bloodGroup,
  })

  const updateProfile = () => {
    setLoading(true)
    axios.put(`${apiUrl}/employee/updateHealthInfo`, formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.message){
                setProfileInit({...profileInit, Health: {
                    ...profileInit.Health, bloodGroup: formData.bloodGroup,
                  },
                    
                })
                
                swal({
                    icon:"success",
                    title:"Update",
                    text:"profile Info Updated Successfully!",
                    buttons:false,
                    timer: "2000"
                })
                
                setIsInfo4Open(false)

            
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
        
      <div className={overlayClass} onClick={() => setIsInfo4Open(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsInfo4Open(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Health Info</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                className={formClass}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            

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
export default EditInfo4;