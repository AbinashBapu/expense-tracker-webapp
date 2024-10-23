"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TransactionsLists from "@/components/feature/transaction";
import ActivityTransactions from "@/components/feature/activityTransaction";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400, p: 2 }} role="presentation">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Log Activity
      </Typography>
      <form>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sub Category
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mt: 1 }}
          id="standard-basic"
          label="Amount"
          variant="standard"
          type="number"
          fullWidth
        />
        <TextField
          sx={{ mt: 1 }}
          id="standard-basic"
          label="Detail Description"
          variant="standard"
          multiline
          rows={4}
          fullWidth
        />
        <Box sx={{ mt: 3 }}>
          <Button fullWidth variant="outlined">
            Save/Update
          </Button>
        </Box>
      </form>
      <Divider />
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Box>
          <Button onClick={toggleDrawer(true)} variant="outlined">
            Log Activity
          </Button>
        </Box>
      </Box>

      <ActivityTransactions />

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
}
