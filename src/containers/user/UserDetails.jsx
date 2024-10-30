import React, { useState } from 'react'
import EditUserModal from './EditUserModal';
import axios from 'axios';
import swal from 'sweetalert';
import EditPasswordModal from './EditPasswordModal';

const UserDetails = ({user, setActiveTab, setSelected}) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handlePasswordEdit = () => {
    setShowPasswordModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
  };

  const handleEdit = (editedUser) => {
    //alert(JSON.stringify(editedUser))
    axios.put(`${apiUrl}/user/editUser`, {
      id: editedUser.id,
      email: editedUser.LoginDetail.email,
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      mobile: editedUser.mobile,
      roleId: editedUser.LoginDetail.roleId,
      status: editedUser.LoginDetail.status,
    },{
      headers: {
        loginToken: localStorage.getItem('loginToken'),
      },
    })
    .then(res => {
      
      setSelected(editedUser)
      setShowModal(false);
      swal({
        icon: "success",
        title: "Success",
        text: "Record has been updated"
      })
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

  const onDelete = id => {
    swal({
      title: "Are you sure?",
      text: ("You want to delete this record?"),
      icon:'warning', //The right way
      dangerMode: "red" ,
      closeModal: false,
      buttons: ["No", "Yes"] //The right way to do it in Swal1
  })
  .then((isConfirm) => {
  
    if(isConfirm){
      axios.delete(`${apiUrl}/user/deleteUser/${id}`, {
        headers: {
          loginToken: localStorage.getItem('loginToken'),
        },
      })
      .then(res => {
        
        setActiveTab(1)
        
        swal({
          icon: "success",
          title: "Success",
          text: "Record has been Deleted"
        })
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
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
  {Object.keys(user).length === 0 ? (
    <div className="flex items-center justify-center">
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-lg transition duration-150"
        onClick={() => setActiveTab(1)}
      >
        Click here to explore a user
      </button>
    </div>
  ) : (
    <div className="bg-white border-t-4 border-blue-500 rounded-lg text-gray-800 p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* User Information */}
        <div className="flex-1">
          <p className="text-2xl font-bold mb-4 text-blue-700">User Details</p>
          <div className="text-lg space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {user.mobile}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.LoginDetail.email}
            </p>
            <p>
              <span className="font-semibold">User Role:</span> {user.LoginDetail.UserRole.roleName}
            </p>
            <p>
              <span className="font-semibold">Created At:</span> {new Date(user.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Updated At:</span> {new Date(user.updatedAt).toLocaleString()}
            </p>
            <p className={user.LoginDetail.status ? "text-green-600" : "text-red-600"}>
              <span className="font-semibold">Login Status:</span> {user.LoginDetail.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-6 lg:mt-0">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white font-semibold hover:bg-blue-700 py-2 px-4 rounded-md shadow-md transition duration-150"
          >
            Edit
          </button>

          <button
            onClick={handlePasswordEdit}
            className="bg-orange-500 text-white font-semibold hover:bg-orange-700 py-2 px-4 rounded-md shadow-md transition duration-150"
          >
            Reset Password
          </button>

          {user.LoginDetail.UserRole.roleName !== "admin" && (
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 text-white font-semibold hover:bg-red-700 py-2 px-4 rounded-md shadow-md transition duration-150"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )}

  {/* Modals */}
  {showModal && <EditUserModal user={user} onSave={handleEdit} onCancel={handleCancel} />}
  {showPasswordModal && <EditPasswordModal user={{ id: user.id }} onCancel={handlePasswordCancel} />}
</div>

  );

};

export default UserDetails
