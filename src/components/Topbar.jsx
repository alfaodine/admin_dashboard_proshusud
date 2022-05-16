import React from 'react'
import { useState } from 'react';
// import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useContext } from 'react';
import FirebaseContext from '../context/FirebaseContext';



function Topbar({handleDrawerOpen, open, AppBar}) {

  const {signOutFromApp} = useContext(FirebaseContext)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} className="app-bar">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Proshu Sud
      </Typography>
      <div style={{flexGrow: 1}}>
      <Avatar onClick={handleMenu} style={{left: '95%', background: 'cadetblue'}}>A</Avatar>
      <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={signOutFromApp}>Выход</MenuItem>
              </Menu>
      </div>
    </Toolbar>
  </AppBar>
  )
}

export default Topbar