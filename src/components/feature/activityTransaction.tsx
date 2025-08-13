import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActivityTransactions() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const handleView = (id: number) => {
    console.log("View transaction:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit transaction:", id);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting transaction:", selectedId);
    setOpenDeleteDialog(false);
    setSelectedId(null);
    // 🔹 Here you would actually delete from API or state
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Category", flex: 1 },
    { field: "col2", headerName: "Amount", flex: 1 },
    { field: "col3", headerName: "Type", flex: 0.5 },
    { field: "col5", headerName: "Incurred For", flex: 1 },
    { field: "col6", headerName: "Incurred By", flex: 1 },
    { field: "col4", headerName: "Date", flex: 1 },
    { field: "col7", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleView(params.row.id)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
