import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';

function Visa({ profileInit, setProfileInit, isInfo8Open, setIsInfo8Open , index}) {
  const overlayClass = isInfo8Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isInfo8Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md mb-3";
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  const normalDate = profileInit?.Visas[index].expiryDate
  const [formData, setFormData] = useState({
    id: profileInit?.Visas[index].id,
    viId: profileInit?.Visas[index].viId,
    referenceNo: profileInit?.Visas[index].referenceNo,
    status: profileInit?.Visas[index].status,
    issueDate: new Date(profileInit?.Visas[index].issueDate),
    expiryDate: new Date(normalDate),
  })

  const updateProfile = () => {
    setLoading(true)
    axios.put(`${apiUrl}/employee/updateVisa`, formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.message){
          setProfileInit({
            ...profileInit,
            Visas: profileInit.Visas.map((visa, i) => {
              if (i === index) {
                return {
                  ...visa,
                  viId: formData.viId,
                  referenceNo: formData.referenceNo,
                  status: formData.status,
                  issueDate: formData.issueDate instanceof Date ? formData.issueDate.toISOString().split("T")[0] : formData.issueDate,
                  expiryDate: formData.expiryDate instanceof Date ? formData.expiryDate.toISOString().split("T")[0] : formData.expiryDate,
                };
              }
              return visa;
            }),
          });

                swal({
                    icon:"success",
                    title:"Update",
                    text:"profile Info Updated Successfully!",
                    buttons:false,
                    timer: "2000"
                })
                
                setIsInfo8Open(false)

            
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
        
      <div className={overlayClass} onClick={() => setIsInfo8Open(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsInfo8Open(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Visa Info</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Identification No.</label>
              <input type="text" value={formData.viId} className={formClass}
                onChange={e => setFormData({...formData, viId:e.target.value})} 
              />
              <label htmlFor="">Reference No.</label>
              <input type="text" value={formData.referenceNo} className={formClass}
                onChange={e => setFormData({...formData, referenceNo:e.target.value})} 
              />
              <label htmlFor="">Status</label>
              <select type="text" 
                value={formData.status} 
                required 
                className={formClass} 
                onChange={e => setFormData({ ...formData, status: e.target.value })} 
              >
                <option value="">Select ...</option>
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>

              <label htmlFor="" className='mt-4'>Issue Date</label>
              <DatePicker
                selected={formData.issueDate}
                onChange={date => setFormData({...formData, issueDate: date})}
                className={formClass}
              />

              <label htmlFor="" className='mt-4'>Expiry Date</label>
              <DatePicker
                selected={formData.expiryDate}
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
export default Visa;
