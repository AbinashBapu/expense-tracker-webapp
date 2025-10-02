import { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

interface ReportStatsProps {
  isSummaryLoading: boolean;
  incomeAmount: number;
  expenseAmount: number;
  savingsAmount: number;
  incomePerDay: number;
  expensePerDay: number;
  savingsPerDay: number;
}

const ReportStats: FC<ReportStatsProps> = ({
  isSummaryLoading,
  incomeAmount,
  expenseAmount,
  savingsAmount,
  incomePerDay,
  expensePerDay,
  savingsPerDay,
}) => {
  console.log("ReportStats page reloaded");

  return (
    <>
      <Box sx={{ mb: 1 }}>
        {isSummaryLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <Card
            sx={{
              bgcolor: "#f9f9f9",
              boxShadow: 1,
              borderRadius: 1,
              p: 2,
            }}
          >
            <Grid container>
              {/* Income */}
              <Grid
                size={4}
                sx={{
                  textAlign: "center",
                  borderRight: 1,
                  borderColor: "#cfd0da",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  mb={0.5}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#017BFE" }}
                  >
                    ₹
                    {incomeAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#017BFE", mt: 0.5 }}
                  >
                    (₹
                    {incomePerDay?.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    / day)
                  </Typography>
                </Box>

                <Typography variant="caption">Total Income</Typography>
              </Grid>

              {/* Expense */}
              <Grid
                size={4}
                sx={{
                  textAlign: "center",
                  borderRight: 1,
                  borderColor: "#cfd0da",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  mb={0.5}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#DC3444" }}
                  >
                    ₹
                    {expenseAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#DC3444", mt: 0.5 }}
                  >
                    (₹
                    {expensePerDay?.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    / day)
                  </Typography>
                </Box>

                <Typography variant="caption">Total Expense</Typography>
              </Grid>

              {/* Savings */}
              <Grid size={4} sx={{ textAlign: "center" }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  mb={0.5}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#28A745" }}
                  >
                    ₹
                    {savingsAmount?.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#28A745", mt: 0.5 }}
                  >
                    (₹
                    {savingsPerDay?.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    / day)
                  </Typography>
                </Box>
                <Typography variant="caption">Total Savings</Typography>
              </Grid>
            </Grid>
          </Card>
        )}
      </Box>
    </>
  );
};

export default ReportStats;
