"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";

import ActivityTransactions from "@/components/feature/activityTransaction";
import TransactionForm from "@/components/feature/finance/transactionDrawer";
import { useFinance } from "@/hooks/useFinance";
import { useCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { FinanceSearchBox } from "@/components/feature/finance/financeSearchBox";
import TransactionView from "@/components/feature/finance/transactionView";

export default function FinancePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fetch, setFetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(true);
  const [editData, setEditData] = useState<any>(null);
  const transactionRef: any = useRef();
  const { fetchParties } = useFinance();
  const { fetchCategoryData } = useCategory();

  useEffect(() => {
    console.log("UseEffect: ", selectedDate, fetch);

    if (fetch) {
      refetchTransactionData();
      setFetch(false);
    }
  }, [selectedDate, fetch]);

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

  const handleAddNew = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleSearch = (date: string | null) => {
    setSelectedDate(date);
    setFetch(true);
    // refetchTransactionData();
  };

  const handleEdit = (transaction: any) => {
    // setEditData(transaction);
    // setOpen(true);
  };

  const handleView = (transaction: any) => {
    // setEditData(transaction);
    toggleViewDrawer();
  };
  const refetchTransactionData = () => {
    if (transactionRef.current) {
      transactionRef.current?.refetchTransactions();
    }
  };
  // const handleSearch = () => {
  //   setFetch(true);
  //   // refetchTransactionData();
  // };

  // const handleAddNew = () => {
  // setEditData(null);
  // setOpen(true);
  // };

  // const handleEdit = (transaction: any) => {
  // setEditData(transaction);
  // setOpen(true);
  // };

  // const handleView = (transaction: any) => {
  // setEditData(transaction);
  // toggleViewDrawer();
  // };

  const resetSearch = () => {
    setSelectedDate(null);
    setFetch(true);
  };

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleViewDrawer = () =>
    setOpenViewDrawer((prev) => {
      console.log("Toggling view drawer", prev);
      return !prev;
    });

  return (
    <Box>
      <FinanceSearchBox
        onSearch={handleSearch}
        onClear={resetSearch}
        onAdd={handleAddNew}
      />

      <ActivityTransactions
        selectedDate={selectedDate}
        onEdit={handleEdit}
        onView={handleView}
        ref={transactionRef}
      />

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
            refetch={refetchTransactionData}
          />
        </Box>
      </Drawer>

      <Drawer open={openViewDrawer} onClose={toggleViewDrawer} anchor="right">
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            View Transaction
          </Typography>
          <TransactionView
            transaction={{
              category: "House Hold Expenses With XyZ and yzv",
              subcategory: "Dining Out House Hold Expenses With XyZ and yzv",
              transactionOn: "2025-08-20",
              incurredFor: ["Alice", "Bob"],
              incurredBy: "Charlie",
              description: "Dinner at restaurant",
              amount: -2500,
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
}
