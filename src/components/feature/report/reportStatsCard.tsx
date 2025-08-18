import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";

const ReportStatsCard: FC<{
  amount: number;
  title: string;
  cardStyle?: any;
}> = ({ amount, title, cardStyle }) => {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Till{" "}
            {new Date().toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>

        {/* Main Amount */}
        <Typography
          variant="h6"
          fontWeight="700"
          color="success.main"
          sx={{ lineHeight: 1.3 }}
        >
          ₹{amount.toLocaleString()}
        </Typography>

        {/* Growth / Comparison */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mt: 0.5,
            mb: 1.5,
          }}
        >
          <Typography variant="caption" color="success.main" fontWeight={600}>
            ▲ 12.5%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Box>

        {/* Additional Info Row */}
        <Grid container spacing={1}>
          <Grid size={6}>
            <Box
              sx={{
                p: 1,
                bgcolor: "#fff",
                borderRadius: 2,
                textAlign: "center",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                This Quarter
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{(amount * 3).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                p: 1,
                bgcolor: "#fff",
                borderRadius: 2,
                textAlign: "center",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Year-to-Date
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{(amount * 9).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ReportStatsCard;
