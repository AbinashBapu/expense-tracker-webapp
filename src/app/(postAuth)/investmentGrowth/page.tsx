"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import InvestmentGrowthForm from "@/components/feature/investmentGrowth/investmentForm";
import { useCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import { TypeId } from "@/data/TypeConsts";
import { CategoryIdConsts } from "@/data/CategoryIdConsts";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import InvestmentSearchForm from "@/components/feature/investmentGrowth/investmentSearchForm";
import { useFinance } from "@/hooks/useFinance";
import GrowthTables from "@/components/feature/investmentGrowth/growthTables";

export default function InvestGrowthAnalysis() {
  const [open, setOpen] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [searchValues, setSearchValues] = useState({
    page: 0,
    size: 10,
    subCategoryId: null,
    asOnDate: null,
  });
  const { fetchSubCategories } = useCategory();
  const { fetchInvestmentGrowthValues } = useFinance();

  const {
    data: subCategoryData,
    isLoading: isLoadingSubCategory,
    error: subCategoryError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: () => fetchSubCategories(CategoryIdConsts.SavingId),
  });

  const applySearch = (search: any) => {
    setSearchValues((prv) => ({ ...search, page: 0, size: 10 }));
    console.log("Search value", searchValues);
    toggleSearchDrawer();
  };

  const {
    data: portfolioData,
    isLoading: isLoadingPortfolioData,
    error: portfolioError,
  } = useQuery({
    queryKey: ["portfolioSearch", searchValues],
    queryFn: () => fetchInvestmentGrowthValues(searchValues),
  });

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
    />
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 2,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={toggleViewDrawer} variant="contained">
          Log Portfolio
        </Button>
        <Button
          onClick={toggleSearchDrawer}
          variant="contained"
          endIcon={<QueryStatsIcon />}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={12}>
          {(!isLoadingPortfolioData &&
            portfolioData &&
            portfolioData.content.length > 0 && (
              <>
                <GrowthTables
                  growthData={portfolioData}
                  isLoading={isLoadingPortfolioData}
                  error={portfolioError}
                />
                {portfolioData?.totalPages > 1 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
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
            )) || <Typography>No Data</Typography>}
        </Grid>
        <Grid size={4}></Grid>
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
