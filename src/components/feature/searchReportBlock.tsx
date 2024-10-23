import { Box, Button, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchReportParams() {
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
            <DatePicker label="From Date" />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mr: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="To Date" />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box>
        <Tooltip title="Search">
          <Button variant="contained" sx={{ mr: 1, p: 2 }}>
            {/* <SearchIcon /> */}
            Search
          </Button>
        </Tooltip>
        <Tooltip title="Clear Search Param">
          <Button variant="outlined" sx={{ mr: 1, p: 2 }}>
            <ClearIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
