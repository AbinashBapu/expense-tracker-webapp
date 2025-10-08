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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blue, red } from "@mui/material/colors";
import dayjs, { Dayjs } from "dayjs";
import { useReport } from "@/hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import { InvestmentSearchDto, SearchParamDto } from "@/dto/SearchParamDto";
import Skeleton from "@mui/material/Skeleton";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PortfolioAnalysisCards() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const [asOfDate, setAsOfDate] = React.useState<Dayjs | null>(
    dayjs().startOf("day")
  );

  const [applySearch, setApplySearch] = React.useState<InvestmentSearchDto>({
    page: 0,
    size: 10,
    sortBy: "asOfDate",
    direction: "desc",
    asOfDate: asOfDate ? asOfDate?.toISOString() : null,
    subCategoryId: null,
  });
  const theme = useTheme();
  const { fetchPortfolioSavingByCategory } = useReport();

  const {
    data: portfolioData,
    isLoading: isLoadingPortfolio,
    error: errorPortfolio,
    refetch: refetchPortfolio,
    isFetching: isFetchingPortfolio,
  } = useQuery({
    queryKey: ["fetchPortfolioSavingByCategory", applySearch],
    queryFn: () => fetchPortfolioSavingByCategory(applySearch),
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
    if (!asOfDate || !asOfDate) {
      alert("Please select both start and end dates.");
      return;
    }

    applySearch.asOfDate = asOfDate?.toISOString();
    setOpenDialog(false);
  };

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <Box sx={{ p: 1, backgroundColor: "#ffffff94" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="text.primary">
          Portfolio investment by category
          <Box
            component="span"
            color="text.secondary"
            ml={1}
            sx={{ fontSize: 12, fontWeight: 500 }}
          >
            ({asOfDate?.format("DD MMM YYYY")})
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
          height: 330, 
          overflowY: "auto", 
        }}
      >
        <Box
          sx={{
            p: 1,
            backgroundColor: "#ffffff94",
          }}
        >
          {isLoadingPortfolio
            ? // Show 3 skeleton cards as placeholders
              Array.from({ length: 3 }).map((_, index) => (
                <Card elevation={4} key={index}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Skeleton variant="text" width="40%" height={30} />
                      <Skeleton variant="rectangular" width={60} height={24} />
                    </Box>

                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="60%" />

                    <Box mt={2}>
                      <Skeleton variant="text" width="40%" />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={10}
                        sx={{ mt: 0.5, borderRadius: 4 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))
            : portfolioData.map((item: any) => (
                <Card elevation={4} key={item.id} sx={{mb:1}}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="h6">{item.label}</Typography>
                      <Chip
                        label={`${item.percentageContributionToPortfolio.toFixed(
                          2
                        )}%`}
                        color={
                          item.percentageContributionToPortfolio > 50
                            ? "success"
                            : item.percentageContributionToPortfolio > 10
                            ? "primary"
                            : "default"
                        }
                        size="small"
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Invested: <strong>{formatCurrency(item.invested)}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Gained: <strong>{formatCurrency(item.gained)}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Total Value:{" "}
                      <strong>{formatCurrency(item.totalValue)}</strong>
                    </Typography>

                    <Box mt={2}>
                      <Typography variant="caption" color="textSecondary">
                        Contribution to Portfolio
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentageContributionToPortfolio}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          mt: 0.5,
                          backgroundColor: theme.palette.grey[300],
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              item.percentageContributionToPortfolio > 50
                                ? theme.palette.success.main
                                : theme.palette.primary.main,
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
        </Box>
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
                    value={asOfDate}
                    onChange={(newValue) => setAsOfDate(newValue)}
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
