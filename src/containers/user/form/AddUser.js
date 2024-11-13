import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const AddUser = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    roleId: "",
    status: true,
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validation logic goes here
    if (
      editedUser.firstName.trim() === "" ||
      editedUser.lastName.trim() === "" ||
      editedUser.mobile.trim() === "" ||
      editedUser.email.trim() === "" ||
      editedUser.roleId.trim() === "" ||
      editedUser.password.trim() === "" // Check if password is empty
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if the password meets the minimum length requirement
    if (editedUser.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    console.log(editedUser)
    // If all fields are filled and password is valid, proceed with saving
    axios
      .post(`${apiUrl}/user/addUser`, editedUser)
      .then((res) => {
        if (res.data) {
          swal({
            icon: "success",
            title: "Success",
            text: "Added successfully",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          swal({
            title: "Error",
            icon: "error",
            text: err.response.data.error,
          });
        } else {
          console.log(err);
        }
      });
  };

  const onCancel = () => {
    // Cancel logic goes here
    setEditedUser({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      roleId: "",
      status: true,
      password: "",
    });
  };

  return (
    <div className="w-full mx-5">
      <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-10 md:grid-cols-2 mt-4 p-6 w-full bg-white rounded-lg shadow-md">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mobile"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Mobile:
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={editedUser.mobile}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="roleId"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    User Role
                  </label>
                  <select
                    id="roleId"
                    name="roleId"
                    value={editedUser.roleId}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Accountant</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Login Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={editedUser.status}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
                {/* Additional Fields */}
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={editedUser.address || ""}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={editedUser.dob || ""}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Gender:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={editedUser.gender || ""}
                    onChange={handleInputChange}
                    className="shadow-md border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
