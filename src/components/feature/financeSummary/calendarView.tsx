import { Box, Button, ButtonGroup, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import { UUID } from "crypto";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Income
import MoneyOffIcon from "@mui/icons-material/MoneyOff"; // Expense
import SavingsIcon from "@mui/icons-material/Savings";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

interface CalendarProps {
  id: any;
  date: number | null;
  income: number;
  expense: number;
  savings: number;
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get first & last day of the month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Day of week (0 = Sunday, 6 = Saturday)
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Create an array of days for the grid
  const calendarDays: CalendarProps[] = [];

  // Fill empty slots before the first day
  for (let i = 0; i < startDay; i++) {
    calendarDays.push({
      id: crypto.randomUUID(),
      date: null,
      income: 0,
      expense: 0,
      savings: 0,
    });
  }

  // Fill actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      id: crypto.randomUUID(),
      date: day,
      income: day == 1 ? 164000 : 0,
      expense: 5560,
      savings: 90000,
    });
  }

  // Handle month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={10}>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">
              {monthName}-{year}
            </Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={prevMonth}>Previous</Button>
              <Button onClick={nextMonth}>Next</Button>
            </ButtonGroup>
          </Box> */}
          <Box sx={{ display: "flex", mb: 2 }}>


            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
              // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
              // onChange={handleChange}
              >{MONTHS.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
              </Select>
            </FormControl>







            <Typography variant="h6">
              {monthName}-{year}
            </Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={prevMonth}>Previous</Button>
              <Button onClick={nextMonth}>Next</Button>
            </ButtonGroup>
          </Box>
          <Grid container spacing={0}>
            {DAYS.map((day) => (
              <Grid
                key={day}
                size={12 / 7}
                sx={{
                  height: "40px",
                  textAlign: "center",
                  fontWeight: "600",
                  border: "1px solid #999ca0ff",
                  backgroundColor: "#2d75cd",
                }}
              >
                <Typography sx={{ color: "white", fontWeight: "600" }}>
                  {day}
                </Typography>
              </Grid>
            ))}

            {calendarDays.map((day) => (
              <Grid
                key={day.id}
                size={12 / 7}
                sx={{
                  textAlign: "center",
                  minHeight: "80px",
                  backgroundColor: day.date === null ? "#f0f0f0" : "#ffffff",
                  border: "1px solid #999ca0ff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      alignItems: "center",
                      fontWeight: "600",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "50%",
                      width: "40px",
                      height: "30px",
                      mt: 1,
                      paddingTop: "5px",
                    }}
                  >
                    {day.date}
                  </Typography>
                </Box>
                {day.date != null ? (
                  <Box display="flex" justifyContent="space-around" mt={2}>
                    {day.income ? <Box textAlign="center" sx={{ display: "flex", flexDirection: "column" }}>
                      <AttachMoneyIcon sx={{ fontSize: 25, color: "green" }} />
                      <Typography variant="caption">₹{day.income}</Typography>
                    </Box> : <></>}

                    {/* Expense */}
                    <Box textAlign="center" sx={{ display: "flex", flexDirection: "column" }}>
                      <MoneyOffIcon sx={{ fontSize: 25, color: "red" }} />
                      <Typography variant="caption">
                        ₹{day.expense}
                      </Typography>
                    </Box>

                    {/* Saving */}
                    <Box textAlign="center" sx={{ display: "flex", flexDirection: "column" }}>
                      <SavingsIcon sx={{ fontSize: 25, color: "goldenrod" }} />
                      <Typography variant="caption">
                        ₹{day.savings}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={2}>
          <Typography variant="h6">Finance Summary Calendar</Typography>
          <Divider />
          <Box display="flex" flexDirection="row" sx={{ mt: 2 }}>
            <AttachMoneyIcon sx={{ fontSize: 25, color: "green" }} />:
            <Typography variant="subtitle1"> All type of incomes</Typography>
          </Box>

          <Box display="flex" flexDirection="row">
            <MoneyOffIcon sx={{ fontSize: 25, color: "red" }} />:
            <Typography variant="subtitle1">All type of expenses</Typography>
          </Box>

          <Box display="flex" flexDirection="row">
            <SavingsIcon sx={{ fontSize: 25, color: "goldenrod" }} /> :
            <Typography variant="subtitle1">All type of savings</Typography>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Monthly Report
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption">Income: Rs. 0.00</Typography>
            <Typography variant="caption">Saving: Rs. 110.00</Typography>
            <Typography variant="caption">Expense: Rs. 1110.00</Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Weekly Report
          </Typography>
          <Divider />
          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              1st Week (1-jan To 5-Jan)
            </Typography>
            <Typography variant="caption">Income: Rs. 0.00</Typography>
            <Typography variant="caption">Saving: Rs. 110.00</Typography>
            <Typography variant="caption">Expense: Rs. 1110.00</Typography>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              2nd Week (1-jan To 5-Jan)
            </Typography>
            <Typography variant="caption">Income: Rs. 0.00</Typography>
            <Typography variant="caption">Saving: Rs. 110.00</Typography>
            <Typography variant="caption">Expense: Rs. 1110.00</Typography>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              1st Week (1-jan To 5-Jan)
            </Typography>
            <Typography variant="caption">Income: Rs. 0.00</Typography>
            <Typography variant="caption">Saving: Rs. 110.00</Typography>
            <Typography variant="caption">Expense: Rs. 1110.00</Typography>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              3rd Week (1-jan To 5-Jan)
            </Typography>
            <Typography variant="caption">Income: Rs. 0.00</Typography>
            <Typography variant="caption">Saving: Rs. 110.00</Typography>
            <Typography variant="caption">Expense: Rs. 1110.00</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
