import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const AddUser = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    roleId: '',
    status: true,
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = () => {
    // Validation logic goes here
    if (
      editedUser.firstName.trim() === '' || 
      editedUser.lastName.trim() === '' || 
      editedUser.mobile.trim() === '' || 
      editedUser.email.trim() === '' || 
      editedUser.roleId.trim() === '' ||
      editedUser.password.trim() === '' // Check if password is empty
    ) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Check if the password meets the minimum length requirement
    if (editedUser.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
  
    // If all fields are filled and password is valid, proceed with saving
    axios.post(`${apiUrl}/user/addUser`, 
      editedUser
    )
    .then(res => {
      
      if(res.data){
        swal({
          icon: "success",
          title: "Success",
          text: "Added successfully"
        })
      }
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
  };
  

  const onCancel = () => {
    // Cancel logic goes here
    setEditedUser({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      roleId: '',
      status: true,
      password: '',
    })
  };

  return (
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 py-4">Add User</h3>
              <div className="mt-2">
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                  <input type="text" id="firstName" name="firstName" value={editedUser.firstName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" value={editedUser.lastName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile:</label>
                  <input type="text" id="mobile" name="mobile" value={editedUser.mobile} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input type="email" id="email" name="email" value={editedUser.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                  <label htmlFor="roleId" className="block text-gray-700 text-sm font-bold mb-2">User Role</label>
                  <select id="roleId" name="roleId" value={editedUser.roleId} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Accountant</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input type="password" id="password" name="password" value={editedUser.password} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                  <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Login Status</label>
                  <select id="status" name="status" value={editedUser.status} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Save
          </button>
          <button onClick={onCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
