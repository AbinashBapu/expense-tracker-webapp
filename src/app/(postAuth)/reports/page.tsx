"use client";
import ExpenseCards from "@/components/feature/reports/expenseCards";
import { Box, Grid } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={7}>sadf</Grid>
        <Grid size={5}>
          <ExpenseCards />
        </Grid>
      </Grid>
    </Box>
  );
}
