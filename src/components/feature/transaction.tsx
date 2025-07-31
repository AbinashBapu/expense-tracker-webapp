import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function TransactionsLists() {
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "Salary",
      col2: "Rs. 200.00",
      col3: "Cr",
      col4: "20-Jan-2025",
      col5: "Me",
      col6: "BIPROS",
    },
    {
      id: 2,
      col1: "Grocery",
      col2: "Rs. 10.00",
      col3: "Dr",
      col4: "20-Jan-2025",
      col5: "Baba",
      col6: "Me",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 1 },
    { field: "col2", headerName: "Amount", flex: 1 },
    { field: "col3", headerName: "Transaction Type  ", flex: 1 },
    { field: "col5", headerName: "Incurred For", flex: 1 },
    { field: "col6", headerName: "Incurred By", flex: 1 },
    { field: "col4", headerName: "Transaction Date", flex: 1 },
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
