"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  duration,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchReportForm from "@/components/feature/report/searchReportForm";
import ReportStats from "@/components/feature/report/reportStats";
import { ReportFilter } from "@/dto/SearchParamDto";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import TransactionStepper from "@/components/feature/report/transactionStepper";
import { useFinance } from "@/hooks/useFinance";
import SplineChart from "@/components/feature/splineChart";
import DonutChart from "@/components/feature/donutChart";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import DonutChartv2 from "@/components/feature/donutChartV2";
import ChartBasedOnCategory from "@/components/feature/report/transaactionSummaryBasedOnCat";

export default function ReportPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<ReportFilter>(() => {
    console.log("Setting default filter");
    const endDate = dayjs();
    const startDate = endDate.subtract(30, "day");

    return {
      duration: "last30days",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  });
  const [applySearch, setApplySearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    fetchFinanceSummary,
    fetchFinanceSummaryForSplineChart,
    fetchFinanceSummaryForDonutChartBasedOnCategory,
  } = useReport();
  const { fetchTransactions } = useFinance();

  useEffect(() => {
    if (applySearch) {
      summaryRefetch();
      transactionRefetch();
      setApplySearch(false);
    }
  }, [applySearch]);

  const size = 10;

  console.log("Report page reloaded");

  const handleSearch = (filterParam: ReportFilter) => {
    setFilter((prev: ReportFilter) => {
      return {
        duration: filterParam.duration,
        startDate: filterParam.startDate,
        endDate: filterParam.endDate,
      };
    });
    setApplySearch(true);
  };

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: summaryRefetch,
    isFetching: isSummaryFetching,
  } = useQuery({
    queryKey: ["financeSummary", filter],
    queryFn: () =>
      fetchFinanceSummary({
        fromDate: filter.startDate,
        toDate: filter.endDate,
      }),
  });

  const {
    data: summaaryDataForSplineChart,
    isLoading: isSummaryLoadingForSplineChart,
    error: summaryErrorForSplineChart,
    refetch: summaryRefetchForSplineChart,
    isFetching: isSummaryFetchingForSplineChart,
  } = useQuery({
    queryKey: ["financeSummarySplineChart", filter],
    queryFn: () =>
      fetchFinanceSummaryForSplineChart({
        fromDate: filter.startDate,
        toDate: filter.endDate,
      }),
  });

  const {
    data: summaaryDataForDonutChartBasedOnCategory,
    isLoading: isSummaryLoadingForDonutChartBasedOnCategory,
    error: summaryErrorForDonutChartBasedOnCategory,
    refetch: summaryRefetchForDonutChartBasedOnCategory,
    isFetching: isSummaryFetchingForDonutChartBasedOnCategory,
  } = useQuery({
    queryKey: ["fetchFinanceSummaryForDonutChartBasedOnCategory", filter],
    queryFn: () =>
      fetchFinanceSummaryForDonutChartBasedOnCategory({
        fromDate: filter.startDate,
        toDate: filter.endDate,
      }),
  });

  const {
    data: transactionData,
    isLoading: isTransactionDataLoading,
    error: transactionError,
    refetch: transactionRefetch,
    isFetching: isTransactionFetching,
  } = useQuery({
    queryKey: ["transactions", filter, page],
    queryFn: () =>
      fetchTransactions({
        page,
        size,
        sortBy: "spentOn",
        direction: "desc",
        filters: {
          fromDate: filter.startDate,
          toDate: filter.endDate,
        },
      }),
  });

  const handleOnClickNextOrPrev = (pageNumber: number) => {
    setPage(pageNumber);
  };
  let chartData: any = [];
  let SplineChartComponent = null;
  if (!isSummaryLoadingForSplineChart) {
    chartData = [
      {
        name: "Income",
        marker: {
          symbol: "square",
        },
        data: [...summaaryDataForSplineChart.incomes],
      },
      {
        name: "Expense",
        marker: {
          symbol: "Diamond",
        },
        data: [...summaaryDataForSplineChart.expense],
      },
      {
        name: "Savigngs",
        marker: {
          symbol: "circle",
        },
        data: [...summaaryDataForSplineChart.saving],
      },
    ];
    SplineChartComponent = (
      <Paper elevation={3}>
        <SplineChart
          categories={summaaryDataForSplineChart?.categories || []}
          chartData={chartData}
          title="Income vs Expense vs Savings"
          yaxisTitle="Amount (in ₹)"
        />
      </Paper>
    );
  }

  console.log("Report page reloaded");
  console.log(summaaryDataForDonutChartBasedOnCategory);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          endIcon={<FilterAltIcon />}
          onClick={() => setDrawerOpen(true)}
          size="small"
        >
          Apply Filters
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={8}>
          <ReportStats
            isSummaryLoading={isSummaryLoading}
            incomeAmount={summaryData?.income || 0}
            expenseAmount={summaryData?.expense || 0}
            savingsAmount={summaryData?.saving || 0}
          />
          {SplineChartComponent}
        </Grid>
        <Grid size={4}>
          <TransactionStepper
            transactionData={transactionData}
            onClickBtn={handleOnClickNextOrPrev}
          />
        </Grid>

        <Grid size={12} sx={{ mb: 5 }}>
          <ChartBasedOnCategory
            donutChartData={summaryData}
            donutChartV2Data={summaaryDataForDonutChartBasedOnCategory}
            isSummaryLoading={isSummaryLoading}
            isSummaryLoadingForDonutChartBasedOnCategory={
              isSummaryLoadingForDonutChartBasedOnCategory
            }
          />
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 320,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Scrollable Filter Fields */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <SearchReportForm
              closeDrawer={() => setDrawerOpen(false)}
              onSearch={handleSearch}
              filter={filter}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
