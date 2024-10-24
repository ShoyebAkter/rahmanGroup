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
      <div className='w-full flex flex-col justify-center overflow-auto h-full'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholderText={"Search ..."}/>
        <table {...getTableProps()} className="min-w-full text-left font-light h-full overflow-auto">
          <thead>
            {
              headerGroups.map(headerGroup =>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(col => 
                      <th {...col.getHeaderProps(col.getSortByToggleProps())} className='px-6 py-4'>
                        {col.render("Header")}
                        <span>
                          {col.isSorted ? (col.isSortedDesc ? ' ▼' : ' ▲') :''}
                        </span>
                        <div>
                          {
                            col.canFilter ? col.render('Filter') : null
                          }
                        </div>
                      </th>
                    )
                  }
                </tr> 
              )
            }  
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return  (
                  <tr 
                    {...row.getRowProps()}
                    className='border-b transition duration-300 ease-in-out hover:bg-gray-300'
                  >
                    {
                      row.cells.map(cell => 
                      <td {...cell.getCellProps} className='whitespace-nowrap px-6 py-4'>
                        {cell.render("Cell")}
                      </td>)
                    }
                    
                  </tr>
                )   
              })
            }
          </tbody>
        </table>

        <div className='gap-3'>
          Page{' '}
          <strong>
            {pageIndex + 1 } of {pageOptions.length}
          </strong>
          <span>
            {' | '} Go to page:{' '} 
            <input type="number" defaultValue={pageIndex + 1} onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
              gotoPage(pageNumber)
            }} className='w-10 border-2 bg-gray-300 rounded-md px-1'/>
          </span>
          <select value={pageSize} className="border-2 bg-gray-300 mx-1 px-1 py-[2px] rounded-lg"
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {
              [5,10,15,20,25,100].map(pageSize => (
                <option value={pageSize} key={pageSize}>
                  Show {pageSize}
                </option>
              ))
            }
          </select>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' << '}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Previous</button>
          <button onClick={() => nextPage()}  disabled={!canNextPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{' >> '}</button>
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
          maxHeight: '600px', // maximum height
          margin: 'auto', // center the modal horizontally
          overflow: 'auto', // make the content scrollable
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
