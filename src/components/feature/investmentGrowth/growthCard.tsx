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
  titleValues,
}: {
  title: string;
  titleValues: [];
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

        <Stack spacing={1}>
          {titleValues.map((item: any, index: number) => {
            const icon = item.title.toLowerCase().includes("invested") ? (
              <AccountBalanceWalletIcon color="secondary" fontSize="small" />
            ) : (
              <TrendingUpIcon color="success" fontSize="small" />
            );

            return (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderRadius: 2 }}
              >
                {/* Left: Icon + Title */}
                <Box display="flex" alignItems="center" gap={1.2}>
                  {icon}
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </Box>

                {/* Right: Amount + % Chip */}
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ color: "green" }}
                  >
                    ₹{Number(item.value).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
