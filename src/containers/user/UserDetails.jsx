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
      {
        Object.keys(user).length === 0 ? <div className='flex items-end justify-center'>
          <button className='px-4 py-2 rounded-md bg-slate-300' onClick={() => setActiveTab(1)}>Click me. To explore a user</button>
        </div> : 
        <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex justify-between md:flex-row flex-col">
          <div>
            <p className="font-bold">User Details</p>
            <p className="text-lg font-semibold mb-2">Name: {user.firstName} {user.lastName}</p>
            <p className="text-gray-600 mb-2">Mobile: {user.mobile}</p>
            <p className="text-gray-600 mb-2">Email: {user.LoginDetail.email}</p>
            <p className="text-gray-600 mb-2">User Role: {user.LoginDetail.UserRole.roleName}</p>
            <p className="text-gray-600 mb-2">Created At: {new Date(user.createdAt).toLocaleString()}</p>
            <p className="text-gray-600 mb-2">Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
            <p className={user.LoginDetail.status.toString() === "true" ? "text-green-600 mb-2" : "text-red-600 mb-2"}>
              Login Detail Status: {user.LoginDetail.status ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <button onClick={handleEditClick} className="bg-blue-500 md:text-lg text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>

            {
              <button onClick={handlePasswordEdit} className="bg-orange-500 md:text-lg text-sm hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-1">
              Reset Password
              </button>
            }

            {
              user.LoginDetail.UserRole.roleName !== "admin" && <button onClick={() => onDelete(user.id)} className="bg-red-500 md:text-lg text-sm hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-1">
              Delete
            </button>
            }
            
          </div>
        </div>
      </div>
      }
    
      {showModal && <EditUserModal user={user} onSave={handleEdit} onCancel={handleCancel} />}

      {showPasswordModal && <EditPasswordModal user={{id:user.id}} onCancel={handlePasswordCancel} />}
    </div>
  );

};

export default UserDetails
