
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function GrowthCard({
  title,
  investedGrowth,
  portfolioGrowth,
}: {
  title: string,
  investedGrowth: { amount: number; percentage: number };
  portfolioGrowth: { amount: number; percentage: number };
}) {
  return (

    <Card
      sx={{
        mb: 1,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          fontWeight="500"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TrendingUpIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <AccountBalanceWalletIcon color="secondary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Invested
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                variant="body1"
                fontWeight="600"
                color={investedGrowth.percentage >= 0 ? "success.main" : "error.main"}
              >
                ₹{investedGrowth.amount.toLocaleString()}
              </Typography>
              <Chip
                size="small"
                label={`${investedGrowth.percentage}%`}
                color={investedGrowth.percentage >= 0 ? "success" : "error"}
                sx={{ fontWeight: 500 }}
                variant="outlined"
              />
            </Box>


          </Box>

          {/* Portfolio Growth */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <TrendingUpIcon color="success" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Portfolio
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                variant="body1"
                fontWeight="600"
                color={portfolioGrowth.percentage >= 0 ? "success.main" : "error.main"}
              >
                ₹{portfolioGrowth.amount.toLocaleString()}
              </Typography>
              <Chip
                size="small"
                label={`${portfolioGrowth.percentage}%`}
                color={portfolioGrowth.percentage >= 0 ? "success" : "error"}
                sx={{ fontWeight: 500 }}
                variant="outlined"
              />
            </Box>



          </Box>
        </Stack>
      </CardContent>
    </Card>


  );
}