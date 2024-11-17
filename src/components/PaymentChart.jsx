import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const PaymentChart = () => {
    const apiUrl = process.env.REACT_APP_API_URL
    const [payments, setPayments] = useState([])
    
    useEffect(() => {

        axios.get(`${apiUrl}/payment/getAllPaymentsWithBalance`, {
            headers: {
              loginToken: localStorage.getItem("loginToken")
            }
        })
        .then(res => {
            console.log()
            if(res.data.error){
                console.log(res.data.error)
            }else{
                setPayments(res.data)
                // setSelectedPayments(res.data.filter(val => val.paymentInit.year === new Date().getFullYear().toString()))
            }
            //console.log(res.data)
            // setLoading(false)
        })
        .catch(err => {
            console.log(err)
           
            // setLoading(false)
        })
      }, [])

      const result = payments.map(item => ({
        year: item.paymentInit.year,
        totalPayments: item.totalPayments
      }));
      const result2 = payments.map(item => ({
        year: item.paymentInit.year,
        duePayments: item.balance
      }));
      
      console.log(result);
    //   console.log(payments)
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
      ];

      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload;
          if (data.totalPayments) {
            // Tooltip for the first pie chart
            return (
              <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                <p>{`Year: ${data.year}`}</p>
                <p>{`Total Payments: ${data.totalPayments}`}</p>
              </div>
            );
          } else if (data.duePayments) {
            // Tooltip for the second pie chart
            return (
              <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                <p>{`Year: ${data.year}`}</p>
                <p>{`Due Payments: ${data.duePayments}`}</p>
              </div>
            );
          }
        }
        return null;
      };
  return (
    <div className="container mx-auto pt-10 bg-white overflow-auto">
    <h2 className="text-xl font-semibold mb-4 w-full p-2 text-center">Payment & Due Payment Chart</h2>
    <PieChart width={600} height={400}>
          <Pie data={result2} dataKey="duePayments" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" />
          
          <Pie  data={result} dataKey="totalPayments" cx="50%" cy="50%" innerRadius={130} outerRadius={150} fill="#82ca9d" label />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      
    </div>
  )
}

export default PaymentChart
