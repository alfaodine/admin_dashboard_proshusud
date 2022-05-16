import React from 'react'
import TextField from '@mui/material/TextField';
import { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../../context/FirebaseContext';



function RightDrawerTextField({item}) {

    const {setComment} = useContext(FirebaseContext)
    const [comment, getComment] = useState('')


    useEffect(() => {
        getComment(item.comment)
    },[])


  return (
    <TextField onInput={e => getComment(e.target.value)}
    style={{width: '100%'}} 
    onBlur={()=>{setComment(item.email, {comment})}}
    id="standard-helperText"
    label="Комментарий"
    value= {comment}
    helperText="Some important text"
    variant="standard"
    rows={4}
    multiline
  />
  )
}

export default RightDrawerTextField