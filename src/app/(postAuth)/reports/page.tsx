"use client";
import MultipleSeariesChart from "@/components/feature/multipleSeriesChart";
import ExpenseByCategory from "@/components/feature/reports/expenseByCategory";
import ExpenseByParty from "@/components/feature/reports/expenseByParty";
import ExpenseCards from "@/components/feature/reports/expenseCards";
import PortfolioAnalysisCards from "@/components/feature/reports/portfolioAnalysisCards";
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
          <PortfolioAnalysisCards/>
        </Grid>

        <Grid size={6}>
          <Box>
            <MultipleSeariesChart title="Income Vs Saving Vs Expense" />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box>
            <MultipleSeariesChart title="Portfolio Growth Analysis" />
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
