import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
  Skeleton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs, { Dayjs } from "dayjs";
import { SearchParamDto } from "@/dto/SearchParamDto";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";

export default function OverviewCard() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs().startOf("month")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().endOf("day")
  );

  const [applySearch, setApplySearch] = React.useState<SearchParamDto>({
    fromDate: startDate ? startDate?.toISOString() : null,
    toDate: endDate ? endDate?.toISOString() : null,
    categoryId: null,
    subCategoryId: null,
    transactionType: null,
  });

  const { fetchFinanceSummary } = useReport();

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: summaryRefetch,
    isFetching: isSummaryFetching,
  } = useQuery({
    queryKey: ["financeSummary", applySearch],
    queryFn: () => fetchFinanceSummary(applySearch),
  });

  const handleClickOpenDialog = () => {
    handleClose();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // handleClose();
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    applySearch.fromDate = startDate?.toISOString();
    applySearch.toDate = endDate?.toISOString();

    setOpenDialog(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#2d75cd", color: "white" }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              sx={{ mb: 1.5, textAlign: "center" }}
            >
              Overview{" "}
              <Typography variant="caption">
                (20-05-2025 To 20-05-2026)
              </Typography>
            </Typography>

            <IconButton
              sx={{ color: "white" }}
              size="small"
              aria-label="delete"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Grid container>
            <Grid
              size={4}
              style={{
                textAlign: "center",
                borderRight: " 2px dotted #cbcdcf",
              }}
            >
              {isSummaryLoading ? (
                <Skeleton width={100} height={20} />
              ) : (
                <Box>
                  <Typography variant="subtitle1">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.income)}
                  </Typography>

                  <Typography variant="caption">
                    (
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.avgIncomePerDay)}{" "}
                    / day )
                  </Typography>
                </Box>
              )}
              <Typography variant="caption">Income</Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                textAlign: "center",
                borderRight: " 2px dotted #cbcdcf",
              }}
            >
              {isSummaryLoading ? (
                <Skeleton width={100} height={20} />
              ) : (
                <Box>
                  <Typography variant="subtitle1">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.saving)}
                  </Typography>
                  <Typography variant="caption">
                    (
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.avgSavingPerDay)}{" "}
                    / day )
                  </Typography>
                </Box>
              )}
              <Typography variant="caption">Saving</Typography>
            </Grid>
            <Grid size={4} sx={{ textAlign: "center" }}>
              {isSummaryLoading ? (
                <Skeleton width={100} height={20} />
              ) : (
                <Box>
                  <Typography variant="subtitle1">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.expense)}
                  </Typography>
                  <Typography variant="caption">
                    (
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(summaryData.avgExpensePerDay)}{" "}
                    / day )
                  </Typography>
                </Box>
              )}
              <Typography variant="caption">Expense</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {/* <MenuItem onClick={handleClose}>Today</MenuItem>
              <MenuItem onClick={handleClose}>Yesterday</MenuItem>
              <MenuItem onClick={handleClose}>Current Week</MenuItem>
              <MenuItem onClick={handleClose}>Current Month</MenuItem>
              <MenuItem onClick={handleClose}>Curent Year</MenuItem> */}
        <MenuItem onClick={handleClickOpenDialog}>Choose Dates</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose Date</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // call the search logic
          }}
        >
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    label="Start Date"
                    format="DD-MM-YYYY HH:mm"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD-MM-YYYY HH:mm"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    label="End Date"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
