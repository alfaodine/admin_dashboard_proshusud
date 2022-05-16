import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import RightDrawerTextField from "./RightDrawerTextField";

import MailIcon from "@mui/icons-material/Mail";
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import TextsmsTwoToneIcon from '@mui/icons-material/TextsmsTwoTone';
import AddToArchiveBtn from "./AddToArchiveBtn";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const itemStyle = {
  display: "grid",
  gridTemplateColumns: "15% 85%",
  textAlign: "left",
};



function RightDrawerInfo({item, fnAlert}) {


  return (
    <Box sx={{ width: "90%", margin: "10px auto" }}>
      <Stack spacing={2}>
        <Item style={itemStyle}>
          <BadgeTwoToneIcon /> {item.name}
        </Item>
        <Item style={itemStyle}>
          <LocalPhoneTwoToneIcon /> {item.phone}
        </Item>
        <Item
          style={itemStyle}
        >
          <MailIcon /> {item.email}
        </Item>
        <Item style={itemStyle}>
          <Grid3x3TwoToneIcon /> invoiceID: {item.id}
        </Item>
        <Item style={itemStyle}>
          <DateRangeTwoToneIcon /> {item.date}
        </Item>
        <Item style={itemStyle}>
          <TextsmsTwoToneIcon /> {item.text}
        </Item>

        <RightDrawerTextField item = {item}/>
        <AddToArchiveBtn email = {item.email}/>

      </Stack>
    </Box>
  );
}

export default RightDrawerInfo;
