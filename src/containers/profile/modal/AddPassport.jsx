import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import swal from 'sweetalert';

function AddPassport({ profileInit, setProfileInit, isInfo6Open, setIsInfo6Open }) {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    employeeId: profileInit.id,
    passportNo: '',
    issueDate: '', // Initialize issueDate with current date
    expiryDate: '', // Initialize expiryDate with current date
  });

  const updateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${apiUrl}/employee/addPassport`, formData, {
      headers: {
        loginToken: localStorage.getItem('loginToken'),
      },
    })
    .then(result => {
      setLoading(false);
      if (result.data) {
        setProfileInit({
          ...profileInit,
          Passports: [
            ...profileInit.Passports,
            result.data,
          ],
        });
        swal({
          icon: 'success',
          title: 'Update',
          text: 'Passport Info is Added Successfully!',
          buttons: false,
          timer: '2000',
        });
        setIsInfo6Open(false);
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
      <div className={isInfo6Open ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden'} onClick={() => setIsInfo6Open(false)}></div>
      <div className={isInfo6Open ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'}>
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <form onSubmit={updateProfile}>
            <div className="p-4">
              <button className="float-right text-gray-500" onClick={() => setIsInfo6Open(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className='text-lg font-semibold p-2'>Add Passport</h2>
              <hr />
              <div className='p-2 flex flex-col'>
                <label htmlFor="">Passport No.</label>
                <input type="text" value={formData.passportNo} required className="border-2 border-x-gray-500 p-1 rounded-md" onChange={e => setFormData({ ...formData, passportNo: e.target.value })} />
                <label htmlFor="" className='mt-4'>Issue Date</label>
                <DatePicker
                  name='issueDate'
                  selected={formData.issueDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setFormData({ ...formData, issueDate: date })}
                  className="border-2 border-x-gray-500 p-1 rounded-md"
                />
                <label htmlFor="" className='mt-4'>Expiry Date</label>
                <DatePicker
                  name='expiryDate'
                  dateFormat="dd/MM/yyyy"
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

export default AddPassport;
