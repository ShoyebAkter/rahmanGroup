import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, ResponsiveContainer, Cell } from 'recharts';

const ChartDiagram = ({ agents }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28'];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  // Extracting agent names and number of employees
  const data = agents.map(agent => ({
    name: agent.name,
    employees: agent.Employees.length
  }));
  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return (
        <Rectangle
            x={x}
            y={y - 10} // Offset the bar 5 pixels above the X-axis
            width={width}
            height={height}
            fill={fill}
            radius={[10, 10, 10, 10]} // Optional: rounded corners
        />
    );
};
  return (
    <div className='w-full overflow-auto pt-10 container bg-white mx-auto flex gap-3 flex-col'>
      <h2 className='w-full text-xl p-2 text-center font-semibold'>Agents with their Profiles/Employees</h2>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 0, right: 30, left: 20, bottom: 10 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="employees" fill="#8884d8" 
         label={{ position: 'null', fill: '#FFFFFF' }} 
         shape={CustomBar} >
        
      </Bar>
        {/* <Bar dataKey="employees" fill="#8884d8" /> */}
      </BarChart>
      
    </div>
  );
};

export default ChartDiagram;
