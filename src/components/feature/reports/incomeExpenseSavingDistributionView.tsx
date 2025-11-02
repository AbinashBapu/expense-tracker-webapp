import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LinearProgressWithLabel from "@/components/common/linearProgressWithlabel";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DistributionTable from "./distributionTable";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";

export default function IncomeExpenseSavingDistributionView() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs().startOf("month")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().endOf("day")
  );
  const [distributionView, setDistributionView] = React.useState<any>("day");

  const [applySearch, setApplySearch] = React.useState<any>({
    fromDate: startDate ? startDate?.toISOString() : null,
    toDate: endDate ? endDate?.toISOString() : null,
    distributionView: distributionView,
  });

  const { fetchDataBasedOnDist } = useReport();

  const {
    data: distData,
    isLoading: isLoadingDistData,
    error: errorDistData,
    refetch: refetchDistData,
    isFetching: isFetchingDistData,
  } = useQuery({
    queryKey: ["distributionData", applySearch],
    queryFn: () => fetchDataBasedOnDist(applySearch),
  });

  const handleClickOpenDialog = () => {
    handleClose();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // handleClose();
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    applySearch.fromDate = startDate?.toISOString();
    applySearch.toDate = endDate?.toISOString();

    applySearch.distributionView = distributionView;

    setOpenDialog(false);

    console.log(applySearch);
  };

  console.log("Distribution data", distData);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          size="small"
        >
          <Button size="small">Chart View</Button>
          <Button size="small">Distribution View</Button>
        </ButtonGroup> */}
        <Box></Box>

        <IconButton
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
      <Box>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Typography variant="h6">Income</Typography>
            <Box sx={{ height: 330, overflowY: "auto" }}>
              {!isLoadingDistData && (
                <DistributionTable data={distData.incomes} />
              )}
            </Box>
          </Grid>

          <Grid size={4}>
            <Typography variant="h6">Saving</Typography>
            <Box sx={{ height: 330, overflowY: "auto" }}>
              {!isLoadingDistData && (
                <DistributionTable data={distData.savings} />
              )}
              {/* <DistributionTable /> */}
            </Box>
          </Grid>
          <Grid size={4}>
            <Typography variant="h6">Expense</Typography>
            <Box sx={{ height: 330, overflowY: "auto" }}>
              {!isLoadingDistData && (
                <DistributionTable data={distData.expenses} />
              )}
              {/* <DistributionTable /> */}
            </Box>
          </Grid>
        </Grid>
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
        <MenuItem onClick={handleClickOpenDialog}>Search Form</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose Date</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // call the search logic
          }}
        >
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    label="Start Date"
                    format="DD-MM-YYYY HH:mm"
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
                    format="DD-MM-YYYY HH:mm"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    label="End Date"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Distribution view
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={distributionView}
                  label="Age"
                  onChange={(e) => setDistributionView(e.target.value)}
                >
                  <MenuItem value={"day"}>Day View</MenuItem>
                  <MenuItem value={"week"}>Week View</MenuItem>
                  <MenuItem value={"month"}>Month View</MenuItem>
                  <MenuItem value={"year"}>Year View</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
