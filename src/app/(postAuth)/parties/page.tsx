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
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TransactionPartyInfo } from "@/dto/Party";
import { useQuery } from "@tanstack/react-query";
import { useFinance } from "@/hooks/useFinance";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PartyForm from "@/components/feature/party/partyForm";
import {
  deepPurple,
  green,
  orange,
  blue,
  red,
  teal,
} from "@mui/material/colors";
import Parties from "@/components/feature/party/parties";


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
    console.log("View Drawer Open Event", party)
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
    // setParties((prev) =>
    //   prev.map((p) =>
    //     p.transactionPartyId === id ? { ...p, active: !p.active } : p
    //   )
    // );
  };

  const confirmDelete = (party: TransactionPartyInfo) => {
    setPartyToDelete(party);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (partyToDelete) {
      // setParties((prev) =>
      //   prev.filter(
      //     (p) => p.transactionPartyId !== partyToDelete.transactionPartyId
      //   )
      // );
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

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {(error as Error).message}</p>;

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
      <Parties parties={partiesData} isLoading={isLoading} onEdit={openEditDrawer} onDelete={confirmDelete} onView={openViewDrawer} />
     
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
