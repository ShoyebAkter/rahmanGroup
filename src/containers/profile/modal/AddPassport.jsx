import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import swal from "sweetalert";

function AddPassport({
  profileInit,
  setProfileInit,
  isInfo6Open,
  setIsInfo6Open,
}) {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    employeeId: profileInit.id,
    passportNo: "",
    issueDate: "", // Initialize issueDate with current date
    expiryDate: "", // Initialize expiryDate with current date
  });

  const updateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${apiUrl}/employee/addPassport`, formData, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((result) => {
        setLoading(false);
        if (result.data) {
          setProfileInit({
            ...profileInit,
            Passports: [...profileInit.Passports, result.data],
          });
          swal({
            icon: "success",
            title: "Update",
            text: "Passport Info is Added Successfully!",
            buttons: false,
            timer: "2000",
          });
          setIsInfo6Open(false);
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
      <div
        className={
          isInfo6Open ? "fixed inset-0 bg-gray-500 opacity-75 z-50" : "hidden"
        }
        onClick={() => setIsInfo6Open(false)}
      ></div>
      <div
        className={
          isInfo6Open
            ? "fixed inset-0 flex items-center justify-center z-50"
            : "hidden"
        }
      >
        <div className="bg-white rounded-lg overflow-hidden  w-1/3">
          <form
            onSubmit={updateProfile}
            className="bg-white rounded-xl shadow-lg m-5 overflow-hidden"
          >
            <div className="p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsInfo6Open(false)}
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
                Add Passport
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
                    required
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
                    name="issueDate"
                    selected={formData.issueDate}
                    dateFormat="dd/MM/yyyy"
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
                    name="expiryDate"
                    dateFormat="dd/MM/yyyy"
                    selected={formData.expiryDate}
                    onChange={(date) =>
                      setFormData({ ...formData, expiryDate: date })
                    }
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? "Submitting ..." : "Submit"}
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
