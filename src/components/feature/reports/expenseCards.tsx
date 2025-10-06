import { Grid, Card, CardContent, Typography, Box, Divider } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import * as React from "react";

import OverviewCard from "./overviewCard";
export default function ExpenseCards() {
  const expenseCard = [
    {
      title: "Ongoing Month Expenses",
      amount: "₹344.89",
      percentage: "+4.75%",
      description: "Increased last month",
    },
    {
      title: "Ongoing Week Expenses",
      amount: "₹344.89",
      percentage: "-4.75%",
      description: "Decreased current week",
    },
    {
      title: "Todays Expense",
      amount: "₹345.89",
      percentage: "+4.75%",
      description: "Increased today",
    },
  ];

  return (
    <Grid container spacing={0.5}>
      {expenseCard.map((exp) => (
        <Grid size={3} key={exp.title}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ color: "#2d75cd" }}>
                {exp.amount}
              </Typography>
              <Typography variant="caption">{exp.title}</Typography>

                <Divider sx={{mt:1,mb:1}}/>
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  {exp.percentage}
                </Box>
                <Typography variant="caption">{exp.description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid size={3}>
        <OverviewCard />
      </Grid>
    </Grid>
  );
}
