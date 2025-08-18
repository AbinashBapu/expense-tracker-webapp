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
import SearchReportForm from "@/components/feature/report/searchReportForm";
import ReportStats from "@/components/feature/report/reportStats";

export default function ReportPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(100);

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

  console.log("Report page reloaded");

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

      <ReportStats
        incomeAmount={totalIncome}
        expenseAmount={totalExpense}
        savingsAmount={totalSaving}
        metadata={metadata}
      />

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
            <SearchReportForm />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
