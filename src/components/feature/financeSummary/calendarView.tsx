import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import { UUID } from "crypto";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Income
import MoneyOffIcon from "@mui/icons-material/MoneyOff"; // Expense
import SavingsIcon from "@mui/icons-material/Savings";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import { set } from "zod";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

interface CalendarProps {
  id: string;
  date: number | null;
  income: number;
  expense: number;
  saving: number;
}

const year = new Date().getFullYear();
const month = new Date().getMonth();

interface Summary {
  label: string;
  income: number;
  expense: number;
  saving: number;
  total: number;
  avgExp: number;
}

export default function CalendarView() {
  const { fetchDataBasedOnDist } = useReport();
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[month]);
  const [selectedYear, setSelectedYear] = useState(year);
  const [filter, setFilter] = useState({
    year: selectedYear,
    months: selectedMonth,
  });

  const last10Years: number[] = Array.from(
    { length: 10 },
    (_, i) => year - 9 + i
  );

  const prevMonth = () => {
    setSelectedMonth(MONTHS[month - 1]);
  };

  const nextMonth = () => {
    // setCurrentDate(new Date(year, month + 1, 1));
    setSelectedMonth(MONTHS[month + 1]);
  };

  // const monthName = currentDate.toLocaleString("default", { month: "long" });

  const {
    data: calendarDaysData,
    isLoading: isLoadingCalendar,
    error: errorCalendar,
    refetch: refetchCalendar,
    isFetching: isFetchingCalendar,
  } = useQuery({
    queryKey: ["fetchDataBasedOnDist", filter],
    queryFn: () => fetchDataBasedOnDist(filter),
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">
              {selectedMonth}-{selectedYear}
            </Typography>
            {/* <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={prevMonth}>Previous</Button>
              <Button onClick={nextMonth}>Next</Button>
            </ButtonGroup> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
                gap: 2,
              }}
            >
              <FormControl size="small">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Year"
                  size="small"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {last10Years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  label="Month"
                  size="small"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {MONTHS.map((m, index) => (
                    <MenuItem key={index} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setFilter({
                    year: selectedYear,
                    months: selectedMonth,
                  });
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>

          <Grid container spacing={0}>
            {!isLoadingCalendar &&
              DAYS.map((day) => (
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

            {!isLoadingCalendar &&
              calendarDaysData?.expenseDistro.map((day: CalendarProps) => (
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
                      {day.income ? (
                        <Box
                          textAlign="center"
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <AttachMoneyIcon
                            sx={{ fontSize: 25, color: "green" }}
                          />
                          <Typography variant="caption">
                            ₹{day.income}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}

                      {day.expense ? (
                        <Box
                          textAlign="center"
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <MoneyOffIcon sx={{ fontSize: 25, color: "red" }} />
                          <Typography variant="caption">
                            ₹{day.expense}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}

                      {day.saving ? (
                        <Box
                          textAlign="center"
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <SavingsIcon
                            sx={{ fontSize: 25, color: "goldenrod" }}
                          />
                          <Typography variant="caption">
                            ₹{day.saving}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  ) : (
                    <></>
                  )}
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid size={2}>
          <Card>
            {" "}
            <CardContent>
              <Typography variant="h6">Finance Summary Calendar</Typography>
              <Divider />
              <Box display="flex" flexDirection="row" sx={{ mt: 2 }}>
                <AttachMoneyIcon sx={{ fontSize: 25, color: "#077197ff" }} />:
                <Typography variant="subtitle1">
                  {" "}
                  All type of incomes
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <MoneyOffIcon sx={{ fontSize: 25, color: "#851a1a" }} />:
                <Typography variant="subtitle1">
                  All type of expenses
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <SavingsIcon sx={{ fontSize: 25, color: "#0000ffbd" }} /> :
                <Typography variant="subtitle1">All type of savings</Typography>
              </Box>

              <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Monthly Report
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {!isLoadingCalendar &&
                  calendarDaysData.monthlySummary.map((ms: Summary) => (
                    <Box display="flex" flexDirection="column" key={ms.label}>
                      {/* <Typography variant="subtitle1">{ms.label}</Typography> */}
                      <Typography variant="caption">
                        Income:{" "}
                        <span style={{ color: "#077197ff", fontWeight: "600" }}>
                          ₹{Number(ms.income).toFixed(2)}
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Saving:
                        <span style={{ color: "#0000ffbd", fontWeight: "600" }}>
                          ₹{Number(ms.saving).toFixed(2)}
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Expense:
                        <span style={{ color: "#851a1a", fontWeight: "600" }}>
                          ₹{Number(ms.expense).toFixed(2)}
                        </span>{" "}
                        @{" "}
                        <span style={{ color: "#851a1a", fontWeight: "600" }}>
                          ₹{Number(ms.avgExp).toFixed(2)} /day
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Total (Expense + Saving):
                        <span style={{ color: "#3a6f0bff", fontWeight: "600" }}>
                          ₹{Number(ms.total).toFixed(2)}
                        </span>
                      </Typography>
                    </Box>
                  ))}
              </Box>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Weekly Report
              </Typography>
              <Divider />

              {!isLoadingCalendar &&
                calendarDaysData.weeklySummary
                  .filter(
                    (ws: Summary) =>
                      ws.income > 0 || ws.expense > 0 || ws.saving > 0
                  )
                  .map((weekSummary: Summary) => (
                    <Box
                      display="flex"
                      flexDirection="column"
                      sx={{ mt: 2 }}
                      key={weekSummary.label}
                    >
                      <Typography variant="subtitle1">
                        {weekSummary.label}
                      </Typography>
                      <Typography variant="caption">
                        Income:
                        <span style={{ color: "#077197ff", fontWeight: "600" }}>
                          ₹{Number(weekSummary.income).toFixed(2)}
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Saving:
                        <span style={{ color: "#0000ffbd", fontWeight: "600" }}>
                          {" "}
                          ₹{Number(weekSummary.saving).toFixed(2)}
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Expense:
                        <span style={{ color: "#851a1a", fontWeight: "600" }}>
                          ₹{Number(weekSummary.expense).toFixed(2)}
                        </span>
                      </Typography>
                      <Typography variant="caption">
                        Total (Expense + Saving): ₹
                        <span style={{ color: "#3a6f0bff", fontWeight: "600" }}>
                          {Number(weekSummary.total).toFixed(2)}
                        </span>
                      </Typography>
                    </Box>
                  ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
