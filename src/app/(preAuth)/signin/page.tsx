"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";

import Grid from "@mui/material/Grid2";
import Link from "next/link";
import LoginForm from "@/components/feature/login/loginForm";

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
            <LoginForm />
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
