import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineFileExcel, AiOutlineFundView, AiOutlinePrinter } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../reactcontext/ReactContext';
import axios from 'axios';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
import html2pdf from 'html2pdf.js';
import logo from '../../../assets/logo.avif';
import PaymentTableInit from '../../Payment/tables/PaymentTableInit';
import ProfilePayment from '../../Payment/ProfilePayment';

const PaymentHistory = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [togglePreview, setTogglePreview] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState();
  const [fullName, setFullName] = useState('')
  const [idNo, setIdNo] = useState('')
  const [id, setId] = useState('')
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentInits, setPaymentInits] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState({})
  const [payments, setPayments] = useState([])
  const [refresh, setRefresh] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (year, amount) =>{
    selectProfile(idNo)
    setSelected({year, amount})
    axios.get(`${apiUrl}/payment/getPaymentsWithBalance/${id}/${year}`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      console.log(res.data)
      setPayments(res.data)
    }).catch(err => {
      if(err.response){
        console.log(err.response)
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

  useEffect(() => {
    axios.get(`${apiUrl}/employee/`, {
        headers: {
            loginToken: localStorage.getItem("loginToken")
        }
    }).then(res => {
        setData(res.data)
    }).catch(err => {
        console.log(err)
    });
  }, []);

  useEffect(() => {
    !loginInfo.login && navigate('/');
  }, [loginInfo]);


  const handleSelectedProfile = (id, firstName, lastName, idNo) => {
      setId(id)
      setIdNo(idNo)
      setFullName(firstName + " " + lastName)
      setLoading(true)
      setSelected({})
      axios.get(`${apiUrl}/payment/getInitialPayment/${id}`, 
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

  }


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const selectProfile = idNo => {
    const selected = data.filter( item => item.idNo === idNo);
    setSelectedProfile(selected[0]); // Select the first profile
  };

  const filteredData = data.filter(item =>
    item.idNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${item.firstName} ${item.lastName} ${item.Agent.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getReadableTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const readableTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return readableTimestamp;
  }

  const generateReport = (elementId) => {
    const element = document.getElementById(elementId);

    html2pdf(element, {
      margin: 2,
      filename: `Payment History-${getReadableTimestamp()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    });
  };

  return (
    <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link to={'/dashboard'} className='text-yellow-700'>
          Dashboard
        </Link>
        {' > '}
        <Link to={'/reports'} className='text-yellow-700'>
          Reports
        </Link>
        {' > '}
        Payment History
      </div>
      <div className='w-full flex items-center flex-col justify-center'>
        <div className='flex flex-wrap gap-3'>
          <div className="max-w-4xl mx-auto p-4">
            <input
              type="text"
              placeholder="Search..."   
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <table className="w-full border border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID No.</th>
                  <th className="border p-2">Full Name</th>
                  <th className="border p-2">Agent</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.idNo}</td> 
                    <td className="border p-2">{item.firstName + " " + item.lastName}</td>
                    <td className="border p-2">{item.Agent.name}</td>
                    <td className="border p-2">
                      <button 
                        className='p-2 bg-blue-500 text-white'
                        onClick={() => handleSelectedProfile(item.id, item.firstName, item.lastName, item.idNo)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            loading ? <p>Loading data ... </p>  :
              <div className="overflow-x-auto mt-2">
              <h1 className='py-3 text-lg font-bold'>Initialized Payments for {fullName}</h1>
              <table className="table-auto w-full border-collapse border border-gray-800 mt-4">
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
                          Payment History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
        
      </div>

      <div className='w-full flex justify-center mt-3 gap-2 p-2'>
       
          <>
            <button
              className='p-2 bg-yellow-400 gap-1 flex items-center justify-center text-[13pt] rounded-md shadow-lg font-light'
              onClick={() => generateReport('report-content')}
            >
              <AiOutlinePrinter fontSize={24} />
              Print PDF
            </button>
          </>
    
      </div>

      {
        <div id='report-content' className='flex flex-col w-full p-3 px-5'>
          <img src={logo} alt='Logo' className='self-center w-20' />
          <h1 className='text-[18pt] font-semibold self-center'>Rahman Group</h1>
          <h1 className='text-[14pt] self-center mt-2'>Report Listing- Payment History for {selectedProfile?.firstName} {selectedProfile?.lastName}</h1>
          <div className='flex flex-wrap justify-start w-full gap-10 mt-5'>
            <p className='italic'>
              Report Printed By : <span className='font-bold'>{loginInfo.userDetails.firstName + ' ' + loginInfo.userDetails.lastName}</span>
            </p>
            <p className='italic'>
              Printed On : <span className='font-bold'>{getReadableTimestamp()}</span>
            </p>
            <p className='italic'>
              Signature : <span className='font-bold'>______________</span>
            </p>
          </div>

          <div className='py-4 flex flex-wrap gap-7'>
                <p className='font-bold'>
                  For the year: <span className='text-xl'>{selected?.year}</span>
                </p>
                <p className='font-bold'>
                  Initialized Payment: <span className='text-xl text-green-700'>{parseFloat(selected?.amount).toLocaleString()}</span>
                </p>
                <p className='font-bold'>
                  Balance: <span className='text-xl text-red-700'>{payments?.balance && parseFloat(payments?.balance).toLocaleString()}</span>
                </p>
          </div>
          
          {selectedProfile && <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Payment Date</th>
                  <th className="px-4 py-2">Mode of Payment</th>
                  <th className="px-4 py-2">Reference No.</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.payments?.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-100">
                    <td className="border border-gray-800 px-4 py-2">{payment.dateOfPayment}</td>
                    <td className="border border-gray-800 px-4 py-2">{payment.paymentMode}</td>
                    <td className="border border-gray-800 px-4 py-2">{payment.referenceNumber}</td>
                    <td className="border border-gray-800 px-4 py-2">{parseFloat(payment.amount).toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="hover:bg-gray-100 text-blue-600">
                  <td className='border border-gray-800 px-4 py-2 font-bold'></td>
                  <td className=''></td>
                  <td className="border border-gray-800 px-4 py-2 font-semibold">Total Paid:</td>
                  <td className="border border-gray-800 px-4 py-2 font-semibold">{parseFloat(payments?.totalPayments).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        </div>
      }
    </div>
  );
};

export default PaymentHistory;
