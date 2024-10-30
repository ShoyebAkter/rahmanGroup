import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";

const UserTableInit = ({ setActiveTab, setSelected }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUrl}/user`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${item.firstName} ${item.lastName} ${item.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const selectUser = (idNo) => {
    const selected = data.filter((item) => item.id === idNo);
    setSelected(selected[0]);
    setActiveTab(2); // Select the first profile
  };

  return (
    <div className="w-full p-2 flex flex-col gap-2 overflow-auto">
      <div>
        <h1 className="text-xl text-center">List of users</h1>
      </div>

      {loading ? (
        "Fetching data"
      ) : data.length > 0 ? (
        <div className=" p-4">
          {/* <input
            type="text"
            placeholder="Search..."   
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          /> */}
          <div className="overflow-x-auto w-full rounded-lg shadow-lg">
            <table className="min-w-full bg-white table-auto w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
                    Ref No.
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
                    Full Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
                    Mobile
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {item.firstName + " " + item.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {item.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <button
                        className=""
                        onClick={() => selectUser(item.id)}
                      >
                        <FaEye fontSize={28} color="green" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        "User not found"
      )}
    </div>
  );
};

export default UserTableInit;
