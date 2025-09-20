"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import InvestmentGrowthForm from "@/components/feature/investmentGrowth/investmentForm";
import { useCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import { TypeId } from "@/data/TypeConsts";
import { CategoryIdConsts } from "@/data/CategoryIdConsts";

export default function InvestGrowthAnalysis() {
  const [open, setOpen] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const { fetchSubCategories } = useCategory();

  const {
    data: subCategoryData,
    isLoading: isLoadingSubCategory,
    error: subCategoryError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: () => fetchSubCategories(CategoryIdConsts.SavingId),
  });

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleViewDrawer = () =>
    setOpenViewDrawer((prev) => {
      console.log("Toggling view drawer", prev);
      return !prev;
    });

  const investmentGrowthForm = subCategoryData && (
    <InvestmentGrowthForm
      closeDrawer={toggleViewDrawer}
      subCatgories={subCategoryData}
    />
  );
  return (
    <Box>
      <Button
        onClick={toggleViewDrawer}
        sx={{ borderRadius: "10px" }}
        variant="contained"
      >
        Log Portfolio
      </Button>

      <Drawer open={openViewDrawer} onClose={toggleViewDrawer} anchor="right">
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Portfolio Log
          </Typography>
          {investmentGrowthForm}
        </Box>
      </Drawer>
    </Box>
  );
}
