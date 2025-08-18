import { Box, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import Grid from "@mui/material/Grid";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReportStatsCard from "./reportStatsCard";
interface ReportStatsProps {
  incomeAmount: number;
  expenseAmount: number;
  savingsAmount: number;
  metadata: {
    categories: number;
    subcategories: number;
    types: number;
    parties: number;
  };
}

const ReportStats: FC<ReportStatsProps> = ({
  incomeAmount,
  expenseAmount,
  savingsAmount,
  metadata,
}) => {
  console.log("ReportStats page reloaded");

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <ReportStatsCard
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

        <Grid size={3}>
          <ReportStatsCard
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

        <Grid size={3}>
          <ReportStatsCard
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
                <Typography variant="body2">Types: {metadata.types}</Typography>

                <Typography variant="body2">
                  Parties: {metadata.parties}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportStats;
