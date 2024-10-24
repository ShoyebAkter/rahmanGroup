import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineFundView, AiOutlinePrinter } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../reactcontext/ReactContext';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import logo from '../../../assets/logo.avif';
import { years } from '../../../data/options';

const Balances = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [togglePreview, setTogglePreview] = useState(false)
  const [payments, setPayments] = useState([])
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());


  useEffect(() => {

    !loginInfo.login && navigate("/")
    
  }, [loginInfo])

  useEffect(() => {

    axios.get(`${apiUrl}/payment/getAllPaymentsWithBalance`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        console.log()
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setPayments(res.data)
            setSelectedPayments(res.data.filter(val => val.paymentInit.year === new Date().getFullYear().toString()))
        }
        //console.log(res.data)
        setLoading(false)
    })
    .catch(err => {
        console.log(err)
       
        setLoading(false)
    })
  }, [])

  const handleYearChange = (event) => {
    const selectedYearValue = event.target.value;
    setSelectedYear(selectedYearValue)
    selectYear(selectedYearValue)
  };

  function selectYear(year){
    if(year === "All Years"){
      setSelectedPayments(payments);
    }else{
      setSelectedPayments(payments.filter(val => val.paymentInit.year === year));
    }
    
  }
  
  function getCurrentYear() {
    const currentDate = new Date();
    return String(currentDate.getFullYear());
  }

  useEffect(() => {
    !loginInfo.login && navigate('/');
  }, [loginInfo]);

    
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
      filename: `Balances-${getReadableTimestamp()}.pdf`,
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
        Balances
        </div>

        <div className='p-2 bg-dimWhite rounded-lg'>
        <label>Filter Year: </label>
        <select className='p-1 bg-gray-100' onChange={handleYearChange}>
          <option value={getCurrentYear}>{getCurrentYear()}</option>
          <option value="All Years">All Years</option>
          {
            years.map(val => 
              <option value={val}>{val}</option>
            )
          }
        </select>
        </div>
      
      <div className='w-full flex justify-center mt-5 gap-2 p-2'>
        <button 
            className='p-2 bg-green-400 flex items-center justify-center gap-1 text-[13pt] rounded-md shadow-lg font-light'
            onClick={() => setTogglePreview(!togglePreview)}
        >
          <AiOutlineFundView fontSize={24} />
          Preview
        </button>

        {
            togglePreview &&
            <>
                <button
                className='p-2 bg-yellow-400 gap-1 flex items-center justify-center text-[13pt] rounded-md shadow-lg font-light'
                onClick={() => generateReport('report-content')}
                >
                <AiOutlinePrinter fontSize={24} />
                Print PDF
                </button>
          
            </>
        }

      </div>


      {
        togglePreview &&  <div id='report-content' className='flex flex-col w-full p-5 px-5'>
        <img src={logo} alt='Logo' className='self-center w-20' />
        <h1 className='text-[18pt] font-semibold self-center'>Rahman Group</h1>
        <h1 className='text-[14pt] self-center mt-2'>Report Listing- Outstanding Balances for {selectedYear}</h1>
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
        <div className='w-full h-full overflow-auto'>
      <hr className='my-4'/>
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching data... Please wait</p> :
          selectedPayments.length === 0 && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{`there are no payments for ${selectedYear}`}</p>
              </div>              
            )
      }

      {
        selectedPayments.length > 0 &&  
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Identification No</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Year</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Initial Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total Paid</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Outstanding Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedPayments.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.paymentInit.Employee.idNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.paymentInit.Employee.firstName} {item.paymentInit.Employee.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.paymentInit.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parseFloat(item.paymentInit.amount).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parseFloat(item.totalPayments).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parseFloat(item.balance).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
      </div>
      }
     
    </div>
  );
};

export default Balances;
