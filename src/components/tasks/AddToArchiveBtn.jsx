import React from 'react'
import Button from '@mui/material/Button';
import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';


function AddToArchiveBtn(email) {
    const {setDocInfo} = useContext(FirebaseContext)
    function archiveItem() {
        setDocInfo(email.email, 'archived')
    }




  return (
    <>
    <Button onClick={archiveItem} variant="outlined" color="error">
    В архив
  </Button>
  </>
  )
}

export default AddToArchiveBtn