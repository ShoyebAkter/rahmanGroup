import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

function EditInfo3({
  profileInit,
  setProfileInit,
  isInfo3Open,
  setIsInfo3Open,
}) {
  const overlayClass = isInfo3Open
    ? "fixed inset-0 bg-gray-500 opacity-75 z-50"
    : "hidden";
  const modalClass = isInfo3Open
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    id: profileInit?.EmergencyContacts[0].id,
    fullName: profileInit?.EmergencyContacts[0].fullName,
    mobile: profileInit?.EmergencyContacts[0].mobile,
    telephone: profileInit.EmergencyContacts[0].telephone,
  });

  const updateProfile = () => {
    setLoading(true);
    axios
      .put(`${apiUrl}/employee/updateEmergencyContact`, formData, {
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
            EmergencyContacts: [
              {
                id: profileInit.EmergencyContacts[0].id, // Assuming you want to keep the same ID
                fullName: formData.fullName,
                mobile: formData.mobile,
                telephone: formData.telephone,
                // You may need to copy other properties as well, depending on your data structure
              },
            ],
          });

          swal({
            icon: "success",
            title: "Update",
            text: "profile Info Updated Successfully!",
            buttons: false,
            timer: "2000",
          });

          setIsInfo3Open(false);
        } else {
          swal({
            icon: "error",
            title: "Oops!",
            text: result.data.error,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        swal({
          icon: "error",
          title: "Oops!",
          text: err.response.data.error,
        });
      });
  };

  return (
    <div className="text-black">
      <div className={overlayClass} onClick={() => setIsInfo3Open(false)}></div>

      <div className={modalClass}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-1/3 mx-auto">
          <div className="p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsInfo3Open(false)}
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

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Emergency Contact Info
            </h2>
            <hr className="mb-6 border-gray-300" />

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telephone
                </label>
                <input
                  type="text"
                  value={formData.telephone}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                className="w-full mt-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
                onClick={() => updateProfile()}
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
export default EditInfo3;
