import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function TransactionsLists() {
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "Income",
      col2: "Salary",
      col3: "Rs. 200",
      col4: "20-Jan-2025 11:05 AM",
    },
    {
      id: 2,
      col1: "Expense",
      col2: "Grocery",
      col3: "Rs. 10",
      col4: "20-Jan-2025 12:05 PM",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 1 },
    { field: "col2", headerName: "Sub Category", flex: 1 },
    { field: "col3", headerName: "Amount", flex: 1 },
    { field: "col4", headerName: "Date & Time", flex: 1 },
  ];
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="div">
              Transaction
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="small">
              View
            </Button>
          </Box>
        </Box>

        <div style={{ height: 260, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
}
