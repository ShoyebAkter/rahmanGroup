import React, { useContext, useEffect, useState } from 'react'
import { Card, StatisticCard } from '../components'
import axios from 'axios';
import { LoginContext } from '../reactcontext/ReactContext';
import swal from 'sweetalert';
import GroupedPayments from '../components/GroupedPayments';
import ChartDiagram from '../components/ChartDiagram';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [loading, setLoading] = useState(true)
  const { loginInfo } = useContext(LoginContext)
  const [agents, setAgents] = useState([])
  const [expiredPassports, setExpiredPassports] = useState(0)
  const [passportsDue, setPassportsDue] = useState(0)
  const [expiredVisas, setExpiredVisas] = useState(0)
  const [visasDue, setVisasDue] = useState(0)
  const navigate = useNavigate()
  const [activeXInactive, setActiveXInactive] = useState({
    active: 0,
    inActive: 0,
  })

  useEffect(() => {
    if(!loginInfo.login){
        navigate('/')
    }
  }, [loginInfo])

  useEffect(() => {
    axios.get(`${apiUrl}/employee/getActiveAndInactive`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    })
    .then(res => { 
      setLoading(false)

      setActiveXInactive(
        {
          active: res.data.activeEmp,
          inActive: res.data.inActiveEmp,
        }
      )
    })
    .catch(err => {
      setLoading(false)
      swal({
        icon: 'error',
        timerProgressBar: true,
        button: false,
        title: 'Error !',
        text: JSON.stringify(err.response.data.error),
        timer: 3000,
      })
    })

    axios.get(`${apiUrl}/agent`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    })
    .then(res => { 
      setLoading(false)

      setAgents(
        Array.isArray(res.data) ? res.data : []
      );
    })
    .catch(err => {
      setLoading(false)
      swal({
        icon: 'error',
        timerProgressBar: true,
        button: false,
        title: 'Error !',
        text: JSON.stringify(err.response.data.error),
        timer: 3000,
      })
    })

    axios
      .get(`${apiUrl}/employee/passportExpired`, {
        headers: {
          loginToken: localStorage.getItem('loginToken'),
        },
      })
      .then((res) => {
        setExpiredPassports(res.data?.passports?.length);
        setLoading(false);
      })
      .catch((err) => {
        swal({
          title: 'Error',
          icon: 'error',
          text: JSON.stringify(err.message),
        });
        setLoading(false);
      });

      axios.get(`${apiUrl}/employee/passportExpire`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        console.log()
        setPassportsDue(res.data?.passports?.length)

        setLoading(false)
    })
    .catch(err => {
        console.log(err)
        swal({
            title: "Error",
            icon: "error",
            text: JSON.stringify(err.message)
        })
        setLoading(false)
    })

    axios
    .get(`${apiUrl}/employee/visaExpired`, {
      headers: {
        loginToken: localStorage.getItem('loginToken'),
      },
    })
    .then((res) => {
      setExpiredVisas(res.data?.visas?.length);
      setLoading(false);
    })
    .catch((err) => {
      swal({
        title: 'Error',
        icon: 'error',
        text: JSON.stringify(err.message),
      });
      setLoading(false);
    });

    axios.get(`${apiUrl}/employee/visaExpire`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
  })
  .then(res => {
      console.log()
      setVisasDue(res.data?.visas?.length)

      setLoading(false)
  })
  .catch(err => {
      console.log(err)
      swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(err.message)
      })
      setLoading(false)
  })
  }, [])

  return (
    <div className='w-full h-full rounded-lg m-1 gap-3 p-5 flex items-start flex-col shadow-md'>
      <h1 className='text-[18pt] font-light self-center'>Rahman Group Dashboard</h1>
      <hr className='w-full'/>
      
      <div className='flex flex-wrap justify-evenly w-full gap-3'>
        <Card title={"Profiles statistics"}>
          <Link to={'/profile'}>
          <StatisticCard name="Active profiles ~ " value={!loading && activeXInactive.active.length} />
          <StatisticCard name="Inactive profiles ~ " value={!loading && activeXInactive.inActive.length} />
          </Link>
        </Card>
        <Card title={"Passport statistics"}>
          <Link to={'/reports/Expired Passports'}><StatisticCard name="Expired Passports ~ " value={!loading && expiredPassports} /></Link>
          <Link to={'/passport_exp'}><StatisticCard name="Passports Due ~ " value={!loading && passportsDue} /></Link>
        </Card>
        <Card title={"Visa statistics"}>
          <Link to={'/reports/Expired Visas'}><StatisticCard name="Expired Visas ~ " value={!loading && expiredVisas} /></Link>
          <Link to={'/visa_exp'}><StatisticCard name="Visas Due ~ " value={!loading && visasDue} /></Link>
        </Card>
        
        <ChartDiagram agents={agents}/>

        <GroupedPayments />
     
        
      </div>
      
    </div>
  )
}

export default Dashboard
