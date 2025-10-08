import { TransactionPartyInfo } from "@/dto/Party"
import { Card, CardHeader, Skeleton, Avatar, IconButton, CardMedia, CardContent, Typography, Grid, Box, Menu, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red, blue, green, orange, deepPurple, teal } from "@mui/material/colors";
import LinearProgressWithLabel from "@/components/common/linearProgressWithlabel";

import AddIcon from "@mui/icons-material/Add";
type PartyInfo = {
    parties: Array<TransactionPartyInfo>,
    isLoading: boolean,
    onEdit: any,
    onDelete: any
    onView: any
}

export default function Parties({ parties, isLoading, onEdit, onDelete, onView }: PartyInfo) {
    const [selectedParty, setSelectedParty] = useState({} as TransactionPartyInfo);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, party: TransactionPartyInfo) => {
        setAnchorEl(event.currentTarget);
        setSelectedParty(party)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // Define your color palette
    const AVATAR_COLOR = [
        red[500],
        blue[500],
        green[500],
        orange[500],
        deepPurple[500],
        teal[500],
    ];



    const reInit = () => {
        handleClose();
        setSelectedParty({} as TransactionPartyInfo)
    }

    const handleEdit = () => {
        onEdit();
        reInit();
    }
    const handleDelete = () => {
        onDelete(selectedParty);
        reInit();
    }


    const handleView = () => {
        onView(selectedParty)
        reInit()
    }




    return <>
        {
            isLoading ? <>
                <Grid container spacing={1}>
                    {[1, 2, 3, 4].map(item =>
                        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 6 }} key={item}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    }
                                    title={

                                        <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                        />
                                    }
                                    subheader={
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    }
                                />
                                <CardContent>
                                    <>
                                        <Skeleton animation="wave" height={10} width="80%" />
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    </>

                                </CardContent>
                            </Card>

                        </Grid>
                    )}
                </Grid>
            </> :
                <>
                    {parties.length > 0 ? (
                        <Grid container spacing={1}>
                            {parties.map((party, index) => (
                                <Grid size={{ lg: 3, md: 4, sm: 6, xs: 6 }} key={party.transactionPartyId}>
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: AVATAR_COLOR[index % AVATAR_COLOR.length] }}>
                                                    {party.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton
                                                    aria-label="settings"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={(event) => handleClick(event, party)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={party.name}
                                            subheader={party.relationType}
                                        />
                                        <CardContent>
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Typography variant="caption" sx={{ color: "gray" }}>
                                                    Current Month Expenses:
                                                </Typography>
                                                <Typography variant="caption">
                                                    <span style={{ color: "#cf2d2d", fontWeight: "bold" }}>₹30000</span> /
                                                    <span style={{ color: "green", fontWeight: "bold" }}>₹20000</span>
                                                </Typography>
                                            </Box>
                                            {/* <LinearProgressWithLabel value={party.contribution} /> */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: "center", mt: 8, p: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                No Parties Available
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You haven’t added any parties yet. Start by adding a new party to view them here.
                            </Typography>

                            {/* <Button
                                onClick={toggleViewDrawer}
                                variant="contained"
                                sx={{ mt: 3 }}
                                endIcon={<AddIcon />}
                            >
                                Add Party
                            </Button> */}
                        </Box>

                    )}
                </>

        }
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
            }}
        >
            <MenuItem onClick={handleView}>View</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
    </>
}


