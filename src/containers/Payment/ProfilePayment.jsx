import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Assuming you have a modal library like react-modal
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';

const ProfilePayment = ({ selectedProfile, key }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL
  const [paymentInits, setPaymentInits] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState({})
  const [payments, setPayments] = useState([])
  const [refresh, setRefresh] = useState(new Date())
  

  const formattedAmount = (value) => {
    // Check if value is defined and not null
    if (value !== undefined && value !== null) {
      // Remove commas from the input value
      const cleanValue = value.replace(/,/g, '');
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
  setFormData({})
  setIsModalOpen(true)
 }

 const recordPayment = () => {
  setPaymentFormData({})
  setIsModal2Open(true)
 }

  const [formData, setFormData] = useState({
    employeeId: selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id,
    id: '',
    year: '',
    amount: '',
  });

  const [paymentFormData, setPaymentFormData] = useState({
    employeeId: selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id,
    id: '',
    year: '',
    amount: '',
    paymentMode: '',
    dateOfPayment: '',
    referenceNumber: '',
  });

  useEffect(() => {
    setLoading(true)
    setSelected({})
    axios.get(`${apiUrl}/payment/getInitialPayment/${selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id}`, 
      {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }
    ).then(res => {
      setLoading(false)
      setPaymentInits(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }, [refresh])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePaymentInputChange = e => {
    const { name, value } = e.target;
    setPaymentFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePaymentDateChange = date => {
    setPaymentFormData(prevData => ({
      ...prevData,
      dateOfPayment: date
    }));
  };

  const deletePayment = id => {

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
      axios.delete(`${apiUrl}/payment/deletePayment/${id}`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        setRefresh(new Date())
        swal({
          icon: "success",
          title: "Success",
          text: "Record deleted"
        })
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }
  });
  }

  const deleteInitialPayment = id => {

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
      axios.delete(`${apiUrl}/payment/deleteInitialPayment/${id}`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        setRefresh(new Date())
        swal({
          icon: "success",
          title: "Success",
          text: "Record deleted"
        })
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }
  });
  }

  const editInit = data => {
    //alert(JSON.stringify(data))
    setFormData(data)

    setIsModalOpen(true);
  }

  const editPayments = data => {
    //alert(JSON.stringify(data))

    setPaymentFormData({...data, dateOfPayment: new Date(data.dateOfPayment)})

    setIsModal2Open(true);
  }

  const handleSelect = (year, amount) =>{
    setSelected({year, amount})
    setPayments([])
    axios.get(`${apiUrl}/payment/getPaymentsWithBalance/${selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id}/${year}`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      setPayments(res.data)
    }).catch(err => {
      if(err.response){
        console.log(err.response)
        setIsModalOpen(false)
      }else{
        swal({
          icon: "error",
          title: "Error",
          text: err.message
        })
        console.log(err)
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if(typeof formData.id === "number"){
      axios.put(`${apiUrl}/payment/editInitialPayment`, formData, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        if(res.data.status[0]){
          swal({
            title: "Updated!",
            icon: "success",
            text: "Initial Payment has been updated"
          })

          setRefresh(new Date())
        }else{
          swal({
            title: "Oops!",
            icon: "error",
            text: "Initial Payment has not been updated"
          })
        }
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }else{
      axios.post(`${apiUrl}/payment/addInitialPayment`, {
        employeeId: selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id,
        year: formData.year,
        amount: formData.amount,
      }, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        setPaymentInits( prev => [
          ...prev, res.data
        ])

        swal({
          title: "Success",
          text: "Record has been added successfully",
          icon: "success"
        })
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }
   

    setIsModalOpen(false);
  };

  const handlePaymentSubmit = e => {
    const updated = {...paymentFormData, year: selected.year, employeeId: selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id}
    e.preventDefault();
    
    if(typeof paymentFormData.id === "number"){
      axios.put(`${apiUrl}/payment/editPayment`, {
        updated
      }, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        setRefresh(new Date())

        if(res.data.status[0]){
          swal({
            title: "Updated!",
            text: "Record has been edited",
            icon: "success"
          })
        }
      
        setIsModal2Open(false)
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }else{
      axios.post(`${apiUrl}/payment/makePayment`, {
        ...paymentFormData, year: selected.year, employeeId: selectedProfile.emp ? selectedProfile.emp.id : selectedProfile.id
      }, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(res => {
        setRefresh(new Date())

        swal({
          title: "Success",
          text: "Record has been added successfully",
          icon: "success"
        })

        setIsModal2Open(false)
      }).catch(err => {
        if(err.response){
          swal({
            icon: "error",
            title: "Error",
            text: err.response.data.error
          })
        }else{
          swal({
            icon: "error",
            title: "Error",
            text: err.message
          })
          console.log(err)
        }
      })
    }
    //alert(JSON.stringify(updated))
      

    setIsModalOpen(false);
  };

  return (
    <div className='w-full h-full flex flex-col flex-1'>
      <div className='flex flex-wrap gap-3 items-center justify-between'>
        <div></div>
       
        <h2 className='text-[13pt] font-semibold'>Manage payments for {selectedProfile.emp ? selectedProfile.emp.firstName : selectedProfile.firstName}</h2>

        <div>
          
        </div>
      </div>
      <hr className='m-2' />

      <div className='flex flex-wrap mt-3 md:p-5 justify-evenly gap-y-10'>
        <div className='flex flex-col min-w-[275px]'>
          <div className='p-3 bg-gray-300'>
            <h4>~Initialized Payments~</h4>
          </div>
          <div className='p-2 flex items-center justify-end'>
            <button
              className='self-end p-2 bg-green-300 shadow-xl border-0 px-4 text-sm rounded-lg'
              onClick={() => setInitialize()}
            >
              Initialize
            </button>
          </div>

          {
            loading ? <p>Loading data ... </p>  :
              <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentInits.map(payment => (
                    <tr key={`${payment.year}-${payment.amount}`} className="hover:bg-gray-100">
                      <td className="border border-gray-800 px-4 py-2">{payment.year}</td>
                      <td className="border border-gray-800 px-4 py-2">{parseFloat(payment.amount).toLocaleString()}</td>
                      <td className="border border-gray-800 px-4 py-2 flex flex-wrap gap-2">
                        <button 
                          className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSelect(payment.year, payment.amount)}
                        >
                          Select
                        </button>
                        <button 
                          onClick={() => editInit(payment)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        {/*<button 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                          onClick={() => deleteInitialPayment(payment.id)}
                        >
                          Delete
                  </button>*/}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
         
        </div>
        
        {
          selected.year &&  
          <div className=' px-2 flex flex-col min-w-[275px]'>
            <div className='bg-orange-200 p-3 w-full'>
              Viewing payment history for {selected.year}
            </div>

            <div className='flex justify-between m-2 items-center w-full flex-row'>
              <div className='p-2'>
                <p className='font-bold'>
                  Balance: <span className='text-xl text-red-700'>{payments?.balance && parseFloat(payments?.balance).toLocaleString()}</span>
                </p>
              </div>
              <button
                onClick={() => recordPayment()} 
                className='p-3 rounded-lg text-sm bg-blue-300 shadow-2xl'
              >
                Record payment
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Payment Date</th>
                    <th className="px-4 py-2">Mode of Payment</th>
                    <th className="px-4 py-2">Reference No.</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.payments?.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-100">
                      <td className="border border-gray-800 px-4 py-2">{payment.dateOfPayment}</td>
                      <td className="border border-gray-800 px-4 py-2">{payment.paymentMode}</td>
                      <td className="border border-gray-800 px-4 py-2">{payment.referenceNumber}</td>
                      <td className="border border-gray-800 px-4 py-2">{parseFloat(payment.amount).toLocaleString()}</td>
                      <td className="border border-gray-800 px-4 py-2 flex flex-wrap gap-2">
                        <button 
                          onClick={() => editPayments(payment)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-sm rounded"
                        >
                          Edit
                        </button>
                        {/*<button 
                          className="bg-red-500 text-sm hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                          onClick={() => deletePayment(payment.id)}
                        >
                          Delete
                  </button>*/}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-gray-10 text-blue-600">
                    <td className='border border-gray-800 px-4 py-2 font-bold'></td>
                    <td className=''></td>
                    <td className="border border-gray-800 px-4 py-2 font-semibold">Total Paid:</td>
                    <td className="border border-gray-800 px-4 py-2 font-semibold">{parseFloat(payments?.totalPayments).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
       
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        contentLabel="Form Modal"
        ariaHideApp={false} // Disable accessibility warning
        style={{
            content: {
              width: '300px', // Set the width of the modal content
              margin: 'auto', // Center the modal horizontally
              // You can add more custom styles as needed
            }
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Initialize a Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter year"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              name="amount"
              value={formattedAmount(formData.amount)}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter amount"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </form>
      </Modal>

      {/* payment Form Modal */}
      <Modal
       isOpen={isModal2Open}
       contentLabel="Form Modal"
       ariaHideApp={false} // Disable accessibility warning
       style={{
           content: {
             width: '300px', // Set the width of the modal content
             margin: 'auto', // Center the modal horizontally
             // You can add more custom styles as needed
           }
       }}
     >
       <h2 className="text-lg font-semibold mb-4">Record Payment</h2>
       <form onSubmit={handlePaymentSubmit}>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Amount</label>
           <input
             type="text"
             name="amount"
             value={formattedAmount(paymentFormData.amount)}
             onChange={handlePaymentInputChange}
             className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             placeholder="Enter amount"
             required
           />
         </div>
         <div className="mb-4">
         <label className="block text-sm font-medium text-gray-700">Date of Payment</label>
         <DatePicker
           selected={paymentFormData.dateOfPayment}
           onChange={date => handlePaymentDateChange(date)}
           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
           placeholderText="Enter Date"
           required
         />
       </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Mode of Payment</label>
           <select
             name="paymentMode"
             value={paymentFormData.paymentMode}
             onChange={handlePaymentInputChange}
             className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             required
           >
            <option value=''>Select ...</option>
            <option value='Cash'>Cash</option>
            <option value="bank">Bank</option>
            <option value="Mobile Wallet">Mobile Wallet</option>
           </select>
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Reference Number</label>
           <input
             type="text"
             name="referenceNumber"
             value={paymentFormData.referenceNumber}
             onChange={handlePaymentInputChange}
             className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             placeholder="Enter Reference Number"
           />
         </div>
         <button
           type="submit"
           className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
         >
           Submit
         </button>
         <button
           type="button"
           onClick={() => setIsModal2Open(false)}
           className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md"
         >
           Cancel
         </button>
       </form>
      </Modal>
    </div>
  );
};

export default ProfilePayment;
