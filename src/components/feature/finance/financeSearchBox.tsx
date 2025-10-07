import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { CategoryDto } from "@/dto/ClassificationDto";

export function FinanceSearchBox({
  categories,
  onSearch,
  onClear,
  onAdd,
  onAddTransction,
}: {
  categories: CategoryDto[];
  onSearch: (date: string | null, categoryId: string | null) => void;
  onClear: () => void;
  onAdd: () => void;
  onAddTransction: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).toISOString()
      : null;
    onSearch(formattedDate, selectedCategory);
  };
  const handleClear = () => {
    setSelectedDate(null);
    setSelectedCategory("");
    onClear();
  };

  const handleAddNew = () => {
    onAdd();
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        rowGap: 2,
        columnGap: 2,
        mb: 3,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        sx={{ flex: 1, minWidth: 0 }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Transaction Date"
            value={selectedDate}
            onChange={(newValue: any) => setSelectedDate(newValue)}
            format="DD-MMM-YYYY"
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>

        <FormControl size="small" variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {categories.map((category: CategoryDto) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

      <Box gap={2}>
        <Button
          onClick={onAddTransction}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap", mt: { xs: 2, sm: 0 }, mr: 2 }}
        >
          Log Transactions
        </Button>
        {/* <Button
          onClick={handleAddNew}
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap", mt: { xs: 2, sm: 0 } }}
        >
          Transaction
        </Button> */}
      </Box>
    </Box>
  );
}
