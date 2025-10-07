import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import { SearchParamDto } from "@/dto/SearchParamDto";
import Skeleton from "@mui/material/Skeleton";
import { PartyExpDetailInfo } from "@/dto/ReportDto";

export default function ExpenseByParty() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs().startOf("month")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().endOf("day")
  );

  const [applySearch, setApplySearch] = React.useState<SearchParamDto>({
    fromDate: startDate ? startDate?.toISOString() : null,
    toDate: endDate ? endDate?.toISOString() : null,
    categoryId: null,
    subCategoryId: null,
    transactionType: null,
  });

  const { fetchExpensesByParty } = useReport();

  const {
    data: expenseByPartyData,
    isLoading: isLoadingExpenseByParty,
    error: errorExpenseByParty,
    refetch: refetchExpenseByParty,
    isFetching: isFetchingExpenseByParty,
  } = useQuery({
    queryKey: ["expensesByParty", applySearch],
    queryFn: () => fetchExpensesByParty(applySearch),
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

    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 1, backgroundColor: "#ffffff94" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="text.primary">
          Expense by party
          <Box
            component="span"
            color="text.secondary"
            ml={1}
            sx={{ fontSize: 12, fontWeight: 500 }}
          >
            ({startDate?.format("MMM DD, YYYY")} -{" "}
            {endDate?.format("MMM DD, YYYY")})
          </Box>
        </Typography>

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
      <Divider sx={{ mb: 1 }} />

      <Box
        sx={{
          p: 1,
          backgroundColor: "#ffffff94",
          height: 330, // set a fixed max height or any desired height
          overflowY: "auto", // enables vertical scrolling when content overflows
        }}
      >
        {isLoadingExpenseByParty
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} sx={{ mb: 1, p: 1 }}>
                <Box display="flex" alignItems="center">
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ mr: 2 }}
                  />
                  <Box flex={1}>
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="80%" height={10} />
                  </Box>
                </Box>
              </Card>
            ))
          : expenseByPartyData.map((item: PartyExpDetailInfo) => (
              <Card key={item.id} sx={{ mb: 1 }}>
                <CardHeader
                  sx={{ padding: "7px" }}
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      {item.name[0]}
                    </Avatar>
                  }
                  title={`${item.name} - ₹${item.amount}`}
                  subheader={
                    <>
                      <LinearProgressWithLabel value={item.percentage} />
                    </>
                  }
                />
              </Card>
            ))}
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
        {/* <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>Yesterday</MenuItem>
        <MenuItem onClick={handleClose}>Current Week</MenuItem>
        <MenuItem onClick={handleClose}>Current Month</MenuItem>
        <MenuItem onClick={handleClose}>Curent Year</MenuItem> */}
        <MenuItem onClick={handleClickOpenDialog}>Choose Dates</MenuItem>
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
    </Box>
  );
}
