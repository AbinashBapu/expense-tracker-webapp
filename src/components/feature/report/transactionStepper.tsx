import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  Chip,
  CardHeader,
} from "@mui/material";
import { TransactionDto } from "@/dto/Finance";
import dayjs from "dayjs";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaidIcon from "@mui/icons-material/Paid";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import ShareIcon from "@mui/icons-material/Share";

export default function TransactionStepper({
  onClickBtn,
  transactionData,
}: {
  onClickBtn: (pageNumber: number) => void;
  transactionData: any;
}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = transactionData?.totalPages || 0;

  React.useEffect(() => {
    onClickBtn(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper elevation={3}>
      <Paper
        square
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Transactions</Typography>
      </Paper>
      <Box
        sx={{
          height: "425px",
          width: "100%",
          p: 1,
          overflow: "auto",
        }}
      >
        {transactionData?.content?.map((transaction: TransactionDto) => (
          <Card
            key={transaction.transactionId}
            elevation={3}
            sx={{
              borderRadius: 3,
              mb: 1,
              p: 1,
              bgcolor: "#ebf5ff",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  {transaction.description}
                </Typography>
                <Chip
                  label={`${transaction.amount.toFixed(2)}`}
                  color={
                    transaction.transactionType === "Cr" ? "success" : "error"
                  }
                  icon={<CurrencyRupeeIcon fontSize="small" />}
                  size="small"
                  sx={{ fontWeight: 600, height: 24 }}
                />
              </Box>

              <Divider sx={{ mb: 1.5 }} />

              {/* Details */}
              <Stack spacing={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Spent On:</strong>{" "}
                    {dayjs(transaction.spentOn).format("DD MMM YYYY, hh:mm A")}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Spent By:</strong> {transaction.incurredBy.name}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Spent For:
                  </Typography>
                  {transaction.incurredFor.map((person: any) => (
                    <Chip
                      key={person.id || person.name}
                      label={person.name}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ mr: 0.5, height: 22, fontSize: "0.7rem" }}
                    />
                  ))}
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <CategoryIcon fontSize="small" color="action" />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Category:</strong> {transaction.category.label}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <CategoryIcon fontSize="small" color="action" />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Subcategory:</strong>{" "}
                    {transaction.subCategory.label}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      <MobileStepper
        elevation={6}
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Paper>
  );
}
