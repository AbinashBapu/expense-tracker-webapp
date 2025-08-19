import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import Grid from "@mui/material/Grid";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReportStatsCard from "./reportStatsCard";
interface ReportStatsProps {
  isSummaryLoading: boolean;
  incomeAmount: number;
  expenseAmount: number;
  savingsAmount: number;
}

const ReportStats: FC<ReportStatsProps> = ({
  isSummaryLoading,
  incomeAmount,
  expenseAmount,
  savingsAmount,
}) => {
  console.log("ReportStats page reloaded");

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <ReportStatsCard
            isSummaryLoading={isSummaryLoading}
            amount={incomeAmount}
            title={"Total Income"}
            cardStyle={{
              bgcolor: "#dbeddb",
              boxShadow: 3,
              borderRadius: 3,
              p: 2,
            }}
          />
        </Grid>

        {/* Total Expense */}

        <Grid size={4}>
          <ReportStatsCard
            isSummaryLoading={isSummaryLoading}
            amount={expenseAmount}
            title={"Total Expense"}
            cardStyle={{
              bgcolor: "#ffebee",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
            }}
          />
        </Grid>

        {/* Total Saving */}

        <Grid size={4}>
          <ReportStatsCard
            isSummaryLoading={isSummaryLoading}
            amount={savingsAmount}
            title={" Total Saving"}
            cardStyle={{
              bgcolor: "#3f50b533",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportStats;
