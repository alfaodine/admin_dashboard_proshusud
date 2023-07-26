import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import {
  getAllBookedDates,
  getBookedTimeByDate,
  setBookedTime as setBookedTimeRequest,
} from "../../../services/workDays.js";
import { DatePicker } from "@mui/x-date-pickers";

const BookTime = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [bookedTime, setBookedTime] = useState([]);
  const setFormattedDate = (year, month, date) => {
    const formattedMonth = (`0` + (month + 1).toString()).slice(-2);
    const formattedDate = (`0` + date.toString()).slice(-2);
    const res = `${year}/${formattedMonth}/${formattedDate}`;
    setCurrentDate(res);
  };

  useEffect(() => {
    getAllBookedDates();
  }, []);

  useEffect(() => {
    takeBookedTimeFromBackend();
  }, [currentDate]);

  const takeBookedTimeFromBackend = async () => {
    if (currentDate) {
      const bookedTimeResponse = await getBookedTimeByDate(currentDate);
      setBookedTime(bookedTimeResponse);
    }
  };
  const changeBookedTime = async (event, items) => {
    await setBookedTimeRequest(currentDate, items);
    await takeBookedTimeFromBackend();
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>
          <Typography
            sx={{
              fontSize: "1.5em",
              marginBottom: "20px",
            }}
          >
            Бронювання місць
          </Typography>
        </FormLabel>
        <DatePicker
          value={currentDate}
          onChange={(event, errorsObject) => {
            setFormattedDate(event.$y, event.$M, event.$D);
          }}
        />
        <ToggleButtonGroup
          value={bookedTime}
          sx={{
            marginBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
          onChange={(event, items) => changeBookedTime(event, items)}
        >
          {new Array(24).fill(0).map((_, i) => (
            <ToggleButton
              key={i}
              value={`${i}:00`}
              sx={{
                minWidth: "65px",
                border: "none",
              }}
            >
              {i}:00
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </FormControl>
    </Box>
  );
};

export default BookTime;
