import React, { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import ColumnFilter from "../../supplier/tables/ColumnFilter";
import GlobalFilter from "../../supplier/tables/GlobalFilter";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function AgentTable({
  data,
  columns,
  setFormData,
  formData,
  openModal,
  handleDelete,
  dLoading,
}) {
  const navigate = useNavigate();

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        Header: "Actions",
        Footer: "Actions",
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <div className="flex flex-row items-center gap-[3px]">
              <button
                onClick={() => handleOtherDetails(row.values)}
                className="p-2 text-sm "
              >
                <FaEye fontSize={28} color="green"/>
              </button>
              <button onClick={() => handleDetails(row.values)} className="">
                <MdEdit fontSize={28} color="green"/>
              </button>
              {/* <button 
                onClick={() => deleteRecord(row.values)} 
                className="p-2 border-2 rounded-xl bg-red-300 shadow-lg">
                  { dLoading ? "Processing" : "Delete"}
        </button>*/}
            </div>
          );
        },
        disableFilters: true,
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const handleDetails = (data1) => {
    setFormData({
      ...formData,
      id: data1.id,
      name: data1.name,
      mobile: data1.mobile,
      email: data1.email,
    });
    openModal();
  };

  const deleteRecord = (data1) => {
    setFormData({
      ...formData,
      id: data1.id,
      name: data1.name,
      mobile: data1.mobile,
      email: data1.email,
    });
    handleDelete(data1.id);
  };

  const handleOtherDetails = (data1) => {
    const queryString = new URLSearchParams({
      agentData: JSON.stringify({ id: data1.id, name: data1.name }),
    }).toString();
    navigate(`/agentProfile?${queryString}`);
  };

  useEffect(() => {
    setPageSize(5);
  }, []);

  return (
    <>
      <div className="container mx-auto py-6 px-4 w-full">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex-1 pr-4">
            <div className="relative md:w-1/3">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholderText={"Search agents"}
                className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              />
              <div className="absolute top-6 left-6 inline-flex items-center p-2">
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
          <table
            {...getTableProps()}
            className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left bg-gray-100"
                >
                  {/* <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
              <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                <input type="checkbox" className="form-checkbox focus:outline-none focus:shadow-outline" />
              </label>
            </th> */}
                  {headerGroup.headers.map((col) => (
                    <th
                      {...col.getHeaderProps(col.getSortByToggleProps())}
                      className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                      key={col.id}
                    >
                      {col.render("Header")}
                      <span>
                        {col.isSorted ? (col.isSortedDesc ? " ▼" : " ▲") : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-dashed border-t border-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out"
                    key={row.id}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="whitespace-nowrap border-dashed border-t border-gray-200 px-6 py-4"
                        key={cell.column.id}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center py-4">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 disabled:bg-gray-100"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 disabled:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 disabled:bg-gray-100"
            >
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 disabled:bg-gray-100"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentTable;
