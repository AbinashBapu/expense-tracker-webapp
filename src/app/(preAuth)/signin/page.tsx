import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import Link from "next/link";

export default function Page() {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid size={7} sx={{ backgroundColor: "#1876D1" }}></Grid>
      <Grid
        size={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardContent>
            <TextField
              sx={{ mb: 1 }}
              id="standard-basic"
              label="Email Id"
              variant="standard"
              fullWidth
            />
            <TextField
              sx={{ mb: 1 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              fullWidth
            />

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              href="/dashboard"
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="caption">
                Don't have an account? <Link href={"/signup"}>Sign Up</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
