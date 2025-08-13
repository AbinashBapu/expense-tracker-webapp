import { Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

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
      col7: "Bought grocery from Rasulgarh",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 1 },
    { field: "col2", headerName: "Amount", flex: 1 },
    { field: "col3", headerName: "Type", flex: 0.5 },
    { field: "col5", headerName: "Incurred For", flex: 1 },
    { field: "col6", headerName: "Incurred By", flex: 1 },
    { field: "col4", headerName: "Date", flex: 1 },
    { field: "col7", headerName: "Description", flex: 2 },
  ];

  return (
    <Card variant="outlined" sx={{ mt: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
          />
        </div>
      </CardContent>
    </Card>
  );
}
