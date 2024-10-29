export const COLUMNS = [
  {
    Header: "Passport No",
    Footer: "passport",
    accessor: "emp.Passports[0].passportNo",
  },
  {
    Header: "ID No.",
    Footer: "",
    accessor: "emp.idNo",
  },
  {
    Header: "Full Name",
    Footer: "fullName",
    accessor: row => `${row.emp.firstName} ${row.emp.lastName}`,
  },
  {
    Header: "Status",
    Footer: "",
    accessor: "balance.status",
    Cell: ({ value }) => (
      <span style={{ 
        fontWeight:'bold' , 
        padding: 5,
        color: value === "Payment Completed" ? 'green' : value === "No Payments" ? "orange" : "red"
      }}>
        {value}
      </span>
    )
  },
  {
    disableFilters: true,
    Header: "Balance",
    Footer: "",
    accessor: row => parseFloat(row.balance.balance).toLocaleString(),
  },
];
