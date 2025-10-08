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
        mb: 2,
        borderRadius: 3,
        boxShadow: 6,
        bgcolor: "background.paper",
        p: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Card Header */}
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          fontWeight="600"
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          {/* <TrendingUpIcon color="primary" fontSize="small" sx={{ mr: 1 }} /> */}
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Content Items */}
        <Stack spacing={1.5}>
          {titleValues.map((item: any, index: number) => {
            const isInvested = item.title.toLowerCase().includes("invested");
            // const icon = isInvested ? (
            //   <AccountBalanceWalletIcon color="secondary" fontSize="small" />
            // ) : (
            //   <TrendingUpIcon color="success" fontSize="small" />
            // );

            return (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={1.5}
                py={1}
                sx={{
                  bgcolor: "background.default",
                  borderRadius: 2,
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                
                <Box display="flex" alignItems="center" gap={1}>
                  {/* {icon} */}
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: isInvested ? "text.primary" : "success.main" }}
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
