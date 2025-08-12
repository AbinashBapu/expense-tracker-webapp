"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import ActivityTransactions from "@/components/feature/activityTransaction";
import TransactionForm from "@/components/feature/finance/transactionDrawer";
import { useFinance } from "@/hooks/useFinance";
import { useCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";

export default function FinancePage() {
  const [open, setOpen] = useState(false);
  const { fetchParties } = useFinance();
  const { fetchCategoryData } = useCategory();

  const {
    data: partiesData,
    isLoading: isLoadingParties,
    error: partiesError,
    refetch: refetchParties,
  } = useQuery({
    queryKey: ["parties"],
    queryFn: () => fetchParties(),
  });

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: categoryError,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryData(),
  });

  if (isLoadingParties || isLoadingCategory) return <p>Loading...</p>;
  if (partiesError || categoryError)
    return <p>Error: {(partiesError as Error).message}</p>;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Box>
          <Button onClick={toggleDrawer(true)} variant="outlined">
            Log Activity
          </Button>
        </Box>
      </Box>

      <ActivityTransactions />

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <TransactionForm parties={partiesData} categories={categoryData} />
      </Drawer>
    </Box>
  );
}
