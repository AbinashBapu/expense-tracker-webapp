import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dayjs } from "dayjs";

export default function OverviewCard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleClickOpenDialog = () => {
    handleClose();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // handleClose();
    setOpenDialog(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const invExpOverview = {
    income: 122233,
    saving: 200000,
    expense: 100000,
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#2d75cd", color: "white" }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" sx={{ mb: 1.5, textAlign: "center" }}>
              Overview{" "}
              <Typography variant="caption">
                (20-05-2025 To 20-05-2026)
              </Typography>
            </Typography>

            <IconButton
              sx={{ color: "white" }}
              size="small"
              aria-label="delete"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={handleClose}>Today</MenuItem>
            <MenuItem onClick={handleClose}>Yesterday</MenuItem>
            <MenuItem onClick={handleClose}>Current Week</MenuItem>
            <MenuItem onClick={handleClose}>Current Month</MenuItem>
            <MenuItem onClick={handleClose}>Curent Year</MenuItem>
            <MenuItem onClick={handleClickOpenDialog}>Choose Dates</MenuItem>
          </Menu>

          <Grid container>
            <Grid
              size={4}
              style={{
                textAlign: "center",
                borderRight: " 2px dotted #cbcdcf",
              }}
            >
              <Typography variant="h6">Rs. {invExpOverview.income}</Typography>
              <Typography variant="caption">Income</Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                textAlign: "center",
                borderRight: " 2px dotted #cbcdcf",
              }}
            >
              <Typography variant="h6">Rs. {invExpOverview.saving}</Typography>
              <Typography variant="caption">Saving</Typography>
            </Grid>
            <Grid size={4} sx={{ textAlign: "center" }}>
              <Typography variant="h6">Rs. {invExpOverview.expense}</Typography>
              <Typography variant="caption">Expense</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose Date</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    label="Transaction From"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    label="Transaction From"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
