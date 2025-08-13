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

    const toggleDrawer = () => {
      setOpen((prev) => !prev);
    };

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Box>
            <Button onClick={toggleDrawer} variant="outlined">
              Log Activity
            </Button>
          </Box>
        </Box>

        <ActivityTransactions />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={11} defaultPage={6} siblingCount={0} />
        </Box>

        <Drawer open={open} onClose={toggleDrawer} anchor="right">
          <Box sx={{ width: 400, p: 2 }} role="presentation">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Transaction
            </Typography>
            <TransactionForm
              parties={partiesData}
              categories={categoryData}
              closeDrawer={toggleDrawer}
            />
          </Box>
        </Drawer>
      </Box>
    );
  }
