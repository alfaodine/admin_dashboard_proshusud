import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import RightDrawerInfo from './tasks/RightDrawerInfo';

function RightDrawer( {item, children} ) {
    const [state, setState] = useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ right: open });
      };
    
      // const list = () => (
      //   <Box
      //     sx={{ width: 350 }}
      //     role="presentation"
      //     onClick={toggleDrawer('right', false)}
      //     onKeyDown={toggleDrawer('right', false)}
      //   >
      //     <List>
      //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      //         <ListItem key={text} disablePadding>
      //           <ListItemButton>
      //             <ListItemIcon>
      //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      //             </ListItemIcon>
      //             <ListItemText primary={text} />
      //           </ListItemButton>
      //         </ListItem>
      //       ))}
      //     </List>
      //     <Divider />
      //   </Box>
      // );
  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer('right', true)}>Подробнее</Button>
        {children}
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, pt: 10 }}>
          Данные пользователя
        </Typography>
          <Divider sx={{ width: 700 }}/>
          <RightDrawerInfo item = {item}/>
        </Drawer>
      </React.Fragment>
  </div>
  )
}

export default RightDrawer