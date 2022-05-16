import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react';
import FirebaseContext from '../../context/FirebaseContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function ModalAddFile({email, urlArr}) {
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [bs64, setBs64] = useState('');
    const [url, setUrl] = useState('');
    const {uploadFileToStorage, setUserUrls} = useContext(FirebaseContext);
    const [count, setCount] = useState(0);
    

    useEffect(() => {
        if ((urlArr !== undefined) && (count > 0)){
            let updatedArray = [...urlArr, url]
            setUserUrls(email, {url: updatedArray})
            handleClose()
        }
        setCount(1)
    }, [url])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFileName('');
    }

const toBase64 = file => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{
        let bs64str = reader.result;
        let firstComma = bs64str.lastIndexOf(',');
        let base64RemoveDataURI = bs64str.substring(firstComma+1, bs64str.length-1);
        resolve(base64RemoveDataURI)
      } ;
      reader.onerror = error => reject(error);
  });
}

async function getBase64(file) {
    setBs64(await toBase64(file))
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">Добавить документ</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Загрузите файл
            </Typography>
            <Button
  variant="outlined"
  component="label"
  onChange={(event)=> { 
  setFileName(event.target.files[0].name);
  getBase64(event.target.files[0]);
}}
>
  Выбрать документ
  <input
    type="file"
    accept=".doc,.docx"
    hidden
  />
</Button>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {fileName}
              {fileName.length>0 && <Button onClick={() => uploadFileToStorage(bs64, fileName, setUrl)} variant="contained">Загрузить</Button>}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalAddFile