import React from 'react'
import Box from '@mui/material/Box';

import { useDrop } from 'react-dnd'

function Item(props) {
    const { sx, ...other } = props;

    const [{ canDrop, isOver, handlerId }, drop] = useDrop(() => ({
      accept: 'box',
      drop: (item) => {
        // if drop was in the same column this function returns undefined because another function works on it
        // Function that works on drop in the same column in file TaskCard useDrop -> drop.
        // But in this way main work in file TaskCard in function useDrop -> hover. There we create request that changes data on backend
        if (item.field === props.colomn) {
          console.log(item.field, props.colomn)
          return undefined;
        }
        console.log(item.field, props.colomn)
        return { sameColumn: false, name: props.colomn }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      })
    }))

  return (
<Box ref={drop}
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        ...sx,
      }}
      {...other}   
    />
  )
}

export default Item