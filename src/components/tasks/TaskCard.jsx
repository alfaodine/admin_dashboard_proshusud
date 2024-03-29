import React, { useRef } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import RightDrawer from '../RightDrawer';

import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';

import {useDrag, useDrop} from 'react-dnd'

function TaskCard({index, item, moveCard, changeBackendData}) {

  const {setDocInfo} = useContext(FirebaseContext);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'box',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {

      // console.log(item)
    },
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      changeBackendData(dragIndex, hoverIndex)

      return { sameColumn: true };
    }
  })


  const [, drag] = useDrag({
    type: 'box',
    item: () => {
      return { ...item, index }
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        if (dropResult.sameColumn === true) {
        } else if (dropResult.sameColumn === false) {
          console.log('sameCoulmn is ', dropResult.sameColumn)
          if (item) {
            setDocInfo(item.email, dropResult.name)
          }
        }
      }
    }
  });

  drag(drop(ref));

  return (
      <Card
        ref={ref}
        className = {'card' + (item.status === 'success' ? ' card__green' : '') + ((item.status === 'created' || item.status === 'processing') ? ' card__orange' : '') + ((item.status === 'failure' || item.status === 'reversed' || item.status === 'expired') ? ' card__red' : '') }
        sx={{ width: '80%', margin: 'auto', marginTop: '10px' }}
        data-handler-id={handlerId}
      >
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