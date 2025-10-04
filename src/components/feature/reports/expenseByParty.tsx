

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgressWithLabel from '@/components/common/linearProgressWithlabel';
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { Dayjs } from 'dayjs';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ExpenseByParty() {
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

    const partiesContributionToExpenses = [
        {
            id: 1,
            name: "Baba",
            percentage: 40,
            amount: 100,
        },
        {
            id: 2,
            name: "Me",
            percentage: 10,
            amount: 100
        },
        {
            id: 3,
            name: "Bou",
            percentage: 25,
            amount: 100,
        }, {
            id: 4,
            name: "Sinu",
            percentage: 23,
            amount: 100,
        }, {
            id: 5,
            name: "xtyg",
            percentage: 2,
            amount: 100,
        }
    ]





    return (
        <Box sx={{ p: 1, backgroundColor: "#ffffff94" }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" sx={{ mb: 1.5, textAlign: "center" }}>
                    Expense by party
                    
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
            {
                partiesContributionToExpenses.map((item) =>
                    <Card key={item.name} sx={{ mb: 1 }}>
                        <CardHeader
                            sx={{ padding: "7px" }}
                            avatar={
                                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"> {
                                    item.name[0]
                                } </Avatar>
                            }
                            title={`${item.name} - ₹${item.amount}`}
                            subheader={
                                <> <LinearProgressWithLabel value={item.percentage} /> </>
                            }
                        />
                    </Card>
                )
            }

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

        </Box>
    );
}