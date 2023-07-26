import React from "react";
import WorkDays from "./WorkDays/WorkDays.jsx";
import Box from "@mui/material/Box";
import BookTime from "./BookTime/BookTime.jsx";

const Settings = () => {
  return (
    <Box>
      <WorkDays />
      <BookTime />
    </Box>
  );
};

export default Settings;
