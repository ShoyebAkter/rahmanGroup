import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineFileExcel, AiOutlineFundView, AiOutlinePrinter } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../reactcontext/ReactContext';
import axios from 'axios';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
import html2pdf from 'html2pdf.js';
import logo from '../../../assets/logo.avif';

const AgentWithProfiles = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [togglePreview, setTogglePreview] = useState(false)
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [flattenedData, setFlattenedData] = useState([])
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState({
    text: "",
    value: "",
  });

  useEffect(() => {
    !loginInfo.login && navigate('/');
  }, [loginInfo]);

  
  useEffect(() => {
    axios.get(`${apiUrl}/agent`, {
        headers: {
            loginToken: localStorage.getItem("loginToken")
        }
    }).then(res => {
        setAgents(res.data)
    }).catch(err => {
        console.log(err)
    })
  }, [])

  const handleAgentChange = (event) => {
    const value = event.target.value;
    if (value !== "") { // Check if the selected value is not empty
        const text = event.target.selectedOptions[0].textContent; // Selecting the text content of the selected option
        setSelected({
            text: text,
            value
        })

        axios.get(`${apiUrl}/employee/getOnly/${value}`, {
            headers: {
            loginToken: localStorage.getItem("loginToken")
            }
        })
        .then(res => {
            setRecords(res.data)
            console.log(res.data)
            setFlattenedData(prev => {
                return res.data.map((item) => ({
                    passportNo: item.emp?.Passports[0]?.passportNo,
                    idNo: item.emp.idNo,
                    fullName: item.emp.firstName + " " + item.emp.lastName,
                    nationality: item.emp.nationality,
                    bloodGroup: item.emp.Health?.bloodGroup,
                    paymentStatus: item.balance.status,
                    balance: parseFloat(item.balance.balance).toLocaleString(),
                }));
              })
    
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      };


    }

    
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
      filename: `${selected.text} profile-${getReadableTimestamp()}.pdf`,
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
        Agent with Profiles
        </div>
        <div className='self-start animate-pulse pt-2'>
            <label>Agent</label>
            <select 
                className='p-2 bg-gray-500 text-white flex items-center justify-center gap-1 text-[12pt] rounded-md shadow-lg font-light'
                onChange={handleAgentChange}
            >
            
            <option value="">Select Agent</option>
            {
                !agents.error &&
                agents?.map(item => <option value={item.id}>{item.name}</option>)
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
                
                <CSVLink
                data={flattenedData}
                filename={`${selected.text} profiles-`+ getReadableTimestamp()}
                className='p-2 bg-gray-400 gap-1 flex items-center justify-center text-[13pt] rounded-md shadow-lg font-light'
                >
                <AiOutlineFileExcel fontSize={24} />
                Export CSV
                </CSVLink>
            </>
        }
        
       
      </div>


      {
        togglePreview &&  <div id='report-content' className='flex flex-col w-full p-5 px-5'>
        <img src={logo} alt='Logo' className='self-center w-20' />
        <h1 className='text-[18pt] font-semibold self-center'>Rahman Group</h1>
        <h1 className='text-[14pt] self-center mt-2'>Report Listing- {selected.text} Profiles</h1>
        <div className='flex flex-wrap justify-start w-full gap-10 mt-5'>
          <p className='italic'>
            Report Printed By : <span className='font-bold'>{loginInfo.userDetails.firstName + ' ' + loginInfo.userDetails.lastName}</span>
          </p>
          <p className='italic'>
            Printed On : <span className='font-bold'>{getReadableTimestamp()}</span>
          </p>
          <p className='italic'>
            Total Records : <span className='font-bold'>{records.length}</span>
          </p>
          <p className='italic'>
            Signature : <span className='font-bold'>______________</span>
          </p>
        </div>
        <div className='flex mt-5 flex-col gap-5'>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Passport No</th>
                    <th className="py-3 px-6 text-left">ID No</th>
                    <th className="py-3 px-6 text-left">Full Name</th>
                    <th className="py-3 px-6 text-left">Nationality</th>
                    <th className="py-3 px-6 text-left">Blood Group</th>
                    <th className="py-3 px-6 text-left">Payment Status</th>
                    <th className="py-3 px-6 text-left">Balance</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {flattenedData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.passportNo}</td>
                        <td className="py-3 px-6 text-left">{item.idNo}</td>
                        <td className="py-3 px-6 text-left">{item.fullName}</td>
                        <td className="py-3 px-6 text-left">{item.nationality}</td>
                        <td className="py-3 px-6 text-left">{item.bloodGroup}</td>
                        <td 
                            className={ item.paymentStatus === 'Incomplete Payment' ? 
                            `py-3 px-6 text-left text-red-400  font-bold`:
                             item.paymentStatus === "Payment Completed" ? "py-3 px-6 text-left text-green-500 font-bold" :
                             ""}
                        >
                            {item.paymentStatus}
                        </td>
                        <td className="py-3 px-6 text-left">{item.balance}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
      }
     
    </div>
  );
};

export default AgentWithProfiles;
