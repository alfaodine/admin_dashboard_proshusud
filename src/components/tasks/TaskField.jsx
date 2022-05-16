import React from "react";
import { useContext, useEffect, useState } from 'react';
import { Box, dividerClasses } from "@mui/material";
import Item from "./Item";
import TaskCard from "./TaskCard";
import FirebaseContext from '../../context/FirebaseContext'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function TaskField() {


  const {myList} = useContext(FirebaseContext)

  const [orderList, setOrderList] = useState([]);
  
  useEffect(() => {
    setOrderList(myList)
  }, [myList]);

  

  return (
    <DndProvider backend={HTML5Backend}>
    <Box
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "grey.50",
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Item colomn = {'new'}><>  {orderList && orderList.map((item, index) =>  {
          return item.field === 'new' ? <TaskCard key={index} item={item} /> : null
        })}  </></Item>
      <Item colomn = {'panding'}><>  {orderList && orderList.map((item, index) =>  {
          return item.field === 'panding' ? <TaskCard key={index} item={item} /> : null
        })}  </></Item>
      <Item colomn = {'completed'}><>  {orderList && orderList.map((item, index) =>  {
          return item.field === 'completed' ? <TaskCard key={index} item={item} /> : null
        })}  </>
        </Item>


    </Box>
    </DndProvider>
  );
}

export default TaskField;
