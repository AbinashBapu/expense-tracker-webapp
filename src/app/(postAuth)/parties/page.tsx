"use client";
import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Drawer,
  TextField,
  Button,
  Stack,
  Switch,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TransactionPartyInfo } from "@/dto/Party";
import { useQuery } from "@tanstack/react-query";
import { useFinance } from "@/hooks/useFinance";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PartyForm from "@/components/feature/party/partyForm";

const INITIAL_PARTIES: Array<TransactionPartyInfo> = [
  {
    transactionPartyId: "1",
    name: "Me",
    relationType: "Self",
    active: true,
  },
  {
    transactionPartyId: "2",
    name: "Baba",
    relationType: "Family",
    active: true,
  },
];

export default function Page() {
  const { fetchParties, createAParty } = useFinance();

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedParty, setSelectedParty] =
    useState<TransactionPartyInfo | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partyToDelete, setPartyToDelete] =
    useState<TransactionPartyInfo | null>(null);

  const openEditDrawer = (party: TransactionPartyInfo) => {
    setSelectedParty({ ...party });
    setEditDrawerOpen(true);
  };

  const openViewDrawer = (party: TransactionPartyInfo) => {
    setSelectedParty(party);
    setViewDrawerOpen(true);
  };

  const handleCloseDrawers = () => {
    setEditDrawerOpen(false);
    setViewDrawerOpen(false);
    setSelectedParty(null);
  };

  const handleFieldChange = (
    field: keyof TransactionPartyInfo,
    value: string | boolean
  ) => {
    if (selectedParty) {
      setSelectedParty({ ...selectedParty, [field]: value });
    }
  };

  const handleToggleActive = (id: string) => {
    setParties((prev) =>
      prev.map((p) =>
        p.transactionPartyId === id ? { ...p, active: !p.active } : p
      )
    );
  };

  const confirmDelete = (party: TransactionPartyInfo) => {
    setPartyToDelete(party);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (partyToDelete) {
      setParties((prev) =>
        prev.filter(
          (p) => p.transactionPartyId !== partyToDelete.transactionPartyId
        )
      );
    }
    setDeleteDialogOpen(false);
    setPartyToDelete(null);
  };

  const {
    data: partiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["parties"],
    queryFn: () => fetchParties(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => setEditDrawerOpen(true)}
        >
          Add Party
        </Button>
      </Box>
      {partiesData.length > 0 ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Relation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partiesData.map((party: TransactionPartyInfo) => (
                <TableRow key={party.transactionPartyId}>
                  <TableCell>
                    <Avatar sx={{ bgcolor: red[500] }}>
                      {party.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{party.name}</TableCell>
                  <TableCell>{party.relationType}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={party.active ? "green" : "error"}
                    >
                      {party.active ? "Active" : "Inactive"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Toggle Active">
                        <Switch
                          checked={party.active}
                          onChange={() =>
                            handleToggleActive(party.transactionPartyId)
                          }
                          color="primary"
                        />
                      </Tooltip>
                      <Tooltip title="View">
                        <IconButton
                          aria-label="view"
                          color="info"
                          onClick={() => openViewDrawer(party)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => openEditDrawer(party)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => confirmDelete(party)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mt: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#fff",
            border: "1px dashed #d1d5db",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
            },
          }}
        >
          <Box
            sx={{
              fontSize: 64,
              mb: 2,
              color: "primary.main",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PersonOutlineIcon fontSize="inherit" />
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            color="text.primary"
            sx={{ mb: 1 }}
          >
            No Parties Available
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 420, mx: "auto", mb: 4 }}
          >
            You haven't added any transaction parties yet. Start by adding one
            to keep track of your financial relationships.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setEditDrawerOpen(true)}
            sx={{
              px: 4,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              boxShadow: "none",
              ":hover": {
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            + Add New Party
          </Button>
        </Paper>
      )}

      <Drawer anchor="right" open={editDrawerOpen} onClose={handleCloseDrawers}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add/Edit Party
          </Typography>
          <PartyForm
            closePartyDrawer={handleCloseDrawers}
            createAParty={createAParty}
            reloadParties={refetch}
          />
        </Box>
      </Drawer>

      {/* View Drawer */}
      <Drawer anchor="right" open={viewDrawerOpen} onClose={handleCloseDrawers}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Transaction Details
          </Typography>
          {selectedParty && (
            <Stack spacing={2}>
              <Typography>
                <strong>Name:</strong> {selectedParty.name}
              </Typography>
              <Typography>
                <strong>Relation:</strong> {selectedParty.relationType}
              </Typography>
              <Typography>
                <strong>Status:</strong>{" "}
                {selectedParty.active ? "Active" : "Inactive"}
              </Typography>
            </Stack>
          )}
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to <strong>hard delete</strong>{" "}
            <em>{partyToDelete?.name}</em>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirmed}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
