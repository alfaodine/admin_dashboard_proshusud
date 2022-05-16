import React from "react";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SettingsApplicationsTwoToneIcon from "@mui/icons-material/SettingsApplicationsTwoTone";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

function MenuList({ open }) {
  const menuList = [
    { name: "Задачи", link: "/", icon: <AssignmentTwoToneIcon /> },
    { name: "Клиенты", link: "/clients", icon: <AccountCircleTwoToneIcon /> },
    { name: "Заказы", link: "/orders", icon: <ShoppingCartTwoToneIcon /> },
    {
      name: "Настройки",
      link: "/settings",
      icon: <SettingsApplicationsTwoToneIcon />,
    },
  ];
  return (
    <List>
      {menuList.map((item, index) => (
        <Link key={index} to={item.link}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
}

export default MenuList;
