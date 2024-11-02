import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';
import Modal from 'react-modal';
import ProfilePayment from '../ProfilePayment';

function PaymentTable({ data, columns, allPayments}) {

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        Header: "Actions",
        Footer: "Actions",
        accessor: "actions",
        Cell: ({row}) => { return (
            <>
              <button 
                onClick={() => handleDetails(row.values)} 
                className="p-2 border-2 rounded-xl bg-gray-300 shadow-lg">
                  Payment History
              </button>
            </>
          )},
        disableFilters: true
      }
    ])
  }

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
  } = useTable({ columns, data, defaultColumn} , useFilters, useGlobalFilter, useSortBy, usePagination, tableHooks)

  const { globalFilter, pageIndex, pageSize } = state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDetails = (profile) => {
    
    const filData = allPayments.filter(item => item.paymentInit.Employee.idNo === profile["paymentInit.Employee.idNo"]);
    if (filData.length > 0) {
      setSelectedProfile(filData[0])
      setIsModalOpen(true);
    } else {
      alert("No data found for the selected profile.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
   

  useEffect(() => {
    setPageSize(5)
  }, [])

  return (

    <>
  
      {/* On desktop */}
      <div className="container mx-auto py-6 px-4 w-full">
  {/* Filter Section */}
  <div className="mb-4 flex justify-between items-center">
    <div className="flex-1 pr-4">
      <div className="relative md:w-1/3">
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          placeholderText="Search ..."
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
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="text-left bg-gray-100"
          >
            {headerGroup.headers.map(col => (
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
        {page.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-dashed border-t border-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out"
              key={row.id}
            >
              {row.cells.map(cell => (
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
      Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
    </span>
    <div className='flex gap-2'>
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
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          className="w-10 border-2 bg-gray-300 rounded-md px-1 ml-1"
        />
      </span>
      <select
        value={pageSize}
        className="border-2 bg-gray-300 mx-1 px-1 py-[2px] rounded-lg"
        onChange={e => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15, 20, 25, 100].map(size => (
          <option value={size} key={size}>
            Show {size}
          </option>
        ))}
      </select> */}
    </div>
  </div>
</div>


      {/* Modal */}
      <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Profile Details"
      ariaHideApp={false} // Disable accessibility warning
      className="modal"
      overlayClassName="modal-overlay"
      style={{
        content: {
          width: '100%', // set the width to 80% of the parent container
          height: '80%', // set the height to 80% of the parent container
          maxWidth: '85%', // maximum width
          maxHeight: '600px',

          backgroundColor: 'white',
          borderWidth: 2,
        }
      }}
    >
      <button className="modal-close-button" onClick={handleCloseModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className='p-4 text-xl w-full text-center font-bold '>Payment History</h2>
    
      <ProfilePayment selectedProfile={selectedProfile?.paymentInit.Employee} />
    
      <button className="modal-close-button" onClick={handleCloseModal}>
        
      </button>
    </Modal>
    

    </>
  )
}

export default PaymentTable;
