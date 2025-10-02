"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Drawer, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import dayjs, { Dayjs } from "dayjs";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import SearchReportForm from "@/components/feature/report/searchReportForm";
import ReportStats from "@/components/feature/report/reportStats";
import { SearchParamDto } from "@/dto/SearchParamDto";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import TransactionStepper from "@/components/feature/report/transactionStepper";
import { useFinance } from "@/hooks/useFinance";
import SplineChart from "@/components/feature/splineChart";
import ChartBasedOnCategory from "@/components/feature/report/transaactionSummaryBasedOnCat";
import { useCategory } from "@/hooks/useCategory";

export default function ReportPage() {
  const size = 10;
  const [page, setPage] = useState(0);
  const today = useMemo(() => dayjs(), []);
  const [filter, setFilter] = useState<SearchParamDto>(() => {
    return {
      fromDate: today.startOf("month").toISOString(),
      toDate: today.endOf("day").toISOString(), //values.toDate,
      categoryId: "",
      subCategoryId: "",
      transactionType: "",
    };
  });
  const [applySearch, setApplySearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { fetchCategoryData } = useCategory();
  const { fetchTransactions, fetchParties } = useFinance();
  const [days, setDays] = useState(0);
  const {
    data: partiesData,
    isLoading: isLoadingParties,
    error: partiesError,
  } = useQuery({
    queryKey: ["parties"],
    queryFn: () => fetchParties(),
  });

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryData(),
  });

  const {
    fetchFinanceSummary,
    fetchFinanceSummaryForSplineChart,
    fetchFinanceSummaryForDonutChartBasedOnCategory,
  } = useReport();

  useEffect(() => {
    if (filter) {
      setDays(
        filter.fromDate
          ? dayjs(filter.toDate).diff(filter.fromDate, "day") + 1
          : 0
      );
      setApplySearch(false);
    }
  }, [filter]);

  const handleSearch = (filterParam: SearchParamDto) => {
    console.log("Search param", filterParam);
    setFilter(filterParam);
    setDrawerOpen(false);
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
    queryFn: () => fetchFinanceSummary(filter),
  });

  const {
    data: summaaryDataForSplineChart,
    isLoading: isSummaryLoadingForSplineChart,
    error: summaryErrorForSplineChart,
    refetch: summaryRefetchForSplineChart,
    isFetching: isSummaryFetchingForSplineChart,
  } = useQuery({
    queryKey: ["financeSummarySplineChart", filter],
    queryFn: () => fetchFinanceSummaryForSplineChart(filter),
  });

  const {
    data: summaaryDataForDonutChartBasedOnCategory,
    isLoading: isSummaryLoadingForDonutChartBasedOnCategory,
    error: summaryErrorForDonutChartBasedOnCategory,
    refetch: summaryRefetchForDonutChartBasedOnCategory,
    isFetching: isSummaryFetchingForDonutChartBasedOnCategory,
  } = useQuery({
    queryKey: ["fetchFinanceSummaryForDonutChartBasedOnCategory", filter],
    queryFn: () => fetchFinanceSummaryForDonutChartBasedOnCategory(filter),
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
        filters: filter,
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
      <SplineChart
        categories={summaaryDataForSplineChart?.categories || []}
        chartData={chartData}
        title="Income vs Expense vs Savings"
        yaxisTitle="Amount (in ₹)"
      />
    );
  }

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
            incomePerDay={summaryData?.avgIncomePerDay || 0}
            savingsPerDay={summaryData?.avgSavingPerDay || 0}
            expensePerDay={summaryData?.avgExpensePerDay || 0}
          />
          {SplineChartComponent}
        </Grid>
        <Grid size={4}>
          <TransactionStepper
            days={days}
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
              parties={partiesData}
              categories={categoryData}
              filter={filter}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
