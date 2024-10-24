import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartDiagram = ({ agents }) => {
  // Extracting agent names and number of employees
  const data = agents.map(agent => ({
    name: agent.name,
    employees: agent.Employees.length
  }));

  return (
    <div className='w-full overflow-auto mt-10 container mx-auto flex gap-3 flex-col'>
      <h2 className='w-full text-xl p-2 text-center bg-slate-300 font-semibold'>Agents with their Profiles/Employees</h2>
      <BarChart
        width={1080}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="employees" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ChartDiagram;
