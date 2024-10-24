import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';

function Passport({ profileInit, setProfileInit, isInfo5Open, setIsInfo5Open , index}) {
  const overlayClass = isInfo5Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isInfo5Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  const normalDate = profileInit?.Passports[index].expiryDate
  const [formData, setFormData] = useState({
    id: profileInit?.Passports[index].id,
    passportNo: profileInit?.Passports[index].passportNo,
    issueDate: profileInit?.Passports[index].issueDate,
    expiryDate: normalDate, // Convert to Date object
  })

  const updateProfile = () => {
    setLoading(true)
    axios.put(`${apiUrl}/employee/updatePassport`, formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.message){
          setProfileInit({
            ...profileInit,
            Passports: profileInit.Passports.map((passport, i) => {
              if (i === index) {
                return {
                  ...passport,
                   passportNo: formData.passportNo,
                   issueDate: formData.issueDate instanceof Date ? formData.issueDate.toISOString().split("T")[0] : formData.issueDate,
                   expiryDate: formData.expiryDate instanceof Date ? formData.expiryDate.toISOString().split("T")[0] : formData.expiryDate,
                };
              }
              return passport;
            }),
          });

                swal({
                    icon:"success",
                    title:"Update",
                    text:"profile Info Updated Successfully!",
                    buttons:false,
                    timer: "2000"
                })
                
                setIsInfo5Open(false)

            
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
        
      <div className={overlayClass} onClick={() => setIsInfo5Open(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsInfo5Open(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Passport Info</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Passport No.</label>
              <input type="text" value={formData.passportNo} className={formClass}
                onChange={e => setFormData({...formData, passportNo:e.target.value})} 
              />
              <label htmlFor="" className='mt-4'>Issue Date</label>
              <DatePicker
                selected={new Date(formData.issueDate)}
                onChange={date => setFormData({...formData, issueDate: date})}
                className={formClass}
              />

              <label htmlFor="" className='mt-4'>Expiry Date</label>
              <DatePicker
                selected={new Date(formData.expiryDate)} // Convert to Date object
                onChange={date => setFormData({...formData, expiryDate: date})}
                className={formClass}
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
export default Passport;
