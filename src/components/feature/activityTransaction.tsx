import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
  Pagination,
  Box,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFinance } from "@/hooks/useFinance";
import { useQuery } from "@tanstack/react-query";
import { DateUtils } from "@/utils/dateUtil";

type TransactionRow = {
  transactionId: string;
  categoryName: string;
  incurredBy: string;
  incurredFor: string[];
  amount: number;
  spentOn: string;
  description: string;
  transactionType: string;
};
type Props = {
  onEdit: (transaction: any) => void;
  onView: (transaction: any) => void;
};

const ActivityTransactions = forwardRef(function ActivityTransactions(
  { onEdit, onView }: Props,
  ref
) {
  const { fetchTransactions } = useFinance();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const size = 10;
  const filters = {};

  const {
    data: transactionData,
    isLoading: isTransactionDataLoading,
    error: transactionError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () =>
      fetchTransactions({
        page,
        size,
        sortBy: "spentOn",
        direction: "desc",
        filters,
      }),
  });

  useImperativeHandle(ref, () => ({
    refetchTransactions: refetch,
  }));

  if (isTransactionDataLoading) return <p>Loading...</p>;
  if (transactionError)
    return <p>Error: {(transactionError as Error)?.message}</p>;

  const rows: GridRowsProp =
    transactionData?.content.map((transaction: any) => ({
      id: transaction.transactionId,
      categoryName: transaction.category.label,
      subCategoryName: transaction.subCategory.label,
      incurredBy: transaction.incurredBy.name,
      incurredFor: transaction.incurredFor.map((p: any) => p.name).join(", "),
      amount: transaction.amount,
      spentOn: DateUtils.parseUTCDateToDDMMYYYY(transaction.spentOn),
      description: transaction.description,
      transactionType: transaction.transactionType,
    })) || [];

  const handleViewClick = (id: number) => {
    const transaction = rows.find((row) => row.id === id);
    if (transaction) onView(transaction);
  };

  const handleEditClick = (id: number) => {
    const transaction = rows.find((row) => row.id === id);
    if (transaction) onEdit(transaction);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting transaction:", selectedId);
    // TODO: Call delete API
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    { field: "categoryName", headerName: "Category", flex: 1 },
    { field: "subCategoryName", headerName: "Subcategory", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "transactionType", headerName: "Type", flex: 0.5 },
    { field: "incurredFor", headerName: "Incurred For", flex: 1 },
    { field: "incurredBy", headerName: "Incurred By", flex: 1 },
    { field: "spentOn", headerName: "Date", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
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
            onClick={() => handleViewClick(params.row.id)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => handleEditClick(params.row.id)}
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
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              loading={isFetching}
            />
          </div>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="body2" color="text.secondary">
              Total Transactions: {transactionData?.totalElements ?? 0}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Stack spacing={2}>
          <Pagination
            page={page + 1}
            count={transactionData?.totalPages ?? 1}
            onChange={(e, value) => {
              setPage(value - 1);
            }}
            showFirstButton
            showLastButton
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Box>

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
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default ActivityTransactions;
