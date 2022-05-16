import React from 'react'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import RightDrawerTextField from '../tasks/RightDrawerTextField';
import UserFieldSelector from './UserFieldSelector';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "left",
    padding: 6,
    //   color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));

function UserOrder({orderInfo}) {
  return (
    <Grid container spacing={3}>
    <Grid item xs={4}>
      <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Дата
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.date}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={4}>

        <UserFieldSelector field={orderInfo.field} email={orderInfo.email}/>

    </Grid>
    <Grid item xs={4}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Услуга
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.service}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={4}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Email
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.email}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={4}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Телефон
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.phone}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={4}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Статус платежа
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.status}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={4}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          ID платежа
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.invoiceId}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={8}>
    <Item>
        <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
          Текст заявки
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {orderInfo.text}
        </Typography>
      </Item>
    </Grid>
    <Grid item xs={12}>
        <RightDrawerTextField item={orderInfo}/>
    </Grid>
    </Grid>
  )
}

export default UserOrder