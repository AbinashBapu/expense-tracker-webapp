"use client";
import ExpenseByParty from "@/components/feature/reports/expenseByParty";
import ExpenseCards from "@/components/feature/reports/expenseCards";
import { Box, Grid } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ExpenseCards />
        </Grid>
          <Grid size={3}>
            <ExpenseByParty/>
        </Grid>
      </Grid>
    </Box>
  );
}
