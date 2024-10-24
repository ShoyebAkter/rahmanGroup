import React, { useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import ColumnFilter from '../../supplier/tables/ColumnFilter';
import GlobalFilter from '../../supplier/tables/GlobalFilter';
import { useNavigate } from 'react-router-dom';

function AgentTable({ data, columns, setFormData, formData, openModal, handleDelete, dLoading }) {
  const navigate = useNavigate()

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
            <div className='flex flex-row items-center gap-[3px]'>
              <button 
                onClick={() => handleOtherDetails(row.values)} 
                className="p-2 text-sm border-1 rounded-xl bg-gray-300 shadow-lg">
                  Explore
              </button>
              <button 
                onClick={() => handleDetails(row.values)} 
                className="p-2 border-1 text-sm rounded-xl bg-blue-300 shadow-lg">
                  Edit
              </button>
             {/* <button 
                onClick={() => deleteRecord(row.values)} 
                className="p-2 border-2 rounded-xl bg-red-300 shadow-lg">
                  { dLoading ? "Processing" : "Delete"}
        </button>*/}
            </div>
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
  } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, useSortBy, usePagination, tableHooks)

  const { globalFilter, pageIndex, pageSize } = state

  const handleDetails = data1 => {
    setFormData({ ...formData , id: data1.id, name: data1.name, mobile: data1.mobile, email: data1.email})
    openModal()
  }

  const deleteRecord = data1 => {
    setFormData({ ...formData , id: data1.id, name: data1.name, mobile: data1.mobile, email: data1.email})
    handleDelete(data1.id)
  }

  const handleOtherDetails = data1 => {
    const queryString = new URLSearchParams({ agentData: JSON.stringify({id: data1.id, name:data1.name}) }).toString();
    navigate(`/agentProfile?${queryString}`);
  }

  useEffect(() => {
    setPageSize(5)
  }, [])

  return (

    <>
      <div className='w-full flex flex-col justify-center h-full'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholderText={"Search agents"} />
        <table {...getTableProps()} className="min-w-full text-left font-light h-full overflow-auto">
          <thead>
            {
              headerGroups.map(headerGroup =>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(col => (
                      <th {...col.getHeaderProps(col.getSortByToggleProps())} className='px-6 py-4' key={col.id}>
                        {col.render("Header")}
                        <span>
                          {col.isSorted ? (col.isSortedDesc ? ' ▼' : ' ▲') : ''}
                        </span>
                        <div>
                          {/* Conditionally render the filter based on column accessor */}
                          {col.id !== "id" && col.canFilter ? col.render('Filter') : null}
                        </div>
                      </th>
                    ))
                  }
                </tr>
              )
            }
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    className='border-b transition duration-300 ease-in-out hover:bg-gray-300'
                    key={row.id}
                  >
                    {
                      row.cells.map(cell => (
                        <td {...cell.getCellProps} className='whitespace-nowrap px-6 py-4' key={cell.column.id}>
                          {cell.render("Cell")}
                        </td>
                      ))
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
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          <span>
            {' | '} Go to page:{' '}
            <input type="number" defaultValue={pageIndex + 1} onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }} className='w-10 border-2 bg-gray-300 rounded-md px-1' />
          </span>
          <select value={pageSize} className="border-2 bg-gray-300 mx-1 px-1 py-[2px] rounded-lg"
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {
              [5, 10, 15, 20, 25].map(pageSize => (
                <option value={pageSize} key={pageSize}>
                  Show {pageSize}
                </option>
              ))
            }
          </select>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' << '}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{' >> '}</button>
        </div>
      </div>
    </>
  )
}

export default AgentTable;
