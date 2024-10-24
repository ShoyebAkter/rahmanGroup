export const COLUMNS = [
  {
    Header: "id",
    Footer: "id",
    accessor: "id",
  },
  {
    Header: "Agent Name",
    Footer: "",
    accessor: "name",
  },
  {
    Header: "Phone",
    Footer: "",
    accessor: "mobile",
  },
  {
    Header: "Email Address",
    Footer: "",
    accessor: "email",
  },
  {
    Header: "Profiles",
    Footer: "",
    accessor: "Employees.length",
    disableFilters: true, // Disable filtering for this column
  },
];
