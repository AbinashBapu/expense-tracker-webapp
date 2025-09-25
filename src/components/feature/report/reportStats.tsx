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
}

const ReportStats: FC<ReportStatsProps> = ({
  isSummaryLoading,
  incomeAmount,
  expenseAmount,
  savingsAmount,
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
              <Grid
                size={4}
                sx={{
                  textAlign: "center",
                  borderRight: 1,
                  borderColor: "#cfd0da",
                }}
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
                <Typography variant="caption">Total Income</Typography>
              </Grid>
              <Grid
                size={4}
                sx={{
                  textAlign: "center",
                  borderRight: 1,
                  borderColor: "#cfd0da",
                }}
              >
                {/* <Typography variant="h6">Expense</Typography> */}
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
                <Typography variant="caption">Total Expense</Typography>
              </Grid>
              <Grid size={4} sx={{ textAlign: "center" }}>
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
