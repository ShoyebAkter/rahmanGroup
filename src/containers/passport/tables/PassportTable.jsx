import React, { useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';

function PassportTable({ data, columns }) {

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

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
  } = useTable({ columns, data, defaultColumn} , useFilters, useGlobalFilter, useSortBy, usePagination)

  const { globalFilter, pageIndex, pageSize } = state

  const handleDetails = profile => {

  } 

  useEffect(() => {
    setPageSize(5)
  }, [])

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
      <div className="w-full flex flex-col justify-center overflow-auto h-full bg-white shadow-lg rounded-lg p-4">
  {/* Filter Input */}
  <div className="mb-4">
    <GlobalFilter
      filter={globalFilter}
      setFilter={setGlobalFilter}
      placeholderText="Search Profiles"
      className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none text-gray-600"
    />
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table
      {...getTableProps()}
      className="min-w-full bg-white table-auto text-left font-light"
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            {headerGroup.headers.map(col => (
              <th
                {...col.getHeaderProps(col.getSortByToggleProps())}
                className="px-6 py-4 border-b border-gray-200 font-semibold text-left"
              >
                {col.render("Header")}
                <span>
                  {col.isSorted ? (col.isSortedDesc ? " ▼" : " ▲") : ""}
                </span>
                {/* <div>{col.canFilter ? col.render("Filter") : null}</div> */}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className="whitespace-nowrap px-6 py-4 text-gray-700"
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
  <div className="flex justify-between items-center mt-4">
    <span>
      Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
    </span>
    <div className="flex items-center gap-2">
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
      {/* <span>
        | Go to page:
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          className="ml-2 w-12 text-center border border-gray-300 rounded px-1 py-1"
        />
      </span>
      <select
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
        className="ml-2 border border-gray-300 rounded px-1 py-1"
      >
        {[5, 10, 15, 20, 25].map(size => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select> */}
    </div>
  </div>
</div>

    </>
  )
}

export default PassportTable;
