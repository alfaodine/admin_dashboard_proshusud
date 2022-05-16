import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';

function ListOfItemsToDelete({index, item, urlArr, email}) {
    const regexp = /\/o\/(.+)\?alt=/
    let nameFromURL = regexp.exec(item);
    nameFromURL = decodeURI(nameFromURL[1]);
    const {setUserUrls, deleteFileFromStorage} = useContext(FirebaseContext);
  return (
    <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={()=>{
        urlArr.splice(index, 1)
        setUserUrls(email, {url: urlArr})
        deleteFileFromStorage(nameFromURL)
    }}>
        <DeleteIcon  />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={nameFromURL} />
  </ListItem>
  )
}

export default ListOfItemsToDelete