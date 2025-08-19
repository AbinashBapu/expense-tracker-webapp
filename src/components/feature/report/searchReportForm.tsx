import { FormControl, TextField, MenuItem, Box, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ReportFilter } from "@/dto/SearchParamDto";

const DATE_RANGE_PRESETS = [
  { value: "currentWeek", label: "Current Week" },
  { value: "currentMonth", label: "Current Month" },
  { value: "currentYear", label: "Current Year" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "last30days", label: "Last 30 Days" },
  { value: "customDate", label: "Custom Date" },
];

interface SearchReportFormProps {
  closeDrawer: any;
  onSearch: (filter: ReportFilter) => void;
  filter: ReportFilter;
}

export default function SearchReportForm({
  closeDrawer,
  onSearch,
  filter,
}: SearchReportFormProps) {
  const [duration, setDuration] = useState<any>(filter.duration);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    filter.startDate ? dayjs(filter.startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    filter.endDate ? dayjs(filter.endDate) : null
  );

  // useEffect(() => {
  //   setDuration(filter.duration);
  //   switch (filter.duration) {
  //     case "currentWeek":
  //       setStartDate(dayjs().startOf("week"));
  //       setEndDate(dayjs().endOf("week"));
  //       break;
  //     case "currentMonth":
  //       setStartDate(dayjs().startOf("month"));
  //       setEndDate(dayjs().endOf("month"));
  //       break;
  //     case "currentYear":
  //       setStartDate(dayjs().startOf("year"));
  //       setEndDate(dayjs().endOf("year"));
  //       break;
  //     case "last7days":
  //       setStartDate(dayjs().subtract(7, "day"));
  //       setEndDate(dayjs());
  //       break;
  //     case "last30days":
  //       setStartDate(dayjs().subtract(30, "day"));
  //       setEndDate(dayjs());
  //       break;
  //     case "customDate":
  //       setStartDate(filter.startDate ? dayjs(filter.startDate) : null);
  //       setEndDate(filter.endDate ? dayjs(filter.endDate) : null);
  //       break;
  //     default:
  //       setStartDate(dayjs().startOf("week"));
  //       setEndDate(dayjs().endOf("week"));
  //       break;
  //   }
  // }, [filter]);

  const handleReset = () => {
    setDuration("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleSearch = () => {
    const newFilter: ReportFilter = {
      duration,
      startDate: startDate ? startDate?.toISOString() : null,
      endDate: endDate ? endDate?.toISOString() : null,
    };
    onSearch(newFilter);
    closeDrawer();
  };

  const handleOnChangeDuration = (value: any) => {
    setDuration(value);
    switch (value) {
      case "currentWeek":
        setStartDate(dayjs().startOf("week"));
        setEndDate(dayjs().endOf("week"));
        break;
      case "currentMonth":
        setStartDate(dayjs().startOf("month"));
        setEndDate(dayjs().endOf("month"));
        break;
      case "currentYear":
        setStartDate(dayjs().startOf("year"));
        setEndDate(dayjs().endOf("year"));
        break;
      case "last7days":
        setStartDate(dayjs().subtract(7, "day"));
        setEndDate(dayjs());
        break;
      case "last30days":
        setStartDate(dayjs().subtract(30, "day"));
        setEndDate(dayjs());
        break;
      case "customDate":
        setStartDate(startDate ? dayjs(startDate) : null);
        setEndDate(endDate ? dayjs(endDate) : null);
        break;
      default:
        setStartDate(dayjs().startOf("week"));
        setEndDate(dayjs().endOf("week"));
        break;
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          select
          label="Duration"
          value={duration}
          onChange={(e) => handleOnChangeDuration(e.target.value)}
          size="small"
        >
          {DATE_RANGE_PRESETS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      {duration === "customDate" && (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Transaction From"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
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
                minDate={startDate}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button variant="outlined" fullWidth onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" fullWidth onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </>
  );
}
