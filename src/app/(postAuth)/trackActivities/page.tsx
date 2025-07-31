"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ActivityTransactions from "@/components/feature/activityTransaction";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const top100Films = [
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
  ];

  const DrawerList = (
    <Box sx={{ width: 400, p: 2 }} role="presentation">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Log Transactions
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

        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <Autocomplete
            multiple
            id="size-small-standard-multi"
            size="small"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[13]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Incured By"
                placeholder="Favorites"
              />
            )}
          />
          <FormHelperText>Who spents</FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <Autocomplete
            multiple
            id="size-small-standard-multi"
            size="small"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[13]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Incured For"
                placeholder="Favorites"
              />
            )}
          />
          <FormHelperText>Who get benifits</FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Transaction type
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
            <MenuItem value={"cr"}>Credit</MenuItem>
            <MenuItem value={"dr"}>Debit</MenuItem>
          </Select>
          <FormHelperText>Who spents</FormHelperText>
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
