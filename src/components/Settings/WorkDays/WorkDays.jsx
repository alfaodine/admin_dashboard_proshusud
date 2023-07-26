import React, { useEffect, useState } from "react";
import {
  changeWorkHours,
  getWorkingHours,
} from "../../../services/workDays.js";
import { WEEK_DAYS } from "../../../constants/date.js";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";

const WorkDays = () => {
  const [currentDay, setCurrentDay] = useState(WEEK_DAYS[0]);
  const [workHours, setWorkHours] = useState({});
  const [hourFrom, setHourFrom] = useState(0);
  const [hourTo, setHourTo] = useState(0);
  useEffect(() => {
    const loadWorkingHours = async () => {
      const res = await getWorkingHours();
      setWorkHours(res);
    };
    loadWorkingHours();
  }, []);

  useEffect(() => {
    if (workHours) {
      setHourFrom(workHours[currentDay + "From"]);
      setHourTo(workHours[currentDay + "To"]);
    }
  }, [currentDay, workHours]);

  const changeStartTime = (newTime) => {
    if (newTime !== null) {
      const tempWorkHours = { ...workHours };
      tempWorkHours[currentDay + "From"] = newTime;
      setWorkHours(tempWorkHours);
      changeWorkHours(tempWorkHours);
    }
  };

  const changeEndTime = (newTime) => {
    if (newTime !== null) {
      const tempWorkHours = { ...workHours };
      tempWorkHours[currentDay + "To"] = newTime;
      setWorkHours(tempWorkHours);
      changeWorkHours(tempWorkHours);
    }
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
            Зміна робочих годин
          </Typography>
        </FormLabel>
        <Select
          sx={{
            marginBottom: "10px",
          }}
          value={currentDay}
          onChange={(event) => {
            setCurrentDay(event.target.value);
          }}
        >
          {WEEK_DAYS.map((day, i) => (
            <MenuItem key={i} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
        <FormLabel>
          <Typography
            sx={{
              marginBottom: "5px",
            }}
          >
            Зміна часу початку робочого дня
          </Typography>
        </FormLabel>
        <ToggleButtonGroup
          value={hourFrom}
          sx={{
            marginBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
          exclusive
          onChange={(_, newAlignment) => changeStartTime(newAlignment)}
        >
          {new Array(24).fill(0).map((_, i) => (
            <ToggleButton
              key={i}
              value={i}
              sx={{
                minWidth: "65px",
                border: "none",
              }}
            >
              {i}:00
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <FormLabel>
          <Typography
            sx={{
              marginBottom: "5px",
            }}
          >
            Зміна часу кінця робочого дня
          </Typography>
        </FormLabel>
        <ToggleButtonGroup
          value={hourTo}
          exclusive
          onChange={(_, newAlignment) => changeEndTime(newAlignment)}
          sx={{
            marginBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {new Array(24).fill(0).map((_, i) => (
            <ToggleButton
              key={i}
              value={i}
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

      {/*{Object.keys(workHours).map((key, i) => (*/}
      {/*  <p key={i}>*/}
      {/*    {key} - {workHours[key]}*/}
      {/*  </p>*/}
      {/*))}*/}
    </Box>
  );
};

export default WorkDays;
