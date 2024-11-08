export const COLUMNS = [
  {
    Header: "Email",
    Footer: "",
    accessor: "email",
  },
  {
    Header: "ID No.",
    Footer: "",
    accessor: "idNo",
  },
  {
    Header: "Ref No",
    Footer: "Ref No",
    accessor: "id",
    disableFilters: true
  },
  {
    Header: "Full Name",
    Footer: "fullName",
    accessor: row => `${row.firstName} ${row.lastName}`,
  },
  {
    Header: "Nationality",
    Footer: "nationality",
    accessor: "nationality",
  },
  {
    Header: "Mobile",
    Footer: "",
    accessor: "mobile",
  },
  {
    Header: "Profile Status",
    Footer: "status",
    accessor: "status",
    Cell: ({value}) => value === "Active" ? 
      <p className="border-2 bg-green-600 text-center p-1 rounded-2xl border-green-300 text-white">Active</p> :
      <p className="border-2 bg-red-600 p-1 text-center rounded-2xl border-red-400 text-white">Inactive</p>
    //   Cell: ( ({value}) => value ? 'Distributed': 'Unallocated'),
    //   Filter: ({ column }) => {
    //   return (
    //     <select
    //       className="p-1 bg-gray-400"
    //       onChange={(e) => {
    //         column.setFilter(e.target.value);
    //       }}
    //     >
    //       <option value="">All</option>
    //       <option value="true">Distributed</option>
    //       <option value="false">Unallocated</option>
    //     </select>
    //   );
    // },
  },
];
