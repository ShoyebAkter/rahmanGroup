import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

function Passport({
  profileInit,
  setProfileInit,
  isInfo5Open,
  setIsInfo5Open,
  index,
}) {
  const overlayClass = isInfo5Open
    ? "fixed inset-0 bg-gray-500 opacity-75 z-50"
    : "hidden";
  const modalClass = isInfo5Open
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const normalDate = profileInit?.Passports[index].expiryDate;
  const [formData, setFormData] = useState({
    id: profileInit?.Passports[index].id,
    passportNo: profileInit?.Passports[index].passportNo,
    issueDate: profileInit?.Passports[index].issueDate,
    expiryDate: normalDate, // Convert to Date object
  });

  const updateProfile = () => {
    setLoading(true);
    axios
      .put(`${apiUrl}/employee/updatePassport`, formData, {
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
            Passports: profileInit.Passports.map((passport, i) => {
              if (i === index) {
                return {
                  ...passport,
                  passportNo: formData.passportNo,
                  issueDate:
                    formData.issueDate instanceof Date
                      ? formData.issueDate.toISOString().split("T")[0]
                      : formData.issueDate,
                  expiryDate:
                    formData.expiryDate instanceof Date
                      ? formData.expiryDate.toISOString().split("T")[0]
                      : formData.expiryDate,
                };
              }
              return passport;
            }),
          });

          swal({
            icon: "success",
            title: "Update",
            text: "profile Info Updated Successfully!",
            buttons: false,
            timer: "2000",
          });

          setIsInfo5Open(false);
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
      <div className={overlayClass} onClick={() => setIsInfo5Open(false)}></div>

      <div className={modalClass}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden  w-1/3 mx-auto">
          <div className="p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsInfo5Open(false)}
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
              Passport Info
            </h2>
            <hr className="mb-6 border-gray-300" />

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passport No.
                </label>
                <input
                  type="text"
                  value={formData.passportNo}
                  onChange={(e) =>
                    setFormData({ ...formData, passportNo: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <DatePicker
                  selected={new Date(formData.issueDate)}
                  onChange={(date) =>
                    setFormData({ ...formData, issueDate: date })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <DatePicker
                  selected={new Date(formData.expiryDate)}
                  onChange={(date) =>
                    setFormData({ ...formData, expiryDate: date })
                  }
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                className="w-full mt-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
                onClick={() => updateProfile()}
                disabled={loading}
              >
                {loading ? "Updating ..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Passport;
