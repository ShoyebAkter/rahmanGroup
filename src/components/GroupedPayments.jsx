import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDiagram from "./ChartDiagram";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d084c3', '#a4de6c', '#d0ed57'];
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  return (
    <div className="container mx-auto pt-10 bg-gray-100 overflow-auto">
      <h2 className="text-xl font-semibold mb-4 w-full p-2 text-center">
        Summary of Collected Payments
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#82ca9d" />
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedPayments;
