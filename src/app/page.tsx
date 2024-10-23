import Link from "next/link";
import { Fragment } from "react";

import Grid from "@mui/material/Grid2";
import { Box, Button, Typography } from "@mui/material";

export default function page() {
  return (
    <Fragment>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          size={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2">Manage your</Typography>
          <Typography variant="h2">Personal Finances</Typography>
          <Typography variant="subtitle1">
            Track, Save, and Grow Your Finances with Ease
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Box sx={{ mr: 2 }}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                href="/signup"
              >
                Sign Up
              </Button>
            </Box>
            <Box>
              <Button variant="contained" size="large" href="/signin">
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={7} sx={{ backgroundColor: "#1876D1" }}></Grid>
      </Grid>
    </Fragment>
  );
}
