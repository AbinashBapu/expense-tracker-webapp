"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function TransactionDateFilter() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [type, setType] = useState("");
  const [dateRangePreset, setDateRangePreset] = useState("");

  const handleSearch = () => {
    console.log("Transaction From:", dayjs(startDate).toISOString());
    console.log("Transaction To:", endDate?.format("YYYY-MM-DD"));
    console.log("Category:", category);
    console.log("Subcategory:", subcategory);
    console.log("Type:", type);
    console.log("Date Preset:", dateRangePreset);
    setDrawerOpen(false);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setCategory("");
    setSubcategory("");
    setType("");
    setDateRangePreset("");
  };

  // static card data
  // Dummy data — replace with your dynamic values
  const totalIncome = 12000;
  const totalExpense = 7500;
  const totalSaving = totalIncome - totalExpense;

  const metadata = {
    categories: 5,
    subcategories: 12,
    types: 3,
    parties: 8,
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          endIcon={<FilterAltIcon />}
          onClick={() => setDrawerOpen(true)}
          size="small"
        >
          Apply Filters
        </Button>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Total Income */}
          <Grid size={3}>
            <Card sx={{ bgcolor: "#e8f5e9", boxShadow: 2, borderRadius: 2 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <AttachMoneyIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Income
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    ₹{totalIncome.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Expense */}
          <Grid size={3}>
            <Card sx={{ bgcolor: "#ffebee", boxShadow: 2, borderRadius: 2 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <MoneyOffIcon color="error" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Expense
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    ₹{totalExpense.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Saving */}
          <Grid size={3}>
            <Card sx={{ bgcolor: "#e3f2fd", boxShadow: 2, borderRadius: 2 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <SavingsIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Saving
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ₹{totalSaving.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Records Summary */}
          <Grid size={3}>
            <Card sx={{ bgcolor: "#f3e5f5", boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <AssessmentIcon color="secondary" fontSize="large" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Records Summary
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2">
                    Categories: {metadata.categories}
                  </Typography>
                  <Typography variant="body2">
                    Subcategories: {metadata.subcategories}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">
                    Types: {metadata.types}
                  </Typography>
                  <Typography variant="body2">
                    Parties: {metadata.parties}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 320,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Scrollable Filter Fields */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

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
          </Box>

          {/* Sticky Bottom Buttons */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: 1,
            }}
          >
            <Button variant="outlined" fullWidth onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
