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
    <Grid container spacing={2} sx={{ mt: 10 }}>
      <Grid size={8}></Grid>
      <Grid size={4}>
        <Card>
          <CardContent>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={6}>
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
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
              label="Phone Number"
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
            <TextField
              sx={{ mb: 1 }}
              id="standard-basic"
              label="Re type password"
              variant="standard"
              fullWidth
            />
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>

            <Box sx={{ mt: 3 }}>
              <Typography variant="caption">
                By creating an account, You agree to the
                <Link href={""}> Terms & service. </Link>We will send you
                occaisionally account related emails.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="caption">
                Already have an account? <Link href={"/signin"}>Sign In</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
