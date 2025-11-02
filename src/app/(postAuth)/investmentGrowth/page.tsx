"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import InvestmentGrowthForm from "@/components/feature/investmentGrowth/investmentForm";
import { useCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import { TypeId } from "@/data/TypeConsts";
import { CategoryIdConsts } from "@/data/CategoryIdConsts";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import InvestmentSearchForm from "@/components/feature/investmentGrowth/investmentSearchForm";
import { useFinance } from "@/hooks/useFinance";
import GrowthTables from "@/components/feature/investmentGrowth/growthTables";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import InvestmentGrowthAnalysis from "@/components/feature/investmentGrowth/investmentAnalysisCards";
import StockChart from "@/components/feature/stockChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function InvestGrowthAnalysis() {
  const [showGrowthDiff, setShowGrowthDiff] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchValues, setSearchValues] = useState({
    page: 0,
    size: 10,
    direction: "asc",
    subCategoryId: "",
    sortBy: "asOfDate",
    asOnDate: null,
  });
  const [title, setTitle] = useState("Portfolio Amount");
  const { fetchSubCategories } = useCategory();
  const {
    fetchInvestmentGrothAnalysisDtails,
    fetchInvestmentGrowthValues,
    growthChartData,
  } = useFinance();

  const {
    data: subCategoryData,
    isLoading: isLoadingSubCategory,
    error: subCategoryError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: () => fetchSubCategories(CategoryIdConsts.SavingId),
  });

  useEffect(() => {
    if (
      searchValues.subCategoryId != null &&
      searchValues.subCategoryId.trim() != ""
    ) {
      setShowGrowthDiff(true);
      subCategoryData?.forEach((element: any) => {
        if (element.pkSubCategoryId == searchValues.subCategoryId) {
          setTitle(element.label + "- Portfolio Amount");
        }
      });
    } else {
      setShowGrowthDiff(false);
    }
  }, [searchValues, subCategoryData]);

  const applySearch = (search: any) => {
    setSearchValues((prv) => ({ ...search, page: 0, size: 10 }));
    console.log("Search value", searchValues);
    toggleSearchDrawer();
    refetchPortfolio();
  };

  const {
    data: portfolioData,
    isLoading: isLoadingPortfolioData,
    error: portfolioError,
    refetch: refetchPortfolio,
  } = useQuery({
    queryKey: ["portfolioSearch", searchValues],
    queryFn: () => fetchInvestmentGrowthValues(searchValues),
  });

  const {
    data: portfolioGrowthChartData,
    isLoading: isLoadingPortfolioGrowthChartData,
    error: portfolioGrowthChartError,
    refetch: refetchPortfolioGrowthChart,
  } = useQuery({
    queryKey: ["growthChartData", searchValues],
    queryFn: () => growthChartData(searchValues),
  });

  const {
    data: portfolioAnalysisData,
    isLoading: isLoadingPortfolioAnalysisData,
    error: portfolioAnalysisError,
    refetch: refetchPortfolioAnalysis,
  } = useQuery({
    queryKey: ["portfolioAnalysis", searchValues],
    queryFn: () => fetchInvestmentGrothAnalysisDtails(searchValues),
  });

  console.log("Portfolio Data", portfolioAnalysisData);

  const syncData = () => {
    refetchPortfolio();
    refetchPortfolioAnalysis();
  };

  const toggleViewDrawer = () =>
    setOpenViewDrawer((prev) => {
      console.log("Toggling view drawer", prev);
      return !prev;
    });

  const toggleSearchDrawer = () =>
    setOpenSearchDrawer((prev) => {
      console.log("Toggling view drawer", prev);
      return !prev;
    });

  const investmentGrowthForm = subCategoryData && (
    <InvestmentGrowthForm
      closeDrawer={toggleViewDrawer}
      subCatgories={subCategoryData}
    />
  );
  const searchForm = subCategoryData && (
    <InvestmentSearchForm
      closeDrawer={toggleSearchDrawer}
      subCatgories={subCategoryData}
      applySearch={applySearch}
      searchValues={searchValues}
    />
  );
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  console.log("Portfolio Growth Chart Data", portfolioGrowthChartData);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Tooltip title="Refetch Portfolio Data" sx={{ mt: 2 }}>
          <IconButton onClick={() => syncData()}>
            <SyncIcon />
          </IconButton>
        </Tooltip>
        {showGrowthDiff && (
          <Tooltip
            title={visible ? "Hide Portfolio Chart" : "Show Portfolio Chart"}
            sx={{ mt: 2 }}
          >
            <IconButton onClick={toggleVisibility}>
              {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        )}

        {/* <Button onClick={()=>refetchPortfolio()} variant="contained" sx={{ mt: 2 }} tooltip="Refetch Portfolio Data"><SyncIcon /></Button> */}
        <Button
          onClick={toggleViewDrawer}
          variant="contained"
          sx={{ mt: 2 }}
          endIcon={<AddIcon />}
        >
          Add to Portfolio
        </Button>
        <Button
          onClick={toggleSearchDrawer}
          variant="contained"
          endIcon={<QueryStatsIcon />}
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ mb: 1 }}>
        {visible && !isLoadingPortfolioGrowthChartData && (
          <StockChart title={title} data={portfolioGrowthChartData} />
        )}
      </Box>
      <Grid container spacing={1}>
        <Grid size={9}>
          {isLoadingPortfolioData ? (
            <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={40} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ) : portfolioData && portfolioData.content.length > 0 ? (
            <>
              <GrowthTables
                growthData={portfolioData}
                isLoading={isLoadingPortfolioData}
                error={portfolioError}
                showGrowthDiff={showGrowthDiff}
              />
              {portfolioData?.totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Stack spacing={2}>
                    <Pagination
                      page={searchValues.page + 1}
                      count={portfolioData.totalPages}
                      onChange={(e, value) => {
                        setSearchValues((prv) => ({
                          ...prv,
                          page: value - 1,
                        }));
                      }}
                      showFirstButton
                      showLastButton
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No portfolio records found
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Add an investment to start tracking your portfolio growth.
              </Typography>
              <Button
                onClick={toggleViewDrawer}
                variant="contained"
                sx={{ mt: 2 }}
                endIcon={<AddIcon />}
              >
                Add to Portfolio
              </Button>
            </Box>
          )}
        </Grid>
        <Grid size={3}>
          <InvestmentGrowthAnalysis
            portfolioAnalysisData={portfolioAnalysisData}
          />
        </Grid>
      </Grid>
      <Drawer open={openViewDrawer} onClose={toggleViewDrawer} anchor="right">
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Portfolio Log
          </Typography>
          {investmentGrowthForm}
        </Box>
      </Drawer>
      <Drawer
        open={openSearchDrawer}
        onClose={toggleSearchDrawer}
        anchor="right"
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search
          </Typography>
          {searchForm}
        </Box>
      </Drawer>
    </Box>
  );
}
