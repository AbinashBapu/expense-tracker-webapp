// https://www.behance.net/gallery/209595173/Expense-Tracker-Dashboard-UI-Design?tracking_source=search_projects|expense+dashboard&l=4

import BarChart from "@/components/feature/barchart";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// https://dribbble.com/shots/7705222-Hubio-Financial-Wallet-Web-Application-Design
export default function Page() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Card>
          <CardContent></CardContent>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card>
          <CardContent>
            <Typography>Bar Chart</Typography>
            <BarChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
