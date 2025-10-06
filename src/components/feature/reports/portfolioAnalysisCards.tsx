

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgressWithLabel from '@/components/common/linearProgressWithlabel';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { Dayjs } from 'dayjs';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function PortfolioAnalysisCards() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

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



    const data = [
        {
            name: "Total",
            invested: 30000,
            totalValue: 60000,
            gain: 30000,
            totalPortfolioContribution: 100
        },
        {
            name: "Mutual Fund",
            invested: 10000,
            totalValue: 20000,
            gain: 10000,
            totalPortfolioContribution: 70
        },
        {
            name: "Stocks",
            invested: 10000,
            totalValue: 20000,
            gain: 10000,
            totalPortfolioContribution: 20
        },
        {
            name: "LIC",
            invested: 10000,
            totalValue: 20000,
            gain: 10000,
            totalPortfolioContribution: 10
        }
    ]





    return (
        <Box sx={{ p: 1, backgroundColor: "#ffffff94" }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" sx={{
                    mb: 1.5, textAlign: "center", fontWeight: 600,
                    color: "gray"
                }}>
                    Portfolio investment by category
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

            <Box sx={{
                p: 1,
                backgroundColor: "#ffffff94",
                height: 330,  // set a fixed max height or any desired height
                overflowY: "auto", // enables vertical scrolling when content overflows
            }}>

                <Box sx={{
                    p: 1,
                    backgroundColor: "#ffffff94",
                }}>

                    {
                        data.map((item, index) =>
                            <>
                                <Card key={item.name} sx={{ mb: 1 }}>
                                    <CardHeader
                                        sx={{ padding: "7px" }}
                                        avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"> {item.name[0]} </Avatar>}
                                        title={`${item.name}`} />
                                    <CardContent>
                                        <Typography>Invested: {item.invested}</Typography>
                                        <Typography>Total: {item.totalValue}</Typography>
                                        <Typography>Gained: {item.gain}</Typography>
                                        <LinearProgressWithLabel value={item.totalPortfolioContribution} />
                                    </CardContent>
                                </Card>
                                {index == 0 ? <Divider sx={{mb:2}}/> : <></>}
                            </>

                        )
                    }
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
                <MenuItem onClick={handleClose}>Today</MenuItem>
                <MenuItem onClick={handleClose}>Yesterday</MenuItem>
                <MenuItem onClick={handleClose}>Current Week</MenuItem>
                <MenuItem onClick={handleClose}>Current Month</MenuItem>
                <MenuItem onClick={handleClose}>Curent Year</MenuItem>
                <MenuItem onClick={handleClickOpenDialog}>Choose Dates</MenuItem>
            </Menu>

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
        </Box>
    );
}