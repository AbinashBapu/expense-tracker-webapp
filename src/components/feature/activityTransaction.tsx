import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function ActivityTransactions() {
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "Salary",
      col2: "Rs. 200.00",
      col3: "Cr",
      col4: "20-Jan-2025",
      col5: "Me",
      col6: "BIPROS",
      col7: "Salary credited for month of January",
    },
    {
      id: 2,
      col1: "Grocery",
      col2: "Rs. 10.00",
      col3: "Dr",
      col4: "20-Jan-2025",
      col5: "Baba",
      col6: "Me",
      col7: "Bought grocery from rasulgarah",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 0.5 },
    { field: "col2", headerName: "Amount", flex: 0.5 },
    { field: "col3", headerName: "Transaction Type  ", flex: 0.5 },
    { field: "col5", headerName: "Incurred For", flex: 0.5 },
    { field: "col6", headerName: "Incurred By", flex: 0.5 },
    { field: "col4", headerName: "Transaction Date", flex: 0.5 },
    { field: "col7", headerName: "Description", flex: 1.5 },
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
