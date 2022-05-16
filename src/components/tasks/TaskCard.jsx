import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import RightDrawer from '../RightDrawer';

import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';

import { useDrag } from 'react-dnd'

function TaskCard({item}) {

  const {setDocInfo} = useContext(FirebaseContext)

  let item1 = item
  ///////////////

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: 'box',
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        setDocInfo(item1.email, dropResult.name)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  const border = isDragging ? 'solid 1px black' : null


  return (
      <Card ref={drag} className = {'card' + (item.status === 'success' ? ' card__green' : '') + ((item.status === 'created' || item.status === 'processing') ? ' card__orange' : '') + ((item.status === 'failure' || item.status === 'reversed' || item.status === 'expired') ? ' card__red' : '') } style={{ opacity, border }} sx={{ width: '80%', margin: 'auto', marginTop: '10px' }}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.service} {item.date}
        </Typography>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.phone}
        </Typography>
        {/* <Typography variant="body2">
            {item.text}
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>

        <RightDrawer item = {item}/>

      </CardActions>
    </Card>
  )
}

export default TaskCard