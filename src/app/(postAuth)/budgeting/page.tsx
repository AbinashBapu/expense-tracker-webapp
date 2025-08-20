"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Fragment, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function BudgetPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];
  const visibleChips = 2; // Number of chips to show before "+2 more"

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const DrawerList = (
    <Box sx={{ width: 400, p: 2 }} role="presentation">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Customize Budget
      </Typography>
      <form>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="Budget Name"
            variant="standard"
            fullWidth
          />
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="From Date" />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="To Date" />
          </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            sx={{ mt: 1 }}
            id="standard-basic"
            label="Amount"
            variant="standard"
            type="number"
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            sx={{ mt: 1 }}
            id="standard-basic"
            label="Detail Description"
            variant="standard"
            multiline
            rows={4}
            fullWidth
          />
        </FormControl>
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
        <Button variant="contained" size="small" onClick={toggleDrawer(true)}>
          Add Budget Limit
        </Button>
      </Box>

      <Grid container spacing={2} mt={1}>
        {[1, 56].map((item) => (
          <Fragment key={item}>
            <Grid size={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="January Expense Budget"
                  subheader={
                    <Typography variant="subtitle2">
                      15/Jan/2024 - 20/Jan/2024
                    </Typography>
                  }
                />
                <CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {/* Show only the first 'visibleChips' categories */}
                    {categories
                      .slice(0, visibleChips)
                      .map((category, index) => (
                        <Chip key={index} label={category} />
                      ))}

                    {/* If there are more categories, show a "+X more" chip */}
                    {categories.length > visibleChips && (
                      <Typography sx={{ m: 0.28 }}>
                        {`+${categories.length - visibleChips} more`}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
}
