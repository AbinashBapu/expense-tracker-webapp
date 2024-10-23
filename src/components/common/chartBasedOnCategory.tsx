import {
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  ListSubheader,
} from "@mui/material";
import { Fragment, useState } from "react";
import PieChart from "../feature/pieChart";

export default function ChartOnCategory() {
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label" size="small">
            Category
          </InputLabel>
          <Select
            size="small"
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <Box key={name}>
                <ListSubheader>Group 1</ListSubheader>
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              </Box>
            ))}
          </Select>
        </FormControl>
      </Box>
      <PieChart />
    </Fragment>
  );
}
