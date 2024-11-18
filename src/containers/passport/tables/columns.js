export const COLUMNS = [
  {
    Header: "Passport No",
    Footer: "Ref No",
    accessor: "passport.passportNo",
  },
  {
    Header: "Full Name", // Changed header to Full Name
    Footer: "firstName",
    accessor: row => `${row.passport.Employee.firstName} ${row.passport.Employee.lastName}`, // Custom accessor to combine first and last name
  },
  {
    Header: "Mobile", // Changed header to Full Name
    Footer: "",
    accessor: "passport.Employee.mobile"
  },
  {
    Header: "Agent",
    Footer: "",
    accessor: "passport.Employee.Agent.name",
  },
  {
    Header: "Expiry Date",
    Footer: "mobile",
    accessor: "passport.expiryDate",
  },
  {
    Header: "Days until expiry",
    Footer: "passport",
    accessor: "daysUntilExpiry",
  },
];

