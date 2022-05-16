import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';


const columns = [
    { field: 'lastName', 
    headerName: 'Last name', 
    width: 130,
    },
    { field: 'name', headerName: 'First name', width: 130 },
    {
      field: 'middleName',
      headerName: 'middleName',
      width: 130,
    },
    { field: 'email', 
      headerName: 'email', 
      width: 250, 
      renderCell: (params) => (
        <Link to={`/user?email=${params.value}`}>{params.value}</Link>
      )},
  ];
  

  

function TableForUsers() {

  const {myUsers} = useContext(FirebaseContext)

  const rows = myUsers;

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

export default TableForUsers