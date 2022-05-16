import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';

const columns = [
    { field: 'date', headerName: 'date', width: 130 },
    { field: 'name', headerName: 'First name', width: 130 },
    { field: 'email', headerName: 'email', width: 250 },
    { field: 'amount', headerName: 'amount', width: 130 },
    { field: 'service', headerName: 'service', width: 130 },
    { field: 'status', headerName: 'status', width: 130 },
    { field: 'phone', headerName: 'phone', width: 130 },
    { field: 'id', headerName: 'id', width: 130 },
]

function TableForOrders() {

    const {myList} = useContext(FirebaseContext)
    const rows = myList;
    console.log(myList)


  return (
    <div style={{ height: 600, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
    />
  </div>
  )
}

export default TableForOrders