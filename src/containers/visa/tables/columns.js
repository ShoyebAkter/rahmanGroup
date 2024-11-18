export const COLUMNS = [
  {
    Header: "Identification No",
    Footer: "",
    accessor: "visa.viId",
  },
  {
    Header: "Reference No",
    Footer: "",
    accessor: "visa.referenceNo",
  },
  {
    Header: "Full Name", // Changed header to Full Name
    Footer: "firstName",
    accessor: row => `${row.visa.Employee.firstName} ${row.visa.Employee.lastName}`, // Custom accessor to combine first and last name
  },
  {
    Header: "Mobile",
    Footer: "",
    accessor: "visa.Employee.mobile",
  },
  {
    Header: "Visa Status", // Changed header to Full Name
    Footer: "",
    accessor: "visa.status"
  },
  {
    Header: "Agent",
    Footer: "",
    accessor: "visa.Employee.Agent.name",
  },
  {
    Header: "Expiry Date",
    Footer: "",
    accessor: "visa.expiryDate"
  },
  {
    Header: "Days until expiry",
    Footer: "passport",
    accessor: "daysUntilExpiry",
  },
];

