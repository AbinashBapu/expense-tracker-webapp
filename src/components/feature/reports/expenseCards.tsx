import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import * as React from "react";

import OverviewCard from "./overviewCard";
export default function ExpenseCards() {
  const investments = [
    {
      title: "Total Income",
      amount: "Rs. 34,334.89",
      percentage: "+4.75%",
      description: "Increased last month",
    },
    {
      title: "Total Saving",
      amount: "Rs. 34,334.89",
      percentage: "+4.75%",
      description: "Increased last month",
    },
    {
      title: "Total Expenses",
      amount: "Rs. 34,334.89",
      percentage: "+4.75%",
      description: "Increased last month",
    },
  ];

  return (
    <Grid container spacing={0.5}>
      {investments.map((item) => (
        <Grid size={6} key={item.title}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ color: "#2d75cd" }}>
                Rs. 34,334.89
              </Typography>
              <Typography variant="subtitle1">Total Investment</Typography>

              <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "green",
                    fontWeight: 600,
                    mr: 1,
                  }}
                >
                  <ArrowDropUpIcon fontSize="small" />
                  +4.75%
                </Box>
                <Typography variant="body1">Increase last week</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid size={6}>
        <OverviewCard />
      </Grid>
    </Grid>
  );
}
