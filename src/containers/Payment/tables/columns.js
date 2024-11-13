export const COLUMNS = [
  {
    Header: "Identification No.",
    Footer: "Ref No",
    accessor: "paymentInit.Employee.idNo",
  },
  {
    Header: "Full Name",
    Footer: "firstName",
    accessor: row => `${row.paymentInit.Employee.firstName} ${row.paymentInit.Employee.lastName}`,
  },
  {
    Header: "Year",
    Footer: "",
    accessor: "paymentInit.year",
  },
  {
    Header: "Initial Amount",
    Footer: "",
    accessor: row => parseFloat(row.paymentInit.amount).toLocaleString(),
  },
  {
    Header: "Total Paid",
    Footer: "",
    accessor: row => parseFloat(row.totalPayments).toLocaleString(),
  },
  {
    Header: "Due Balance",
    Footer: "",
    accessor: row => parseFloat(row.balance).toLocaleString(),
  },
];
