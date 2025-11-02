"use client";
import ExpenseByCategory from "@/components/feature/reports/expenseByCategory";
import ExpenseByParty from "@/components/feature/reports/expenseByParty";
import ExpenseCards from "@/components/feature/reports/expenseCards";
import IncomeExpenseSavingDistributionView from "@/components/feature/reports/incomeExpenseSavingDistributionView";
import IncomeSavingExpenseChart from "@/components/feature/reports/incomeSavingExpenseChart";
import PortfolioAnalysisCards from "@/components/feature/reports/portfolioAnalysisCards";
import PortfolioSavingChart from "@/components/feature/reports/portfolioSavingChart";
import { Box, Grid } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ExpenseCards />
        </Grid>
        <Grid size={4}>
          <ExpenseByParty />
        </Grid>
        <Grid size={4}>
          <ExpenseByCategory />
        </Grid>
        <Grid size={4}>
          <PortfolioAnalysisCards />
        </Grid>

        <Grid size={6}>
          <Box>
            <IncomeExpenseSavingDistributionView />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box>
            <IncomeSavingExpenseChart />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <PortfolioSavingChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
