// https://www.behance.net/gallery/65608331/Expense-Tracker-Dashboard-%28With-live-demo%29
"use client";
import ChartOnCategory from "@/components/common/chartBasedOnCategory";
import IncomeExpenseCard from "@/components/feature/incExpCard";
import SearchReportParams from "@/components/feature/searchReportBlock";
import TransactionList from "@/components/feature/transactionListReport";
import { Box, Button, Tooltip } from "@mui/material";

import Grid from "@mui/material/Grid";

export default function reportPage() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <SearchReportParams />
        </Grid>
        <Grid size={8}>
          <Box sx={{ mb: 1 }}>
            <IncomeExpenseCard />
          </Box>
          <ChartOnCategory />
        </Grid>
        <Grid size={4}>
          <Box>
            <TransactionList />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
