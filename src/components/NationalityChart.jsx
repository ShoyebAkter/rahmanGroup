import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts'

const NationalityChart = () => {
    const apiUrl = process.env.REACT_APP_API_URL
  const [profiles, setProfiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
    useEffect(() => {

        axios.get(`${apiUrl}/employee`, {
            headers: {
              loginToken: localStorage.getItem("loginToken")
            }
        })
        .then(res => {
            if(res.data.error){
                setErrorMessage(res.data.error)
            }else{
                setProfiles(res.data)
            }
    
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
        })
      }, [])
      const result = Object.values(
        profiles.reduce((acc, { nationality }) => {
            // Initialize if nationality doesn't exist in accumulator
            if (!acc[nationality]) {
                acc[nationality] = { nationality, value: 0 };
            }
            // Increment the count for this nationality
            acc[nationality].value += 1;
            return acc;
        }, {})
    );
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    // console.log(result)
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
    <div>
      <BarChart width={500}
        height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}  data={result}>
        
        <XAxis dataKey="nationality" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Bar dataKey="value"  
           label={{ position: 'middle' }}
           shape={<CustomBar />}
            >
             {result.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
           </Bar>
        </BarChart>
    </div>
  )
}

export default NationalityChart
