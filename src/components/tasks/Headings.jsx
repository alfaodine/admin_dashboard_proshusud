import React from 'react'
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function Headings() {
  return (
    <Box
    sx={{
      width: "100%",
      height: '1.5em',
      bgcolor: "grey.50",
      borderRadius: 5,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    }}
  >
    <Typography className='tasks__header' variant="h6" gutterBottom component="div">
      Новая заявка
    </Typography>
    <Typography className='tasks__header' variant="h6" gutterBottom component="div">
      В обработке
    </Typography>
    <Typography className='tasks__header' variant="h6" gutterBottom component="div">
      Направленна клиенту
    </Typography>
  </Box>
  )
}

export default Headings