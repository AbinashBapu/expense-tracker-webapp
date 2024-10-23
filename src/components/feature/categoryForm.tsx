import { Box, TextField, Button, Drawer } from "@mui/material";
import { useState } from "react";

export default function CategoryForm() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <form>
          <TextField id="name" label="Category" variant="standard" fullWidth />
          <TextField
            id="desc"
            label="Description"
            variant="standard"
            fullWidth
            multiline
            rows={4}
          />

          <Button variant="outlined" fullWidth>
            Save
          </Button>
        </form>
      </Drawer>
    </Box>
  );
}
