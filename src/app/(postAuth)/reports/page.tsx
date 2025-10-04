"use client";
import ExpenseCards from "@/components/feature/reports/expenseCards";
import { Box, Grid } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{lg:7,md:6}}>sadf</Grid>
        <Grid size={{lg:5,md:6}}>
          <ExpenseCards />
        </Grid>
      </Grid>
    </Box>
  );
}
