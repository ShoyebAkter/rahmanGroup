import React, { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";

function ProfileTable({ data, columns, setActiveTab, setSelectedProfile }) {
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
            <>
              <button
                onClick={() => handleDetails(row.values)}
                className="p-2 border-2 rounded-xl bg-gray-300 shadow-lg"
              >
                Explore
              </button>
            </>
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

  const handleDetails = (profile) => {
    const filteredData = data.filter((record) => {
      return record.id === profile.id;
    });

    setSelectedProfile(filteredData[0]);

    setActiveTab(2);
  };

  useEffect(() => {
    setPageSize(5);
  }, []);

  return (
    <>
      {/* On mobile */}
      {/* <div className='w-full md:hidden flex flex-col justify-center overflow-auto'> 
        {
          data.map(row => {
            return (
               <div className="w-full my-5 p-6 bg-black-gradient border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className='flex items-center justify-between'>
                    <p className='text-2xl font-bold py-2 '>
                      ID: {row.id}
                    </p>
                    <p className='text-lg py-2 mr-4'>
                      Percentage: {row.termId}
                    </p>
                  </div>

                  <div className='border-r-2 border-gray-300'>
                      <h5 className="mb-2 pt-2   text-lg font-semibold tracking-tight text-gray-300- dark:text-white">Reason for Loan ?</h5>
                      <p className="mb-5 font-normal text-gray-400">{row.loanFor}</p>
                      <p className='text-lg py-2'>
                        Borrowed: {row.amount.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })}
                      </p>
                      <p className='text-lg py-2 mb-2'>
                        Payback: {row.paybackAmount.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })}
                      </p>
                  </div>
                  <div 
                    className="inline-flex items-center text-blue-600 hover:underline p-2 cursor-pointer text-lg mb-3"
                    onClick={() => handleDetails(row)}
                  >
                      More Details
                      <svg className='w-5 ml-3' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z">
                        </path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                  </div>
                </div>
            )
          })
        }

      </div> */}

      {/* On desktop */}
      <div className="container mx-auto py-6 px-4 w-full">
        {/* Filter Section */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex-1 pr-4">
            <div className="relative md:w-1/3">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholderText="Search Profiles"
                className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              />
              <div className="absolute top-6 left-6 inline-flex items-center p-2">
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

        {/* Table Section */}
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
            {/* <span className="ml-3">
              Go to page:
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                className="w-10 border-2 bg-gray-300 rounded-md px-1 ml-1"
              />
            </span>
            <select
              value={pageSize}
              className="border-2 bg-gray-300 mx-1 px-1 py-[2px] rounded-lg"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25, 100].map((size) => (
                <option value={size} key={size}>
                  Show {size}
                </option>
              ))}
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTable;
