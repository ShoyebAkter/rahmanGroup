import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDiagram from "./ChartDiagram";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const GroupedPayments = () => {
  const [payments, setPayments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    axios
      .get(`${apiUrl}/payment/getGroupedPayments`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(payments)
  const getPieData = (payments) => {
    return Object.keys(payments).map((year) => ({
      name: year,
      value: Object.values(payments[year].months).reduce(
        (acc, { total }) => acc + parseFloat(total),
        0
      ),
    }));
  };
  const pieData = getPieData(payments);
  
  return (
    <div className="container mx-auto pt-10 shadow-xl bg-white overflow-auto">
      <h2 className="text-xl font-semibold mb-4 w-full p-2 text-center">
        Summary of Collected Payments
      </h2>
      <BarChart width={500}
        height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}  data={pieData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Bar dataKey="value" fill="#8884d8" radius={[20, 20, 20, 20]} label={{ position: 'top' }} />
        </BarChart>
    </div>
  );
};

export default GroupedPayments;
