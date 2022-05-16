import React from 'react'
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ModalAddFile from './ModalAddFile';

function UserDocuments({urlArr, email}) {
    const regexp = /\/o\/(.+)\?alt=/
  return (
    <Stack sx={{mt: 5}} spacing={2}>
              <Typography variant="h5" display="block" gutterBottom>
              Документы
            </Typography>
            <Divider/>
    {(urlArr !== undefined) ? urlArr.map((item, index) =>{
        let nameFromURL = regexp.exec(item);
        nameFromURL = decodeURI(nameFromURL[1]);
      return(
        <Typography key={index} variant="subtitle1" display="block" gutterBottom>
        <a href={item}><DocumentScannerIcon fontSize="large"/> {nameFromURL || `documentName_${Date.now()}`}</a>
      </Typography>
      )
    }): <p>У пользователя пока нет документов</p>}
    <Stack direction="row">
    <ModalAddFile email={email} urlArr = {urlArr}/>
    {(urlArr !== undefined)&&<Button sx={{ml: 2}} variant="outlined" color="error">Удалить документ</Button>}
    </Stack>
    </Stack>
  )
}

export default UserDocuments