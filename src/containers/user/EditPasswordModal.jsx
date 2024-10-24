import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const EditPasswordModal = ({ user, onSave, onCancel }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [editedUser, setEditedUser] = useState({
    id: user.id,
    password: '',
    passwordCopy: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = () => {
    // Validation logic
    if (
      editedUser.password.trim() === '' || 
      editedUser.passwordCopy.trim() === ''
    ) {
      alert('Please fill in both password fields.');
      return;
    }

    // Check if passwords match
    if (editedUser.password !== editedUser.passwordCopy) {
      alert('Passwords do not match.');
      return;
    }

    // Proceed with saving if everything is valid
    swal({
      title: "Are you sure?",
      text: ("You want to update the password?"),
      icon:'warning', //The right way
      dangerMode: "red" ,
      closeModal: false,
      buttons: ["No", "Yes"] //The right way to do it in Swal1
  })
  .then((isConfirm) => {
  
    if(isConfirm){
      axios.put(`${apiUrl}/user/editPassword`, editedUser, {
        headers: {
          loginToken: localStorage.getItem('loginToken'),
        },
      })
      .then(res => {
        console.log(res.data)
        swal({
          icon: "success",
          title: "Success",
          text: "Password has been Edited"
        })
        onCancel()
      }).catch(err => {
        if(err.response){
          swal({
              title: "Error",
              icon: "error",
              text: err.response.data.error
          })
        }else{
          console.log(err)
        }
      })
    }
  });
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
  
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 py-2">Update password</h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">New password:</label>
                    <input type="password" id="password" name="password" value={editedUser.password} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passwordCopy" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                    <input type="password" id="passwordCopy" name="passwordCopy" value={editedUser.passwordCopy} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Update
            </button>
            <button onClick={onCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordModal;
