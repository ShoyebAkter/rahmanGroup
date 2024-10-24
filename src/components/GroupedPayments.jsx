import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartDiagram from './ChartDiagram';

const GroupedPayments = () => {
    const [payments, setPayments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        axios.get(`${apiUrl}/payment/getGroupedPayments`, {
            headers: {
                loginToken: localStorage.getItem("loginToken")
            }
        })
            .then(response => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch(error => {
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

    return (
        <div className="container mx-auto pt-10 overflow-auto">
            <h2 className="text-xl font-bold mb-4 w-full p-2 bg-slate-400 text-center">Summary of Collected Payments</h2>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Year</th>
                            {months.map(month => (
                                <th key={month} className="px-2 py-2">{month}</th>
                            ))}
                            <th className="px-4 py-2">Yearly Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(payments).map(year => (
                            <tr key={year}>
                                <td className="border px-4 py-2">{year}</td>
                                {months.map(month => (
                                    <td key={month} className="border px-4 py-2 text-sm">
                                        {payments[year].months[month] ? parseFloat(payments[year].months[month].total).toLocaleString() : '0.00'}
                                    </td>
                                ))}
                                <td className="border px-4 py-2 text-sm">
                                    {Object.values(payments[year].months).reduce((acc, { total }) => acc + parseFloat(total), 0).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupedPayments;
