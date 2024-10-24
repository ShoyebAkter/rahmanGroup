import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import swal from 'sweetalert';

function AddVisa({ profileInit, setProfileInit, isInfo7Open, setIsInfo7Open }) {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    employeeId: profileInit.id,
    viId: '',
    referenceNo: '',
    status: '',
    issueDate: new Date(), // Initialize issueDate with current date
    expiryDate: new Date(), // Initialize expiryDate with current date
  });

  const updateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${apiUrl}/employee/addVisa`, formData, {
      headers: {
        loginToken: localStorage.getItem('loginToken'),
      },
    })
    .then(result => {
      setLoading(false);
      if (result.data) {
        setProfileInit({
          ...profileInit,
          Visas: [
            ...profileInit.Visas,
            result.data,
          ],
        });
        swal({
          icon: 'success',
          title: 'Update',
          text: 'Visa is Added Successfully!',
          buttons: false,
          timer: '2000',
        });
        setIsInfo7Open(false);
      } else {
        swal({
          icon: 'error',
          title: 'Oops!',
          text: result.data.error,
        });
      }
    })
    .catch(err => {
      setLoading(false);
      swal({
        icon: 'error',
        title: 'Oops!',
        text: err.response.data.error,
      });
    });
  };

  return (
    <div className='text-black'>
      <div className={isInfo7Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden'} onClick={() => setIsInfo7Open(false)}></div>
      <div className={isInfo7Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'}>
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <form onSubmit={updateProfile}>
            <div className="p-4">
              <button className="float-right text-gray-500" onClick={() => setIsInfo7Open(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className='text-lg font-semibold p-2'>Add Visa</h2>
              <hr />
              <div className='p-2 flex flex-col'>
                <label htmlFor="">Visa ID.</label>
                <input type="text" value={formData.viId} required className="border-2 border-x-gray-500 p-1 rounded-md mb-3" 
                  onChange={e => setFormData({ ...formData, viId: e.target.value })} 
                />

                <label htmlFor="">Visa Reference No.</label>
                <input type="text" value={formData.referenceNo} required className="border-2 border-x-gray-500 p-1 rounded-md mb-3" 
                  onChange={e => setFormData({ ...formData, referenceNo: e.target.value })} 
                />

                <label htmlFor="">Status</label>
                <select type="text" 
                  value={formData.status} 
                  required 
                  className="border-2 border-x-gray-500 p-1 rounded-md" 
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
                  format="dd/mm/yyyy"
                  onChange={date => setFormData({ ...formData, issueDate: date })}
                  className="border-2 border-x-gray-500 p-1 rounded-md"
                />
                <label htmlFor="" className='mt-4'>Expiry Date</label>
                <DatePicker
                  selected={formData.expiryDate}
                  onChange={date => setFormData({ ...formData, expiryDate: date })}
                  className="border-2 border-x-gray-500 p-1 rounded-md"
                />
                <button type="submit" className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'>
                  {loading ? 'Submitting ...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVisa;
