import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function ActivityTransactions() {
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "Income",
      col2: "Salary",
      col3: "Rs. 200",
      col4: "20-Jan-2025 11:05 AM",
      col5: "asdfaasdfasdf",
    },
    {
      id: 2,
      col1: "Expense",
      col2: "Grocery",
      col3: "Rs. 10",
      col4: "20-Jan-2025 12:05 PM",
      col5: "Salary transfered to Toby culsohowSalary transfered to Toby culsohowSalary transfered to Toby culsohowSalary transfered to Toby culsohow",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 0.5 },
    { field: "col2", headerName: "Sub Category", flex: 0.5 },
    { field: "col3", headerName: "Amount", flex: 0.5 },
    { field: "col4", headerName: "Date & Time", flex: 0.5 },
    { field: "col5", headerName: "Description", flex: 1.5 },
  ];
  return (
    <Card>
      <CardContent>
        <div style={{ height: 260, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
}
