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

// Define your color palette
const AVATAR_COLOR = [
  red[500],
  blue[500],
  green[500],
  orange[500],
  deepPurple[500],
  teal[500],
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
        <Grid container spacing={1}>
          {partiesData.map((party: TransactionPartyInfo, index: number) => (
            <Grid size={2} key={party.transactionPartyId}>
              <Card
                elevation={3}
                sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}
              >
                {/* Custom Header Layout */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 1,
                    paddingBottom: 0,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: AVATAR_COLOR[index % AVATAR_COLOR.length],
                      }}
                    >
                      {party.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{party.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {party.relationType}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    label={party.active ? "Active" : "Inactive"}
                    color={party.active ? "success" : "error"}
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>

                <CardContent>
                  {/* Optional: Add additional card content here */}
                </CardContent>

                <CardActions disableSpacing>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    sx={{ width: "100%" }}
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
                        color="info"
                        onClick={() => openViewDrawer(party)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => openEditDrawer(party)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => confirmDelete(party)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
