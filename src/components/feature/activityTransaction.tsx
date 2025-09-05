import { forwardRef, useImperativeHandle, useState } from "react";
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
  Skeleton,
  Chip,
  Grid,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFinance } from "@/hooks/useFinance";
import { useQuery } from "@tanstack/react-query";
import { DateUtils } from "@/utils/dateUtil";
import dayjs from "dayjs";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

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
  selectedDate: string | null;
  selectedCategory: string | null;
};

const ActivityTransactions = forwardRef(function ActivityTransactions(
  { selectedCategory, selectedDate, onEdit, onView }: Props,
  ref
) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const { fetchTransactions } = useFinance();

  const size = 10;

  const {
    data: transactionData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["transactions", page, selectedDate, selectedCategory],
    queryFn: () =>
      fetchTransactions({
        page,
        size,
        sortBy: "spentOn",
        direction: "desc",
        filters: {
          fromDate: selectedDate ? dayjs(selectedDate).toISOString() : null,
          toDate: null,
          categoryId: selectedCategory,
        },
      }),
  });

  useImperativeHandle(ref, () => ({
    refetchTransactions: refetch,
  }));

  const rows: GridRowsProp =
    transactionData?.content.map((transaction: any) => ({
      id: transaction.transactionId,
      categoryName: transaction.category.label,
      subCategoryName: transaction.subCategory.label,
      incurredBy: transaction.incurredBy.name,
      incurredFor: transaction.incurredFor.map((p: any) => p.name),
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
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.8,
    },
    { field: "transactionType", headerName: "Type", flex: 0.6 },
    {
      field: "incurredFor",
      headerName: "Incurred For",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {params.value.map((name: string, idx: number) => (
            <Chip
              key={idx}
              label={name}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      ),
    },
    { field: "incurredBy", headerName: "Incurred By", flex: 1 },
    { field: "spentOn", headerName: "Date", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => (
        <Typography
          variant="body2"
          noWrap
          title={params.value}
          sx={{ maxWidth: "100%" }}
        >
          {params.value}
        </Typography>
      ),
    },
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
            title="View"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => handleEditClick(params.row.id)}
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Skeleton loading state
  if (isLoading) {
    return (
      <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={40} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card variant="outlined" sx={{ mt: 2, p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(error as Error)?.message}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card variant="outlined" sx={{}}>
        <CardContent>
          {rows.length === 0 ? (
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              No transactions found for the selected date.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newView) => {
                    if (newView !== null) setViewMode(newView);
                  }}
                  size="small"
                  sx={{
                    backgroundColor: "#8080802b",
                    borderRadius: 2,
                    "& .MuiToggleButton-root": {
                      border: "none",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      fontWeight: 500,
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      color: "text.secondary",
                      "& svg": {
                        mr: 1,
                      },
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton value="table" aria-label="Table View">
                    <ViewListIcon />
                    Table
                  </ToggleButton>
                  <ToggleButton value="card" aria-label="Card View">
                    <ViewModuleIcon />
                    Card
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {viewMode === "table" ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  disableRowSelectionOnClick
                  hideFooter
                  loading={isFetching}
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
              ) : (
                <Box sx={{ maxHeight: 600, overflowY: "auto", pr: 1 }}>
                  <Grid container spacing={3}>
                    {rows.map((row: any) => (
                      <Grid size={3} key={row.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: "100%",
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              boxShadow: 6,
                              transform: "translateY(-4px)",
                              bgcolor: "#f9f9f9",
                            },
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Stack
                              spacing={1}
                              height="100%"
                              justifyContent="space-between"
                            >
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  color="text.secondary"
                                  gutterBottom
                                  sx={{ fontWeight: 600 }}
                                >
                                  {row.categoryName} / {row.subCategoryName}
                                </Typography>

                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: "bold",
                                    mb: 0.5,
                                    color:
                                      row.transactionType === "Dr"
                                        ? "error.main"
                                        : "success.main",
                                  }}
                                >
                                  ₹{row.amount.toLocaleString("en-IN")}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1 }}
                                >
                                  {row.transactionType} | {row.spentOn}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.primary"
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    minHeight: 60,
                                  }}
                                  title={row.description}
                                >
                                  {row.description}
                                </Typography>

                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  mt={1}
                                  flexWrap="wrap"
                                  useFlexGap
                                >
                                  {row.incurredFor.map(
                                    (name: string, idx: number) => (
                                      <Chip
                                        key={idx}
                                        label={name}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                      />
                                    )
                                  )}
                                </Stack>
                              </Box>
                            </Stack>
                          </CardContent>

                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                            p={1}
                            pt={0}
                            borderTop="1px solid"
                            borderColor="divider"
                          >
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleViewClick(row.id)}
                              title="View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              size="small"
                              onClick={() => handleEditClick(row.id)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(row.id)}
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="body2" color="text.secondary">
              Total Transactions: {transactionData?.totalElements ?? 0}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Pagination */}
      {transactionData?.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Stack spacing={2}>
            <Pagination
              page={page + 1}
              count={transactionData.totalPages}
              onChange={(e, value) => setPage(value - 1)}
              showFirstButton
              showLastButton
              color="primary"
              variant="outlined"
            />
          </Stack>
        </Box>
      )}

      {/* Delete Dialog */}
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
