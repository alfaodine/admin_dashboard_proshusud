import React, {useCallback} from 'react';
import { useContext, useEffect, useState } from 'react';
import { Box } from "@mui/material";
import Item from "./Item";
import TaskCard from "./TaskCard";
import FirebaseContext from '../../context/FirebaseContext'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function TaskField() {


  const {myList} = useContext(FirebaseContext)

  const [newColumnData, setNewColumnData] = useState([]);
  const [pendingColumnData, setPendingColumnData] = useState([]);
  const [completeColumnData, setCompleteColumnData] = useState([]);


  const renderColumn = useCallback((item, index, setNewState) => {
    const moveFunction = (dragIndex, hoverIndex) => {
      setNewState((prevCards) => {
        const res = [...prevCards];
        [res[dragIndex], res[hoverIndex]] = [res[hoverIndex], res[dragIndex]]
        return res;
        },
      )
    }

    return (
      <TaskCard
        key={index}
        index={index}
        item={item}
        moveCard={moveFunction}
      />
    )
  }, [])
  
  useEffect(() => {
    setNewColumnData(myList.filter(item => item.field === 'new'))
    setPendingColumnData(myList.filter(item => item.field === 'panding'))
    setCompleteColumnData(myList.filter(item => item.field === 'completed'))
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
      <Item colomn = {'new'}>
        <>
          {newColumnData && newColumnData.map((item, index) => renderColumn(item, index, setNewColumnData))}
        </>
      </Item>
      <Item colomn = {'panding'}>
        <>
          {pendingColumnData && pendingColumnData.map((item, index) => renderColumn(item, index, setPendingColumnData))}
        </>
      </Item>
      <Item colomn = {'completed'}>
        <>
          {completeColumnData && completeColumnData.map((item, index) => renderColumn(item, index, setCompleteColumnData))}
        </>
      </Item>
    </Box>
    </DndProvider>
  );
}

export default TaskField;
