import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

function EditInfo1({ profileInit, setProfileInit, isOpen, setIsOpen }) {
  const overlayClass = isOpen
    ? "fixed inset-0 bg-gray-500 opacity-75 z-50"
    : "hidden";
  const modalClass = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    id: profileInit.id,
    firstName: profileInit.firstName,
    lastName: profileInit.lastName,
    DOB: profileInit.DOB,
    nationality: profileInit.nationality,
    mobile: profileInit.mobile,
    agent: profileInit.Agent.name,
    status: profileInit.status,
    email: profileInit.email,
    bloodGroup: profileInit?.Health?.bloodGroup,
    idNo: profileInit.idNo,
    agentId: profileInit.agentId,
  });
  // console.log(formData)

  const updateProfile = () => {
    setLoading(true);
    // console.log(formData)
    axios
      .put(`${apiUrl}/employee/updatePersonalInfo`, formData, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.data.message) {
          setProfileInit({
            ...profileInit,
            firstName: formData.firstName,
            lastName: formData.lastName,
            DOB: formData.DOB,
            mobile: formData.mobile,
            telephone: formData.telephone,
            status: formData.status,
            idNo: formData.idNo,
            bloodGroup:formData.bloodGroup,
            email: formData.email,
            agentId: formData.agentId,
          });

          swal({
            icon: "success",
            title: "Update",
            text: "Info Updated Successfully!",
            buttons: false,
            timer: "2000",
          });

          setIsOpen(false);
        } else {
          console.log(result);

          swal({
            icon: "error",
            title: "Oops!",
            text: result.data.error,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response) {
          swal({
            title: "Error",
            icon: "error",
            text: err.response.data.error,
          });
        } else {
          console.error(err);
        }
      });

      //for health 
      axios.put(`${apiUrl}/employee/updateHealthInfo`, {
        id: profileInit?.Health.id,
    bloodGroup: formData.bloodGroup,
      }, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(result => {
          setLoading(false)
          
       
        
      }).catch(err => {
        setLoading(false)
        swal({
          icon:"error",
          title:"Oops!",
          text:err.response.data.error,
        })
      })
  };

  return (
    <div className="text-black">
      <div className={overlayClass} onClick={() => setIsOpen(false)}></div>

      <div className={modalClass}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden  w-1/3 mx-auto">
          <div className="p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Update Personal Info
            </h2>
            <hr className="mb-6 border-gray-300" />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Identification No.
              </label>
              <input
                type="text"
                value={formData.idNo}
                onChange={(e) =>
                  setFormData({ ...formData, idNo: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                DOB
              </label>
              <input
                type="text"
                value={formData.DOB}
                onChange={(e) =>
                  setFormData({ ...formData, DOB: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <input
                type="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Agent Name
              </label>
              <input
                type="text"
                value={formData.agent}
                onChange={(e) =>
                  setFormData({ ...formData, agent: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                onClick={() => updateProfile()}
                className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
                  </svg>
                ) : null}
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditInfo1;
