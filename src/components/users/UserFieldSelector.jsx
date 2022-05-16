import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';

function UserFieldSelector({field, email}) {
    const {setDocInfo} = useContext(FirebaseContext)
    function handleChange( event ) {
        setDocInfo(email, event.target.value)
    }

  return (
    <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
    <InputLabel id="demo-simple-select-helper-label">{field}</InputLabel>
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={field}
      label={field}
      onChange={handleChange}
    >
      <MenuItem value={'new'}>Новая</MenuItem>
      <MenuItem value={'panding'}>В работе</MenuItem>
      <MenuItem value={'completed'}>Завершена</MenuItem>
      <MenuItem value={'archived'}>В архив</MenuItem>
    </Select>
  </FormControl>
  )
}

export default UserFieldSelector