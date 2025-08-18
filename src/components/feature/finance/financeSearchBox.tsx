import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

export function FinanceSearchBox({
  onSearch,
  onClear,
  onAdd,
}: {
  onSearch: (date: string | null) => void;
  onClear: () => void;
  onAdd: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = () => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).toISOString()
      : null;
    onSearch(formattedDate);
  };
  const handleClear = () => {
    setSelectedDate(null);
    onClear();
  };

  const handleAddNew = () => {
    onAdd();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 2,
        mb: 3,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Transaction Date"
            value={selectedDate}
            onChange={(newValue: any) => setSelectedDate(newValue)}
            format="DD-MMM-YYYY"
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
              },
            }}
          />
        </LocalizationProvider>

        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        <Button
          onClick={handleClear}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<ClearIcon />}
        >
          Clear
        </Button>
      </Stack>

      <Button
        onClick={handleAddNew}
        variant="contained"
        color="success"
        size="small"
        startIcon={<AddIcon />}
        sx={{ whiteSpace: "nowrap" }}
      >
        Transaction
      </Button>
    </Box>
  );
}
