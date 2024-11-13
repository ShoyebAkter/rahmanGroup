import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import { LoginContext } from '../../../reactcontext/ReactContext'
import axios from 'axios'
import PaymentTable from './PaymentTable'
import { years } from '../../../data/options'

const PaymentTableInit = () => {
  
  const apiUrl = process.env.REACT_APP_API_URL
  const [payments, setPayments] = useState([])
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const columns = useMemo(() => COLUMNS, [])
  const [refresh, setRefresh] = useState(new Date())
  const [allPayments, setAllPayments] = useState([])


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
console.log(payments)
  const handleYearChange = (event) => {
    const selectedYearValue = event.target.value;
    setRefresh(new Date())
    selectYear(selectedYearValue)
  };

  function selectYear(year){
    if(year === "all"){
      setSelectedPayments(payments);
    }else{
      setSelectedPayments(payments.filter(val => val.paymentInit.year === year));
    }
    
  }
  
  function getCurrentYear() {
    const currentDate = new Date();
    return String(currentDate.getFullYear());
  }
    

  return (
    <div className='w-full h-full overflow-auto'>
 
      <div className='p-2 ml-6 rounded-lg'>
        <label>Filter Year: </label>
        <select className='p-1 bg-gray-100' onChange={handleYearChange}>
          <option value={getCurrentYear}>{getCurrentYear()}</option>
          <option value="all">All Years</option>
          {
            years.map(val => 
              <option value={val}>{val}</option>
            )
          }
        </select>
      </div>
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Fetching data... Please wait</p> :
          payments.length === 0 && (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{"there are no payments"}</p>
              </div>              
            )
      }

      {
        payments.length > 0 &&  
        <PaymentTable
          refresh={refresh}
          columns={columns} 
          data={selectedPayments} 
          allPayments={payments}
        />
      }
    </div>
  )
}

export default PaymentTableInit
