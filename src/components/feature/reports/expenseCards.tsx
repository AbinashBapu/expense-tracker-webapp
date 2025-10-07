import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as React from "react";

import OverviewCard from "./overviewCard";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { DailyExpenseSummary } from "@/dto/ReportDto";
export default function ExpenseCards() {
  const { fetchExpenseInsights } = useReport();

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: summaryRefetch,
    isFetching: isSummaryFetching,
  } = useQuery({
    queryKey: ["financeSummary"],
    queryFn: () => fetchExpenseInsights(),
  });

  return (
    <Grid container spacing={0.5}>
      {isSummaryLoading ? (
        <>
          {[1, 2, 3].map((item) => (
            <Grid size={3} key={item}>
              <Skeleton variant="text" width="30%" height={32} />
              <Skeleton variant="text" width="60%" height={24} />
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Skeleton variant="rectangular" height={24} width="100%" />
            </Grid>
          ))}
        </>
      ) : (
        <>
          {summaryData.map((exp: DailyExpenseSummary) => {
            const isPositive = exp.percentage > 0;
            const percentageColor = isPositive ? "red" : "green";
            const PercentageIcon = isPositive
              ? ArrowDropUpIcon
              : ArrowDropDownIcon;

            return (
              <Grid size={3} key={exp.title}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#2d75cd" }}>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(exp.amount)}
                    </Typography>

                    <Typography variant="caption">{exp.title}</Typography>
                    <Divider sx={{ marginTop: "16px", marginBottom: "20px" }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: percentageColor,
                          fontWeight: 600,
                          mr: 1,
                        }}
                      >
                        <PercentageIcon fontSize="small" />
                        {exp.percentage}%
                      </Box>
                      <Typography variant="caption">
                        {exp.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </>
      )}

      <Grid size={3}>
        <OverviewCard />
      </Grid>
    </Grid>
  );
}
