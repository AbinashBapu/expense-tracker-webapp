import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";

export default function IncomeExpenseCard() {
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid size={3}>
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#017BFE" }} variant="h6">
                Rs. 2000.00
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Income</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#DC3444" }} variant="h6">
                Rs. 2000.00
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Expense</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#28A745" }} variant="h6">
                Rs. 2000.00
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Saving</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#14A2B8" }} variant="h6">
                Rs. 2000.00
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Balance</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
