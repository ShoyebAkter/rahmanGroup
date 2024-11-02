import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Assuming you have a modal library like react-modal
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePayment = ({ selectedProfile, key }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [paymentInits, setPaymentInits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(new Date());

  const formattedAmount = (value) => {
    // Check if value is defined and not null
    if (value !== undefined && value !== null) {
      // Remove commas from the input value
      const cleanValue = value.replace(/,/g, "");
      // Parse the cleaned value as a float
      const parsedValue = parseFloat(cleanValue);
      // If parsing is successful and the value is not NaN, return formatted value
      if (!isNaN(parsedValue)) {
        return parsedValue.toLocaleString();
      }
    }
    // Otherwise, return the original input value
    return value;
  };

  const setInitialize = () => {
    setFormData({});
    setIsModalOpen(true);
  };

  const recordPayment = () => {
    setPaymentFormData({});
    setIsModal2Open(true);
  };

  const [formData, setFormData] = useState({
    employeeId: selectedProfile.emp
      ? selectedProfile.emp.id
      : selectedProfile.id,
    id: "",
    year: "",
    amount: "",
  });

  const [paymentFormData, setPaymentFormData] = useState({
    employeeId: selectedProfile.emp
      ? selectedProfile.emp.id
      : selectedProfile.id,
    id: "",
    year: "",
    amount: "",
    paymentMode: "",
    dateOfPayment: "",
    referenceNumber: "",
  });

  useEffect(() => {
    setLoading(true);
    setSelected({});
    axios
      .get(
        `${apiUrl}/payment/getInitialPayment/${
          selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id
        }`,
        {
          headers: {
            loginToken: localStorage.getItem("loginToken"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setPaymentInits(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentDateChange = (date) => {
    setPaymentFormData((prevData) => ({
      ...prevData,
      dateOfPayment: date,
    }));
  };

  const deletePayment = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      if (isConfirm) {
        axios
          .delete(`${apiUrl}/payment/deletePayment/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            setRefresh(new Date());
            swal({
              icon: "success",
              title: "Success",
              text: "Record deleted",
            });
          })
          .catch((err) => {
            if (err.response) {
              swal({
                icon: "error",
                title: "Error",
                text: err.response.data.error,
              });
            } else {
              swal({
                icon: "error",
                title: "Error",
                text: err.message,
              });
              console.log(err);
            }
          });
      }
    });
  };

  const deleteInitialPayment = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      if (isConfirm) {
        axios
          .delete(`${apiUrl}/payment/deleteInitialPayment/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            setRefresh(new Date());
            swal({
              icon: "success",
              title: "Success",
              text: "Record deleted",
            });
          })
          .catch((err) => {
            if (err.response) {
              swal({
                icon: "error",
                title: "Error",
                text: err.response.data.error,
              });
            } else {
              swal({
                icon: "error",
                title: "Error",
                text: err.message,
              });
              console.log(err);
            }
          });
      }
    });
  };

  const editInit = (data) => {
    //alert(JSON.stringify(data))
    setFormData(data);

    setIsModalOpen(true);
  };

  const editPayments = (data) => {
    //alert(JSON.stringify(data))

    setPaymentFormData({
      ...data,
      dateOfPayment: new Date(data.dateOfPayment),
    });

    setIsModal2Open(true);
  };

  const handleSelect = (year, amount) => {
    setSelected({ year, amount });
    setPayments([]);
    axios
      .get(
        `${apiUrl}/payment/getPaymentsWithBalance/${
          selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id
        }/${year}`,
        {
          headers: {
            loginToken: localStorage.getItem("loginToken"),
          },
        }
      )
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          setIsModalOpen(false);
        } else {
          swal({
            icon: "error",
            title: "Error",
            text: err.message,
          });
          console.log(err);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof formData.id === "number") {
      axios
        .put(`${apiUrl}/payment/editInitialPayment`, formData, {
          headers: {
            loginToken: localStorage.getItem("loginToken"),
          },
        })
        .then((res) => {
          if (res.data.status[0]) {
            swal({
              title: "Updated!",
              icon: "success",
              text: "Initial Payment has been updated",
            });

            setRefresh(new Date());
          } else {
            swal({
              title: "Oops!",
              icon: "error",
              text: "Initial Payment has not been updated",
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            swal({
              icon: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            swal({
              icon: "error",
              title: "Error",
              text: err.message,
            });
            console.log(err);
          }
        });
    } else {
      axios
        .post(
          `${apiUrl}/payment/addInitialPayment`,
          {
            employeeId: selectedProfile.emp
              ? selectedProfile.emp.id
              : selectedProfile.id,
            year: formData.year,
            amount: formData.amount,
          },
          {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          }
        )
        .then((res) => {
          setPaymentInits((prev) => [...prev, res.data]);

          swal({
            title: "Success",
            text: "Record has been added successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          if (err.response) {
            swal({
              icon: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            swal({
              icon: "error",
              title: "Error",
              text: err.message,
            });
            console.log(err);
          }
        });
    }

    setIsModalOpen(false);
  };

  const handlePaymentSubmit = (e) => {
    const updated = {
      ...paymentFormData,
      year: selected.year,
      employeeId: selectedProfile.emp
        ? selectedProfile.emp.id
        : selectedProfile.id,
    };
    e.preventDefault();

    if (typeof paymentFormData.id === "number") {
      axios
        .put(
          `${apiUrl}/payment/editPayment`,
          {
            updated,
          },
          {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          }
        )
        .then((res) => {
          setRefresh(new Date());

          if (res.data.status[0]) {
            swal({
              title: "Updated!",
              text: "Record has been edited",
              icon: "success",
            });
          }

          setIsModal2Open(false);
        })
        .catch((err) => {
          if (err.response) {
            swal({
              icon: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            swal({
              icon: "error",
              title: "Error",
              text: err.message,
            });
            console.log(err);
          }
        });
    } else {
      axios
        .post(
          `${apiUrl}/payment/makePayment`,
          {
            ...paymentFormData,
            year: selected.year,
            employeeId: selectedProfile.emp
              ? selectedProfile.emp.id
              : selectedProfile.id,
          },
          {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          }
        )
        .then((res) => {
          setRefresh(new Date());

          swal({
            title: "Success",
            text: "Record has been added successfully",
            icon: "success",
          });

          setIsModal2Open(false);
        })
        .catch((err) => {
          if (err.response) {
            swal({
              icon: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            swal({
              icon: "error",
              title: "Error",
              text: err.message,
            });
            console.log(err);
          }
        });
    }
    //alert(JSON.stringify(updated))

    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div></div>

        <h2 className="text-[13pt] font-semibold">
          Manage payments for{" "}
          {selectedProfile.emp
            ? selectedProfile.emp.firstName
            : selectedProfile.firstName}
        </h2>

        <div></div>
      </div>
      <hr className="m-2" />

      <div className="flex flex-wrap mt-3 md:p-5 justify-evenly gap-y-10">
        <div className="flex flex-col min-w-[275px]">
          <div className="p-3 bg-gray-300">
            <h4 className="text-center">Initialized Payments</h4>
          </div>
          <div className="p-2 flex items-center justify-end">
            <button
              className="self-end p-2 bg-green-600 text-white font-semibold shadow-xl border-0 px-4 text-sm rounded-lg"
              onClick={() => setInitialize()}
            >
              Initialize
            </button>
          </div>

          {loading ? (
            <p>Loading data ... </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-semibold">
                    <th className="px-6 py-4 border-b">Year</th>
                    <th className="px-6 py-4 border-b">Amount</th>
                    <th className="px-6 py-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentInits.map((payment) => (
                    <tr
                      key={`${payment.year}-${payment.amount}`}
                      className="hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 border-b text-center text-gray-800">
                        {payment.year}
                      </td>
                      <td className="px-6 py-4 border-b text-center text-gray-800">
                        {parseFloat(payment.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 border-b flex justify-center gap-2">
                        <button
                          className=""
                          title="Select"
                          onClick={() =>
                            handleSelect(payment.year, payment.amount)
                          }
                        >
                          <FaEye fontSize={28} color="green" />
                        </button>
                        <button
                          className=""
                          title="Edit"
                          onClick={() => editInit(payment)}
                        >
                          <MdEdit fontSize={28} color="green" />
                        </button>
                        {/* Uncomment if needed */}
                        {/* <button 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-full transition duration-150"
            title="Delete"
            onClick={() => deleteInitialPayment(payment.id)}
          >
            <span role="img" aria-label="delete">🗑️</span>
          </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected.year && (
          <div className="p-4 bg-white rounded-lg shadow-md w-[600px] ">
            <div className="bg-orange-200 p-4 rounded-t-lg text-gray-800 font-semibold">
              Viewing payment history for {selected.year}
            </div>

            <div className="flex justify-between m-3 items-center">
              <div>
                <p className="text-lg font-bold">
                  Balance:
                  <span className="text-xl text-red-700 ml-2">
                    {payments?.balance &&
                      parseFloat(payments?.balance).toLocaleString()}
                  </span>
                </p>
              </div>
              <button
                onClick={recordPayment}
                className="bg-green-600  text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
              >
                Record Payment
              </button>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 font-semibold">
                    <th className="px-4 py-3 border-b">Payment Date</th>
                    <th className="px-4 py-3 border-b">Mode of Payment</th>
                    <th className="px-4 py-3 border-b">Reference No.</th>
                    <th className="px-4 py-3 border-b">Amount</th>
                    <th className="px-4 py-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.payments?.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                        {payment.dateOfPayment}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                        {payment.paymentMode}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                        {payment.referenceNumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                        {parseFloat(payment.amount).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => editPayments(payment)}
                          className=""
                        >
                          <MdEdit fontSize={28} color="green" />
                        </button>
                        {/* Uncomment for delete action */}
                        {/* <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded-md text-sm transition duration-150"
                onClick={() => deletePayment(payment.id)}
              >
                Delete
              </button> */}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold text-gray-700">
                    <td
                      className="px-4 py-3 border border-gray-300"
                      colSpan="3"
                    >
                      Total Paid:
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-green-600 text-center">
                      {parseFloat(payments?.totalPayments).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 border border-gray-300"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        contentLabel="Form Modal"
        ariaHideApp={false} // Disable accessibility warning
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold text-center mb-4">
            Initialize a Payment
          </h2>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter year"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={formattedAmount(formData.amount)}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* payment Form Modal */}
      <Modal
        isOpen={isModal2Open}
        contentLabel="Form Modal"
        ariaHideApp={false} // Disable accessibility warning
      >
        <form
          onSubmit={handlePaymentSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Record Payment
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={formattedAmount(paymentFormData.amount)}
              onChange={handlePaymentInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Payment
            </label>
            <DatePicker
              selected={paymentFormData.dateOfPayment}
              onChange={(date) => handlePaymentDateChange(date)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholderText="Enter Date"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mode of Payment
            </label>
            <select
              name="paymentMode"
              value={paymentFormData.paymentMode}
              onChange={handlePaymentInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="">Select ...</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Mobile Wallet">Mobile Wallet</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference Number
            </label>
            <input
              type="text"
              name="referenceNumber"
              value={paymentFormData.referenceNumber}
              onChange={handlePaymentInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter Reference Number"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsModal2Open(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePayment;
