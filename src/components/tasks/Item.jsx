import React from 'react'
import Box from '@mui/material/Box';

import { useDrop } from 'react-dnd'

function Item(props) {
    const { sx, ...other } = props;

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'box',
      drop: () => ({ name: props.colomn }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
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