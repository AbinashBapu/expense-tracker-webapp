import { Box, Card, CardContent, Typography } from "@mui/material";

import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

interface StartCardPorps {
  title: string;
  amount: number;
  percentage: number;
}

export default function DashboardStatCard(props: StartCardPorps) {
  return (
    <Card>
      <CardContent style={{ padding: "14px 14px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body2">{props.title}</Typography>
          <Typography variant="caption">
            <CallMadeIcon sx={{ fontSize: "11px" }} /> {props.percentage}%
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 600, color: "#909090" }}>
          Rs.{props.amount}
        </Typography>
      </CardContent>
    </Card>
  );
}
