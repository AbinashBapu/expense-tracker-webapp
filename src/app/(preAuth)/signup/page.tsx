"use client";
import SignUpForm from "@/components/feature/signup/signupForm";
import { Box, Card, CardContent, Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
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
        <Card sx={{ width: "90%" }}>
          <CardContent>
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Create new account
              </Typography>
            </Box>
            <SignUpForm />
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption">
                By creating an account, You agree to the
                <Link href={""}> Terms & service. </Link>We will send you
                occaisionally account related emails.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="caption">
                Already have an account? <Link href={"/signin"}>SignIn</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
