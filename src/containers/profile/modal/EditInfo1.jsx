import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function EditInfo1({ profileInit, setProfileInit, isOpen, setIsOpen }) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  const [formData, setFormData] = useState({
    id: profileInit.id,
    firstName: profileInit.firstName,
    lastName: profileInit.lastName,
    DOB: profileInit.DOB,
    nationality: profileInit.nationality,
    mobile: profileInit.mobile,
    telephone: profileInit.telephone,
    status: profileInit.status,
    email: profileInit.email,
    idNo: profileInit.idNo,
    agentId: profileInit.agentId,
  })

  const updateProfile = () => {
    setLoading(true)
    axios.put(`${apiUrl}/employee/updatePersonalInfo`, formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.message){
           
            setProfileInit({...profileInit,
                firstName: formData.firstName,
                lastName: formData.lastName,
                DOB: formData.DOB,
                mobile: formData.mobile,
                telephone: formData.telephone,
                status: formData.status,
                idNo: formData.idNo,
                email: formData.email,
                agentId: formData.agentId,
            })

            swal({
                icon:"success",
                title:"Update",
                text:"Info Updated Successfully!",
                buttons:false,
                timer: "2000"
            })
            
            setIsOpen(false)

        }else{
          console.log(result)
          
            swal({
                icon:"error",
                title:"Oops!",
                text:result.data.error,
            })
        }
     
      
    }).catch(err => {
      setLoading(false)
      console.log(err)
      if (err.response) {
        swal({
          title: 'Error',
          icon: 'error',
          text: err.response.data.error,
        });
      } else {
        console.error(err);
      }
    })
  }

  return (
    <div className='text-black'>
        
      <div className={overlayClass} onClick={() => setIsOpen(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Update Personal Info</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Identification No.</label>
              <input type="text" value={formData.idNo} className={formClass + " mb-3"} required
                onChange={e => setFormData({...formData, idNo:e.target.value})} 
              />
              <label htmlFor="">First Name</label>
              <input type="text" value={formData.firstName} className={formClass} required
                onChange={e => setFormData({...formData, firstName:e.target.value})} 
              />
              <label htmlFor="" className='mt-4'>Last Name</label>
              <input type="text" value={formData.lastName} className={formClass} required
                onChange={e => setFormData({...formData, lastName:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>DOB</label>
              <input type="text" value={formData.DOB} className={formClass} required
                onChange={e => setFormData({...formData, DOB:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Email</label>
              <input type="text" value={formData.email} className={formClass} required
                onChange={e => setFormData({...formData, email:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Mobile</label>
              <input type="text" value={formData.mobile} className={formClass} required
                onChange={e => setFormData({...formData, mobile:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Telephone</label>
              <input 
                type="text"
                value={formData.telephone} 
                className={formClass}
                onChange={e => setFormData({...formData, telephone:e.target.value})}
              />


              <label htmlFor="" className='mt-4'>Status</label>
              <select value={formData.status} className={formClass} required onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
export default EditInfo1;