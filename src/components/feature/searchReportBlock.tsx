import React, { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from "dayjs";

interface SearchReportParamsProps {
  onSearch: (from: string | null, to: string | null) => void;
}
export default function SearchReportParams({
  onSearch,
}: SearchReportParamsProps) {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleSearch = () => {
    console.log("From Date:", fromDate ? fromDate : "Not selected");
    console.log(
      "To Date:",
      toDate ? dayjs(toDate).toISOString() : "Not selected"
    );
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        p: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mr: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box>
        <Tooltip title="Search">
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ mr: 1, p: 2 }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Tooltip>
        <Tooltip title="Clear Search Param">
          <Button variant="outlined" onClick={handleClear} sx={{ mr: 1, p: 2 }}>
            <ClearIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
