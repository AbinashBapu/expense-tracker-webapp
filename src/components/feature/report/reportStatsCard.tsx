import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { FC } from "react";

const ReportStatsCard: FC<{
  isSummaryLoading: boolean;
  amount: number;
  title: string;
  cardStyle?: any;
}> = ({ isSummaryLoading, amount, title, cardStyle }) => {
  return (
    <>
      {isSummaryLoading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {title}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h6"
              fontWeight="700"
              color="success.main"
              sx={{ lineHeight: 1.3 }}
            >
              ₹{amount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default ReportStatsCard;
