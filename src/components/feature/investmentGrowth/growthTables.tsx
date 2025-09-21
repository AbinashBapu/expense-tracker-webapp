import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { DateUtils } from "@/utils/dateUtil";

const columns: GridColDef[] = [
  { field: "asOnDate", headerName: "Date", flex: 1 },
  { field: "numberOfDays", headerName: "No Of Days", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "amountInvested", headerName: "Invested Amount", flex: 1 },
  { field: "amountAccumulated", headerName: "Amount Accumulated", flex: 1 },
  {
    field: "interest",
    headerName: "Interest Gained",
    flex: 1,
    renderCell: (params) => {
      return (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "investmentGrowthAmount",
    headerName: "Investment Grows Amount",
    flex: 1,
    renderCell: (params) => {
      const rawValue = Number(params.value?.replace(/[₹,]/g, "")); // Remove ₹ and commas
      const isNegative = rawValue < 0;

      return (
        <span style={{ color: isNegative ? "red" : "inherit" }}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "portfolioGrowthAmount",
    headerName: "Portfolio Grows Amount",
    flex: 1,
    renderCell: (params) => {
      const rawValue = Number(params.value?.replace(/[₹,]/g, "")); // Remove ₹ and commas
      const isNegative = rawValue < 0;

      return (
        <span style={{ color: isNegative ? "red" : "inherit" }}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "investmentGrowthPercentage",
    headerName: "Investment Grows In %",
    flex: 1,
  },
  {
    field: "portFolioGrowthPercentage",
    headerName: "Portfolio Grows In %",
    flex: 1,
  },
];

export default function GrowthTables({
  growthData,
  isLoading,
  error,
}: {
  growthData: any;
  isLoading: boolean;
  error: any;
}) {
  const rowData = growthData.content.map((item: any) => ({
    id: item.investmentId,
    numberOfDays: item.numberOfDays + " days",
    category: item.subCategory.label,
    amountInvested: formatINRCurrency(item.investedAmount),
    amountAccumulated: formatINRCurrency(item.portfolioAmount),
    asOnDate: DateUtils.parseUTCDateToDDMMYYYY(item.asOnDate),
    interest: formatINRCurrency(item.interestGain),
    investmentGrowthAmount: formatINRCurrency(item.investmentGrowthAmount),
    portfolioGrowthAmount: formatINRCurrency(item.portfolioGrowthAmount),
    investmentGrowthPercentage: item.investmentGrowthPercentage,
    portFolioGrowthPercentage: item.portFolioGrowthPercentage,
  }));

  function formatINRCurrency(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        loading={isLoading}
        autoHeight
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            py: 1,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            fontWeight: 600,
          },
        }}
      />
    </Paper>
  );
}
