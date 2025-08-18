import { FormControl, TextField, MenuItem, Box, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { type } from "os";
import category from "../category";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function SearchReportForm() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [type, setType] = useState("");
  const [dateRangePreset, setDateRangePreset] = useState("");

  console.log("SearchReportForm page reloaded");

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Transaction From"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: {
                size: "small", // Makes the input smaller
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Transaction To"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <TextField
          select
          label="Date Range Preset"
          value={dateRangePreset}
          onChange={(e) => setDateRangePreset(e.target.value)}
          size="small"
        >
          <MenuItem value="week">Current Week</MenuItem>
          <MenuItem value="month">Current Month</MenuItem>
          <MenuItem value="year">Current Year</MenuItem>
          <MenuItem value="year">Custom Date</MenuItem>
        </TextField>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          size="small"
        >
          <MenuItem value="credit">Credit</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
          <MenuItem value="refund">Refund</MenuItem>
        </TextField>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
        >
          <MenuItem value="finance">Finance</MenuItem>
          <MenuItem value="marketing">Marketing</MenuItem>
          <MenuItem value="sales">Sales</MenuItem>
        </TextField>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          select
          label="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          size="small"
        >
          <MenuItem value="budget">Budget</MenuItem>
          <MenuItem value="expenses">Expenses</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </TextField>
      </FormControl>

      {/* Sticky Bottom Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button variant="outlined" fullWidth>
          Reset
        </Button>
        <Button variant="contained" fullWidth>
          Search
        </Button>
      </Box>
    </>
  );
}
