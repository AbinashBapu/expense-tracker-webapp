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
import { Typography, Pagination } from "@mui/material";

export default function FinancePage() {
  const [open, setOpen] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [editData, setEditData] = useState<any>(null); // store transaction for edit
  const { fetchParties } = useFinance();
  const { fetchCategoryData } = useCategory();

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

  if (isLoadingParties || isLoadingCategory) return <p>Loading...</p>;
  if (partiesError || categoryError)
    return (
      <p>
        Error: {(partiesError as Error)?.message}{" "}
        {(categoryError as Error)?.message}
      </p>
    );

  const toggleDrawer = () => setOpen((prev) => !prev);

  const toggleViewDrawer = () =>
    setOpenViewDrawer((prev) => {
      console.log("Toggling view drawer", prev);
      return !prev;
    });

  const handleAddNew = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (transaction: any) => {
    setEditData(transaction);
    setOpen(true);
  };

  const handleView = (transaction: any) => {
    setEditData(transaction);
    toggleViewDrawer();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button onClick={handleAddNew} variant="outlined">
          Log Activity
        </Button>
      </Box>

      <ActivityTransactions onEdit={handleEdit} onView={handleView} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={11} defaultPage={6} siblingCount={0} />
      </Box>

      <Drawer open={open} onClose={toggleDrawer} anchor="right">
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editData ? "Edit Transaction" : "Add Transaction"}
          </Typography>
          <TransactionForm
            parties={partiesData}
            categories={categoryData}
            closeDrawer={toggleDrawer}
            initialData={editData}
          />
        </Box>
      </Drawer>

      <Drawer open={openViewDrawer} onClose={toggleViewDrawer} anchor="right">
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            View Transaction
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
}
