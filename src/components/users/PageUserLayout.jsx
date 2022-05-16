import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material/styles";
import UserOrder from "./UserOrder";
import UserDocuments from "./UserDocuments";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  padding: 6,
  //   color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

function PageUserLayout({ userInfo, userOrders }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" display="block" gutterBottom>
              {`${userInfo.lastName} ${userInfo.name} ${userInfo.middleName}`}
            </Typography>

            <Divider style={{marginBottom: 20}}/>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Item>
            <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
              email
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {userInfo.email}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
        <Item>
            <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }} variant="caption" display="block" gutterBottom>
              Телефон
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {userInfo.phone}
            </Typography>
          </Item>
        </Grid>
      </Grid>


        {/* Links */}
      <UserDocuments urlArr={userInfo.url} email={userInfo.email}/>

      
      <Typography style={{marginTop: 30}} variant="h5" display="block" gutterBottom>
              Заказы
            </Typography>

            <Divider style={{marginBottom: 20}}/>

        {(userOrders.length > 0)?userOrders.map((item, index) => {
            return <UserOrder key={index} orderInfo = {item}/>
        }) :<Typography variant="subtitle1" display="block" gutterBottom>
              У этого пользователя пока нет заказов
            </Typography>}
    </Box>
  );
}

export default PageUserLayout;
